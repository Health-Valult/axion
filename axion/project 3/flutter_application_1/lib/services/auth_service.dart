import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_application_1/services/session_service.dart';
import 'package:flutter_application_1/services/graphql_config.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String baseUrl = 'http://localhost:3000/api';
  final _sessionService = SessionService();

  Future<Map<String, dynamic>> login(String nic, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'nic': nic,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        
        // Set session with token, refresh token, and expiry
        final expiry = DateTime.now().add(const Duration(hours: 1)); // Adjust based on your token expiry time
        await _sessionService.setSession(
          token: data['token'],
          refreshToken: data['refreshToken'],
          expiry: expiry,
          userData: data['userData'] ?? {},
        );

        // Update GraphQL client token
        GraphQLConfig.updateToken(data['token']);

        return {
          'success': true,
          'data': data,
        };
      } else {
        final error = json.decode(response.body);
        return {
          'success': false,
          'error': error['message'] ?? 'Invalid credentials',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error occurred',
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
}
