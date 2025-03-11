import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_application_1/services/session_service.dart';
import 'package:flutter_application_1/services/env_config.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get_ip_address/get_ip_address.dart';
import 'package:device_info_plus/device_info_plus.dart';

class AuthService {
  static String get baseUrl => EnvConfig.apiBaseUrl;
  final _sessionService = SessionService();
  final _deviceInfoPlugin = DeviceInfoPlugin();

  Future<String?> _getAndroidId() async {
    try {
      final androidInfo = await _deviceInfoPlugin.androidInfo;
      return androidInfo.id; // Using id instead of androidId
    } catch (e) {
      print('Failed to get Android ID: $e');
      return null;
    }
  }

  Future<Position?> _getCurrentLocation() async {
    bool serviceEnabled;
    LocationPermission permission;

    try {
      // Check if location services are enabled
      serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        return Future.error('Location services are disabled.');
      }

      permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          return Future.error('Location permissions are denied');
        }
      }

      if (permission == LocationPermission.deniedForever) {
        return Future.error('Location permissions are permanently denied');
      }

      // Get location with high accuracy and timeout
      return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
        timeLimit: const Duration(seconds: 5),
      );
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

  Future<Map<String, dynamic>> login(String nic, String password) async {
    try {
      // Validate input
      if (nic.isEmpty || password.isEmpty) {
        return {
          'success': false,
          'error': 'NIC and password are required',
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

      // Try to connect to server with data in exact order
      try {
        final response = await http.post(
          Uri.parse('$baseUrl/auth/login'),
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'nic': nic,                    // 1st: NIC
            'password': password,          // 2nd: Password
            'location': position != null ? {  // 3rd: Geolocation
              'latitude': position.latitude,
              'longitude': position.longitude,
            } : null,
            'ipAddress': ipAddress,        // 4th: IP Address
            'androidId': androidId,        // 5th: Android ID
          }),
        ).timeout(const Duration(seconds: 10));

        if (response.statusCode == 200) {
          final responseData = json.decode(response.body);
          if (responseData['success']) {
            // Set session with tokens
            await _sessionService.setSession(
              token: responseData['data']['accessToken'],
              refreshToken: responseData['data']['refreshToken'],
              expiry: DateTime.now().add(const Duration(hours: 1)),
              userData: responseData['data']['userData'] ?? {},
            );
            return {
              'success': true,
              'data': responseData['data'],
            };
          }
          return {
            'success': false,
            'error': responseData['error'] ?? 'Login failed',
          };
        }
        return {
          'success': false,
          'error': 'Server error occurred',
        };
      } on TimeoutException {
        return {
          'success': false,
          'error': 'Connection timed out',
        };
      } catch (e) {
        return {
          'success': false,
          'error': 'Network error occurred',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': e.toString(),
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
        await http.post(
          Uri.parse('$baseUrl/auth/logout'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );
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
      final response = await http.post(
        Uri.parse('$baseUrl/auth/resend-otp'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'phoneNumber': phoneNumber,
        }),
      );

      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': 'OTP resent successfully',
        };
      } else {
        final error = json.decode(response.body);
        return {
          'success': false,
          'error': error['message'] ?? 'Failed to resend OTP',
        };
      }
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

      final response = await http.post(
        Uri.parse('$baseUrl/auth/delete-account'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'nic': nic,
          'password': password,
        }),
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        await _sessionService.clearSession();
        return {
          'success': true,
          'message': 'Account deleted successfully',
        };
      } else {
        final error = json.decode(response.body);
        String errorMessage = error['message'] ?? 'Failed to delete account';
        
        if (response.statusCode == 401) {
          errorMessage = 'Invalid NIC or password';
        }
        
        return {
          'success': false,
          'error': errorMessage,
        };
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
