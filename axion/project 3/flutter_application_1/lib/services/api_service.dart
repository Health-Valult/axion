import 'dart:convert';
import 'package:flutter_application_1/services/api_config.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_application_1/models/user.dart';
import 'package:flutter_application_1/models/notification.dart';
import 'package:flutter_application_1/models/log.dart';
import 'package:flutter_application_1/models/link.dart';
import 'package:uuid/uuid.dart';
import 'package:flutter_application_1/services/env_config.dart';
import 'package:flutter_application_1/services/session_service.dart';
import 'package:flutter_application_1/services/secure_storage_service.dart';

class ApiService {
  final _storage = SecureStorageService();

  // Helper method to get headers with auth token
  Future<Map<String, String>> _getHeaders() async {
    print('\n=== Getting Auth Headers ===');
    final sessionService = SessionService();
    final token = await sessionService.getSessionToken();
    print('Token found: ${token != null}');
    
    if (token == null) {
      print('❌ No auth token found in secure storage');
    }
    
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': token != null ? 'Bearer $token' : '',
    };
    print('Headers prepared: ${headers.toString()}');
    print('=====================\n');
    return headers;
  }

  // Helper method to handle API response with better error handling
  Future<Map<String, dynamic>> _handleResponse(http.Response response) async {
    print('\n=== Handling API Response ===');
    print('Status Code: ${response.statusCode}');
    
    try {
      final data = jsonDecode(response.body);
      print('Response Data:');
      print(const JsonEncoder.withIndent('  ').convert(data));
      
      if (response.statusCode >= 200 && response.statusCode < 300) {
        print('✅ Request Successful');
        return {
          'success': true,
          'data': data,
        };
      } else {
        print('❌ Request Failed');
        final error = data['message'] ?? data['error'] ?? 'An error occurred';
        print('Error: $error');
        return {
          'success': false,
          'error': error,
          'statusCode': response.statusCode,
        };
      }
    } on FormatException catch (e) {
      print('❌ Invalid Response Format');
      print('Error: ${e.toString()}');
      return {
        'success': false,
        'error': 'Invalid response format from server',
        'statusCode': response.statusCode,
      };
    } catch (e) {
      print('❌ Unexpected Error');
      print('Error: ${e.toString()}');
      return {
        'success': false,
        'error': 'Failed to process response: ${e.toString()}',
        'statusCode': response.statusCode,
      };
    } finally {
      print('=====================\n');
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
    final url = Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.auth.signupUser);
    print('\n=== Signup Request ===');
    print('Request URL: $url');
    print('Request Data:');
    print(const JsonEncoder.withIndent('  ').convert(userData));

    // Validate required fields
    final requiredFields = [
      'FirstName',
      'LastName',
      'Email',
      'Password',
      'Telephone',
      'NIC',
      'DateOfBirth'
    ];

    for (final field in requiredFields) {
      if (!userData.containsKey(field) || userData[field] == null || userData[field].toString().trim().isEmpty) {
        print('❌ Validation Error: $field is required');
        return {
          'success': false,
          'error': '$field is required',
        };
      }
    }

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(userData),
      );

      print('\n=== Signup Response ===');
      print('Status Code: ${response.statusCode}');
      
      final responseData = jsonDecode(response.body);
      print('Response Data:');
      print(const JsonEncoder.withIndent('  ').convert(responseData));

      if (response.statusCode >= 200 && response.statusCode < 300) {
        print('✅ Signup Successful');
        return {
          'success': true,
          'data': responseData,
        };
      } else {
        print('❌ Signup Failed');
        final error = responseData['message'] ?? responseData['error'] ?? 'Signup failed';
        print('Error: $error');
        return {
          'success': false,
          'error': error,
        };
      }
    } on http.ClientException catch (e) {
      print('❌ Network Error: ${e.toString()}');
      return {
        'success': false,
        'error': 'Network error occurred. Please check your internet connection.',
      };
    } on FormatException catch (e) {
      print('❌ Response Format Error: ${e.toString()}');
      return {
        'success': false,
        'error': 'Invalid response from server',
      };
    } catch (e) {
      print('❌ Signup Error: ${e.toString()}');
      return {
        'success': false,
        'error': e.toString(),
      };
    } finally {
      print('=====================\n');
    }
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

    try {
      final result = await _makeApiCall(() => http.post(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.validateEmail),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email}),
      ));

      if (result['success'] == false && result['error'].toString().contains('Network error')) {
        return {
          'success': false,
          'error': 'Unable to validate email. Please check your internet connection.',
        };
      }

      if (result['success'] == false) {
        return {
          'success': false,
          'error': result['error'] ?? 'Email is already registered',
        };
      }

      return {
        'success': true,
        'data': result['data'],
      };
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error occurred. Please try again.',
      };
    }
  }

  Future<Map<String, dynamic>> sendOTP(String recipient, {required String otpType}) async {
    if (recipient.isEmpty) {
      return {
        'success': false,
        'error': 'Recipient is required',
      };
    }

    // Generate a UUID for this OTP request
    final String requestId = const Uuid().v4();

    try {
      final response = await _makeApiCall(() => http.post(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.sendOTP),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'recipient': recipient,
          'type': otpType,
          'requestId': requestId,
        }),
      ));

      print('Request ID: $requestId');

      if (response['success']) {
        // Store the requestId in secure storage
        final userData = await _storage.readSecure(SecureStorageService.userDataKey);
        final Map<String, dynamic> updatedUserData = userData != null 
          ? json.decode(userData) as Map<String, dynamic>
          : {};
        updatedUserData['last_otp_request_id'] = requestId;
        
        await _storage.writeSecure(
          SecureStorageService.userDataKey,
          json.encode(updatedUserData)
        );
      }

      return response;
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
  }

  Future<Map<String, dynamic>> verifyOTP(String email, String otp) async {
    // Get the stored requestId from secure storage
    final userData = await _storage.readSecure(SecureStorageService.userDataKey);
    if (userData == null) {
      return {
        'success': false,
        'error': 'No user data found',
      };
    }

    final Map<String, dynamic> userDataMap = json.decode(userData);
    final String? requestId = userDataMap['last_otp_request_id'] as String?;

    if (requestId == null) {
      return {
        'success': false,
        'error': 'Invalid OTP request. Please request a new OTP.',
      };
    }

    try {
      final response = await _makeApiCall(() => http.post(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.verifyOTP),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'otp': otp,
          'requestId': requestId,
        }),
      ));

      if (response['success']) {
        // Clear the stored requestId after successful validation
        userDataMap.remove('last_otp_request_id');
        await _storage.writeSecure(
          SecureStorageService.userDataKey,
          json.encode(userDataMap)
        );
      }

      return response;
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
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
    
    if (data['success'] && data.containsKey('data') && data['data'].containsKey('token')) {
      final sessionService = SessionService();
      await sessionService.setSession(
        token: data['data']['token'],
        refreshToken: data['data']['refresh_token'] ?? '',
        expiry: DateTime.now().add(const Duration(hours: 1)),
        userData: data['data']['user'] ?? {},
      );
    }
    return data;
  }

  Future<Map<String, dynamic>> logout() async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.logout),
        headers: await _getHeaders(),
      );
      final result = await _handleResponse(response);
      
      // Clear session data regardless of API response
      final sessionService = SessionService();
      await sessionService.clearSession();
      
      return result;
    } catch (e) {
      print('Logout error: $e');
      // Still clear session on error
      final sessionService = SessionService();
      await sessionService.clearSession();
      
      return {
        'success': false,
        'error': e.toString(),
      };
    }
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

  // Settings methods - Only keep critical account operations
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

  Future<void> deleteAccount() async {
    final response = await http.delete(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.deleteAccount),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  Future<void> verifyAndDeleteAccount(String nic, String password) async {
    final response = await http.post(
      Uri.parse(ApiConfig.baseUrl + ApiConfig.verifyAndDeleteAccount),
      headers: await _getHeaders(),
      body: jsonEncode({
        'nic': nic,
        'password': password,
      }),
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
    final result = await _makeApiCall(() async {
      final headers = await _getHeaders();
      return http.get(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.getLogs),
        headers: headers,
      );
    });

    if (result['success']) {
      final List<dynamic> logs = result['data'];
      return logs.map((log) => Log.fromJson(log)).toList();
    }
    throw Exception(result['error']);
  }

  Future<Log> getLogDetails(String id) async {
    final result = await _makeApiCall(() async {
      final headers = await _getHeaders();
      return http.get(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.getLogDetails.replaceAll('{id}', id)),
        headers: headers,
      );
    });

    if (result['success']) {
      return Log.fromJson(result['data']);
    }
    throw Exception(result['error']);
  }

  // Link methods
  Future<List<Link>> getLinks() async {
    final result = await _makeApiCall(() async {
      final headers = await _getHeaders();
      return http.get(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.getLinks),
        headers: headers,
      );
    });

    if (result['success']) {
      final List<dynamic> links = result['data'];
      return links.map((link) => Link.fromJson(link)).toList();
    }
    throw Exception(result['error']);
  }

  Future<bool> validateLink(String url) async {
    final result = await _makeApiCall(() async {
      final headers = await _getHeaders();
      return http.post(
        Uri.parse(ApiConfig.baseUrl + ApiConfig.validateLink),
        headers: headers,
        body: jsonEncode({'url': url}),
      );
    });

    return result['success'];
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
