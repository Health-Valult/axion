import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_application_1/services/session_service.dart';
import 'package:flutter_application_1/services/env_config.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get_ip_address/get_ip_address.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:permission_handler/permission_handler.dart';

class AuthService {
  static String get baseUrl => EnvConfig.apiBaseUrl;
  final _sessionService = SessionService();
  final _deviceInfoPlugin = DeviceInfoPlugin();

  String get _loginEndpoint => EnvConfig.auth.loginUser;

  Future<String?> _getAndroidId() async {
    try {
      final androidInfo = await _deviceInfoPlugin.androidInfo;
      return androidInfo.id;
    } catch (e) {
      print('Failed to get Android ID: $e');
      return null;
    }
  }

  Future<Position?> _getCurrentLocation() async {
    try {
      // First check if we have permission
      final hasPermission = await Permission.location.isGranted;
      if (!hasPermission) {
        print('Location permission not granted');
        return null;
      }

      // Check if location service is enabled
      final serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        print('Location services are disabled');
        return null;
      }

      // Get current position with high accuracy
      final position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.best,
        timeLimit: const Duration(seconds: 30),
      );

      print('Got current position: ${position.latitude}, ${position.longitude}');
      return position;

    } catch (e) {
      print('Error getting location: $e');
      return null;
    }
  }

  Future<String?> _getCurrentIpAddress() async {
    try {
      final ipAddress = IpAddress(type: RequestType.json);
      final dynamic data = await ipAddress.getIpAddress();
      return data['ip'];
    } catch (e) {
      print('Error getting IP address: $e');
      return null;
    }
  }

  Future<Map<String, dynamic>> _makeAuthRequest(String endpoint, Map<String, dynamic> data) async {
    try {
      final response = await http.post(
        Uri.parse(EnvConfig.apiBaseUrl + endpoint),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(data),
      );

      final responseData = jsonDecode(response.body);
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return {
          'success': true,
          'data': responseData,
        };
      } else {
        return {
          'success': false,
          'error': responseData['message'] ?? responseData['error'] ?? 'Request failed',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': e.toString(),
      };
    }
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      // Validate input
      if (email.isEmpty || password.isEmpty) {
        return {
          'success': false,
          'error': 'Email and password are required',
        };
      }

      // Get current location, IP address, and Android ID simultaneously
      final Future<Position?> locationFuture = _getCurrentLocation();
      final Future<String?> ipFuture = _getCurrentIpAddress();
      final Future<String?> androidIdFuture = _getAndroidId();
      
      // Wait for all device data to be fetched at login time
      final results = await Future.wait([locationFuture, ipFuture, androidIdFuture]);
      final Position? position = results[0] as Position?;
      final String? ipAddress = results[1] as String?;
      final String? androidId = results[2] as String?;

      // Prepare request body with real device data
      final requestBody = {
        'Email': email,
        'Password': password,
        'Location': position != null ? {
          'Latitude': position.latitude,
          'Longitude': position.longitude,
        } : null,
        'IpAddress': ipAddress,
        'AndroidId': androidId,
      };

      // Log request data for debugging
      print('Login Request URL: $baseUrl$_loginEndpoint');
      print('Login Request Body: ${json.encode(requestBody)}');

      // Send request to server
      final response = await _makeAuthRequest(_loginEndpoint, requestBody);

      if (response['success']) {
        final responseData = response['data'];
        
        // Store the session tokens
        await _sessionService.setSession(
          token: responseData['session_token'],
          refreshToken: responseData['refresh_token'],
          expiry: DateTime.now().add(const Duration(hours: 1)),
          userData: responseData['userData'] ?? {},
        );

        return {
          'success': true,
          'data': responseData,
        };
      } else {
        return response;
      }
    } on TimeoutException {
      return {
        'success': false,
        'error': 'Connection timed out. Please check your internet connection and try again.',
      };
    } on IOException {
      return {
        'success': false,
        'error': 'Network error occurred. Please check your internet connection.',
      };
    } catch (e) {
      print('Login Error: $e');
      return {
        'success': false,
        'error': 'An unexpected error occurred. Please try again.',
      };
    }
  }

  Future<Map<String, dynamic>> signup({
    required String nic,
    required String password,
    required String firstName,
    required String lastName,
    required String email,
    required String phoneNumber,
    required String address,
    required String otp,
    String? profileImage,
  }) async {
    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/auth/signup'),
      );

      // Add text fields
      request.fields.addAll({
        'nic': nic,
        'password': password,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phoneNumber': phoneNumber,
        'address': address,
        'otp': otp,
      });

      // Add profile image if provided
      if (profileImage != null) {
        request.files.add(await http.MultipartFile.fromPath(
          'profileImage',
          profileImage,
        ));
      }

      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        return {
          'success': true,
          'data': data,
        };
      } else {
        final error = json.decode(response.body);
        return {
          'success': false,
          'error': error['message'] ?? 'Registration failed',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error occurred',
      };
    }
  }

  Future<void> logout() async {
    try {
      final token = await _sessionService.getSessionToken();
      if (token != null) {
        await _makeAuthRequest('auth/logout', {});
      }
    } finally {
      await _sessionService.clearSession();
    }
  }

  Future<String?> getSessionToken() async {
    return await _sessionService.getSessionToken();
  }

  Future<void> _saveTokens(String token, String refreshToken) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
    await prefs.setString('refreshToken', refreshToken);
  }

  Future<void> _clearTokens() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('refreshToken');
  }

  Future<Map<String, dynamic>> resendOTP(String phoneNumber) async {
    try {
      final response = await _makeAuthRequest('auth/resend-otp', {
        'phoneNumber': phoneNumber,
      });

      return response;
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error occurred',
      };
    }
  }

  Future<Map<String, dynamic>> deleteAccount(String nic, String password) async {
    try {
      final token = await _sessionService.getSessionToken();
      if (token == null) {
        return {
          'success': false,
          'error': 'Not authenticated',
        };
      }

      final response = await _makeAuthRequest('auth/delete-account', {
        'nic': nic,
        'password': password,
      }).timeout(const Duration(seconds: 10));

      if (response['success']) {
        await _sessionService.clearSession();
        return response;
      } else {
        return response;
      }
    } on TimeoutException {
      return {
        'success': false,
        'error': 'Connection timed out. Please try again.',
      };
    } catch (e) {
      return {
        'success': false,
        'error': 'An unexpected error occurred. Please try again.',
      };
    }
  }
}
