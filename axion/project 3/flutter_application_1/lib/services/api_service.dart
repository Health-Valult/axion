import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_application_1/services/api_config.dart';
import 'package:flutter_application_1/models/user.dart';
import 'package:flutter_application_1/models/notification.dart';
import 'package:flutter_application_1/models/log.dart';
import 'package:flutter_application_1/models/link.dart';

class ApiService {
  // Helper method to get headers with auth token
  Future<Map<String, String>> _getHeaders() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  // Helper method to handle API response with better error handling
  Future<Map<String, dynamic>> _handleResponse(http.Response response) async {
    try {
      final data = jsonDecode(response.body);
      
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return {
          'success': true,
          'data': data,
        };
      } else {
        return {
          'success': false,
          'error': data['message'] ?? data['error'] ?? 'An error occurred',
          'statusCode': response.statusCode,
        };
      }
    } on FormatException {
      return {
        'success': false,
        'error': 'Invalid response format from server',
        'statusCode': response.statusCode,
      };
    } catch (e) {
      return {
        'success': false,
        'error': 'Failed to process response: ${e.toString()}',
        'statusCode': response.statusCode,
      };
    }
  }

  // Helper method to validate connection before making API call
  Future<bool> _validateConnection() async {
    try {
      final result = await http.get(Uri.parse(ApiConfig.baseUrl + '/health'));
      return result.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  // Helper method to handle API calls with connection validation and retry
  Future<Map<String, dynamic>> _makeApiCall(Future<http.Response> Function() apiCall, {int retryCount = 3}) async {
    while (retryCount > 0) {
      try {
        if (!await _validateConnection()) {
          retryCount--;
          if (retryCount > 0) {
            await Future.delayed(const Duration(seconds: 1));
            continue;
          }
          return {
            'success': false,
            'error': 'No internet connection or server is unreachable',
          };
        }

        final response = await apiCall().timeout(const Duration(seconds: 30));
        final result = await _handleResponse(response);
        if (result['success']) {
          return result;
        }
        
        // Only retry on 5xx errors or network issues
        if (result['statusCode'] == null || result['statusCode'] >= 500) {
          retryCount--;
          if (retryCount > 0) {
            await Future.delayed(const Duration(seconds: 1));
            continue;
          }
        }
        return result;

      } on http.ClientException {
        retryCount--;
        if (retryCount > 0) {
          await Future.delayed(const Duration(seconds: 1));
          continue;
        }
        return {
          'success': false,
          'error': 'Network error occurred',
        };
      } catch (e) {
        retryCount--;
        if (retryCount > 0) {
          await Future.delayed(const Duration(seconds: 1));
          continue;
        }
        return {
          'success': false,
          'error': 'An unexpected error occurred: ${e.toString()}',
        };
      }
    }
    return {
      'success': false,
      'error': 'Maximum retry attempts reached',
    };
  }

  // Auth methods with improved validation
  Future<Map<String, dynamic>> signupUser(Map<String, dynamic> userData) async {
    // Validate required fields
    final requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'phoneNumber',
      'nic',
      'address',
    ];

    for (final field in requiredFields) {
      if (!userData.containsKey(field) || userData[field] == null || userData[field].toString().trim().isEmpty) {
        return {
          'success': false,
          'error': '${field.replaceAllMapped(RegExp(r'[A-Z]'), (match) => ' ${match.group(0)}').trim()} is required',
        };
      }
    }

    // Validate email format
    if (!RegExp(r'^[^@]+@[^@]+\.[^@]+$').hasMatch(userData['email'])) {
      return {
        'success': false,
        'error': 'Invalid email format',
      };
    }

    // Validate phone number format
    if (!RegExp(r'^\+?[\d\s-]{10,}$').hasMatch(userData['phoneNumber'])) {
      return {
        'success': false,
        'error': 'Invalid phone number format',
      };
    }

    // Validate password strength
    final password = userData['password'];
    if (password.length < 8) {
      return {
        'success': false,
        'error': 'Password must be at least 8 characters',
      };
    }
    if (!RegExp(r'[A-Z]').hasMatch(password)) {
      return {
        'success': false,
        'error': 'Password must contain at least one uppercase letter',
      };
    }
    if (!RegExp(r'[a-z]').hasMatch(password)) {
      return {
        'success': false,
        'error': 'Password must contain at least one lowercase letter',
      };
    }
    if (!RegExp(r'[0-9]').hasMatch(password)) {
      return {
        'success': false,
        'error': 'Password must contain at least one number',
      };
    }
    if (!RegExp(r'[!@#\$&*~]').hasMatch(password)) {
      return {
        'success': false,
        'error': 'Password must contain at least one special character',
      };
    }

    return await _makeApiCall(() => http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.signupUser),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(userData),
    ));
  }

  Future<Map<String, dynamic>> validateEmail(String email) async {
    if (email.isEmpty) {
      return {
        'success': false,
        'error': 'Email is required',
      };
    }

    if (!RegExp(r'^[^@]+@[^@]+\.[^@]+$').hasMatch(email)) {
      return {
        'success': false,
        'error': 'Invalid email format',
      };
    }

    return await _makeApiCall(() => http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.validateEmail),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    ));
  }

  Future<Map<String, dynamic>> sendOTP(String phoneNumber) async {
    if (phoneNumber.isEmpty) {
      return {
        'success': false,
        'error': 'Phone number is required',
      };
    }

    if (!RegExp(r'^\+?[\d\s-]{10,}$').hasMatch(phoneNumber)) {
      return {
        'success': false,
        'error': 'Invalid phone number format',
      };
    }

    return await _makeApiCall(() => http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.sendOTP),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phoneNumber': phoneNumber}),
    ));
  }

  Future<Map<String, dynamic>> validateOTP(String phoneNumber, String otp) async {
    if (phoneNumber.isEmpty) {
      return {
        'success': false,
        'error': 'Phone number is required',
      };
    }

    if (otp.isEmpty) {
      return {
        'success': false,
        'error': 'OTP is required',
      };
    }

    if (!RegExp(r'^\d{6}$').hasMatch(otp)) {
      return {
        'success': false,
        'error': 'OTP must be 6 digits',
      };
    }

    return await _makeApiCall(() => http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.validateOTP),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'phoneNumber': phoneNumber,
        'otp': otp,
      }),
    ));
  }

  Future<Map<String, dynamic>> loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.loginUser),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );
    final data = await _handleResponse(response);
    final prefs = await SharedPreferences.getInstance();
    if (data.containsKey('data') && data['data'].containsKey('token')) {
      await prefs.setString('token', data['data']['token']);
    }
    return data;
  }

  Future<void> logout() async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.logout),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
  }

  Future<void> resetPassword(String email) async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.resetPassword),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );
    await _handleResponse(response);
  }

  // Profile methods
  Future<User> getUserProfile() async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.userProfile),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return User.fromJson(data['data']);
    }
    throw Exception('Failed to get user profile');
  }

  Future<User> updateProfile(Map<String, dynamic> profileData) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateProfile),
      headers: await _getHeaders(),
      body: jsonEncode(profileData),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return User.fromJson(data['data']);
    }
    throw Exception('Failed to update profile');
  }

  Future<void> changePassword(String currentPassword, String newPassword) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.changePassword),
      headers: await _getHeaders(),
      body: jsonEncode({
        'currentPassword': currentPassword,
        'newPassword': newPassword,
      }),
    );
    await _handleResponse(response);
  }

  // Settings methods
  Future<Map<String, dynamic>> getSettings() async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.getSettings),
      headers: await _getHeaders(),
    );
    return await _handleResponse(response);
  }

  Future<Map<String, dynamic>> updateSettings(Map<String, dynamic> settings) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateSettings),
      headers: await _getHeaders(),
      body: jsonEncode(settings),
    );
    return await _handleResponse(response);
  }

  Future<Map<String, dynamic>> updateNotificationPreferences(Map<String, bool> preferences) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateNotificationPreferences),
      headers: await _getHeaders(),
      body: jsonEncode(preferences),
    );
    return await _handleResponse(response);
  }

  // Language preference method
  Future<void> updateLanguagePreference(String languageCode) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateSettings),
      headers: await _getHeaders(),
      body: jsonEncode({'language': languageCode}),
    );
    await _handleResponse(response);
  }

  // Privacy methods
  Future<void> updatePrivacyPreference(String key, bool value) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateSettings),
      headers: await _getHeaders(),
      body: jsonEncode({'privacy': {key: value}}),
    );
    await _handleResponse(response);
  }

  // Notifications methods
  Future<List<AppNotification>> getNotifications() async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.getNotifications),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return List<AppNotification>.from(
        data['data'].map((json) => AppNotification.fromJson(json))
      );
    }
    return [];
  }

  Future<void> markNotificationRead(String id) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.markNotificationRead.replaceAll('{id}', id)),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  Future<void> markAllNotificationsRead() async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.markAllNotificationsRead),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  Future<void> deleteAllNotifications() async {
    final response = await http.delete(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.deleteAllNotifications),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  Future<void> deleteNotification(String id) async {
    final response = await http.delete(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.deleteNotification.replaceAll('{id}', id)),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  // Log methods
  Future<List<Log>> getLogs() async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.getLogs),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return List<Log>.from(
        data['data'].map((json) => Log.fromJson(json))
      );
    }
    return [];
  }

  Future<Log> getLogDetails(String id) async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.getLogDetails.replaceAll('{id}', id)),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return Log.fromJson(data['data']);
    }
    throw Exception('Failed to get log details');
  }

  Future<Log> createLog(Map<String, dynamic> logData) async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.createLog),
      headers: await _getHeaders(),
      body: jsonEncode(logData),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return Log.fromJson(data['data']);
    }
    throw Exception('Failed to create log');
  }

  Future<Log> updateLog(String id, Map<String, dynamic> logData) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateLog.replaceAll('{id}', id)),
      headers: await _getHeaders(),
      body: jsonEncode(logData),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return Log.fromJson(data['data']);
    }
    throw Exception('Failed to update log');
  }

  Future<void> deleteLog(String id) async {
    final response = await http.delete(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.deleteLog.replaceAll('{id}', id)),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  // Account deletion method
  Future<void> deleteAccount() async {
    final response = await http.delete(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.deleteAccount),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
  }

  // Link methods
  Future<List<Link>> getLinks() async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.getLinks),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return List<Link>.from(
        data['data'].map((json) => Link.fromJson(json))
      );
    }
    return [];
  }

  Future<Link> createLink(Map<String, dynamic> linkData) async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.createLink),
      headers: await _getHeaders(),
      body: jsonEncode(linkData),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return Link.fromJson(data['data']);
    }
    throw Exception('Failed to create link');
  }

  Future<Link> updateLink(String id, Map<String, dynamic> linkData) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateLink.replaceAll('{id}', id)),
      headers: await _getHeaders(),
      body: jsonEncode(linkData),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return Link.fromJson(data['data']);
    }
    throw Exception('Failed to update link');
  }

  Future<void> deleteLink(String id) async {
    final response = await http.delete(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.deleteLink.replaceAll('{id}', id)),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  Future<bool> validateLink(String url) async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.validateLink),
      headers: await _getHeaders(),
      body: jsonEncode({'url': url}),
    );
    final data = await _handleResponse(response);
    return data.containsKey('data') && data['data'].containsKey('valid') ? data['data']['valid'] : false;
  }

  // Medical Records methods
  Future<List<dynamic>> getMedicalRecords() async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.getMedicalRecords),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    return data.containsKey('data') ? data['data'] : [];
  }

  // Medical Notifications methods
  Future<List<Map<String, dynamic>>> getMedicalNotifications() async {
    final response = await http.get(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.getMedicalNotifications),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('data')) {
      return List<Map<String, dynamic>>.from(data['data']);
    }
    return [];
  }

  Future<Map<String, dynamic>> addMedicalNotification(Map<String, dynamic> notification) async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.addMedicalNotification),
      headers: await _getHeaders(),
      body: jsonEncode(notification),
    );
    return await _handleResponse(response);
  }

  Future<Map<String, dynamic>> updateMedicalNotification(String id, Map<String, dynamic> notification) async {
    final response = await http.put(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.updateMedicalNotification.replaceAll('{id}', id)),
      headers: await _getHeaders(),
      body: jsonEncode(notification),
    );
    return await _handleResponse(response);
  }

  Future<void> deleteMedicalNotification(String id) async {
    final response = await http.delete(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.deleteMedicalNotification.replaceAll('{id}', id)),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }
}
