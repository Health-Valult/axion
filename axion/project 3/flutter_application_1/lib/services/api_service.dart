import 'dart:convert';
import 'dart:async';
import 'package:flutter_application_1/services/env_config.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_application_1/models/user.dart';
import 'package:flutter_application_1/models/notification.dart';
import 'package:flutter_application_1/models/log.dart';
import 'package:uuid/uuid.dart';
import 'package:flutter_application_1/services/session_service.dart';
import 'package:flutter_application_1/services/secure_storage_service.dart';

class ApiService {
  final _storage = SecureStorageService();

  // Helper method to get headers with auth token
  Future<Map<String, String>> _getHeaders() async {
    print('\n=== Getting Request Headers ===');
    final sessionService = SessionService();
    final token = await sessionService.getSessionToken();

    print('Session Token: ${token != null ? '${token.substring(0, 10)}...' : 'null'}');
    
    final headers = {
      'Content-Type': 'application/json',
    };

    if (token != null) {
      print('✅ Adding Authorization header');
      headers['Authorization'] = 'Bearer $token';
    } else {
      print('❌ No session token available');
    }

    print('Final Headers:');
    print(const JsonEncoder.withIndent('  ').convert(headers));
    print('=== End Request Headers ===\n');

    return headers;
  }

  // Helper method to handle API response
  Future<Map<String, dynamic>> _handleResponse(http.Response response) async {
    try {
      final data = jsonDecode(response.body);
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return {
          'success': true,
          ...data,
        };
      } else {
        final error = data['message'] ?? data['error'] ?? 'An error occurred';
        return {
          'success': false,
          'error': error,
          'statusCode': response.statusCode,
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Failed to process response: ${e.toString()}',
        'statusCode': response.statusCode,
      };
    }
  }

  // Helper method to make API calls with retry
  Future<Map<String, dynamic>> _makeApiCall(
      Future<http.Response> Function() apiCall) async {
    try {
      final response = await apiCall().timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw TimeoutException('Request timed out');
        },
      );

      return _handleResponse(response);
    } catch (e) {
      return {
        'success': false,
        'error': e.toString(),
      };
    }
  }

  // ----------------------------
  // Authentication Methods
  // ----------------------------

  Future<Map<String, dynamic>> signupUser(
      Map<String, dynamic> userData) async {
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
      if (!userData.containsKey(field) ||
          userData[field] == null ||
          userData[field].toString().trim().isEmpty) {
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
        return {
          'success': true,
          'data': responseData,
        };
      } else {
        final error =
            responseData['message'] ?? responseData['error'] ?? 'Signup failed';
        return {
          'success': false,
          'error': error,
          'statusCode': response.statusCode,
        };
      }
    } on http.ClientException catch (e) {
      print('❌ Network Error: ${e.toString()}');
      return {
        'success': false,
        'error':
            'Network error occurred. Please check your internet connection.',
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

  Future<Map<String, dynamic>> sendOTP(String recipient,
      {required String otpType}) async {
    print('\n=== Send OTP Request ===');

    if (recipient.isEmpty) {
      print('❌ Send OTP Validation Error: Recipient is empty');
      return {
        'success': false,
        'error': 'Recipient is required',
      };
    }

    // Generate a UUID for this OTP request
    final String requestId = const Uuid().v4();
    print('Generated UUID: $requestId');

    try {
      final requestBody = {
        'type': otpType,
        'tempID': requestId,
        'data': recipient,
      };

      print('Request URL: ${EnvConfig.apiBaseUrl}${EnvConfig.auth.sendOTP}');
      print('Request Body:');
      print(const JsonEncoder.withIndent('  ').convert(requestBody));

      final response = await http.post(
        Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.auth.sendOTP),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(requestBody),
      );

      print('\nResponse Status: ${response.statusCode}');
      print('Response Body:');
      print(const JsonEncoder.withIndent('  ').convert(jsonDecode(response.body)));

      if (response.statusCode >= 200 && response.statusCode < 300) {
        print('✅ OTP sent successfully');

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
        print('✅ Request ID stored in secure storage');

        return {
          'success': true,
          'data': jsonDecode(response.body),
        };
      } else {
        print('❌ OTP send failed with status ${response.statusCode}');
        final error = jsonDecode(response.body)['message'] ?? 'Failed to send OTP';
        print('Error: $error');
        return {
          'success': false,
          'error': error,
        };
      }
    } catch (e) {
      print('❌ OTP send error');
      print('Error: $e');
      return {
        'success': false,
        'error': e.toString(),
      };
    } finally {
      print('======================\n');
    }
  }

  Future<Map<String, dynamic>> verifyOTP(String email, String otp) async {
    if (email.isEmpty || otp.isEmpty) {
      print('❌ Verify OTP Validation Error: Email or OTP is empty');
      return {
        'success': false,
        'error': 'Email and OTP are required',
      };
    }

    try {
      print('\n=== Verify OTP Request ===');
      print('URL: ${EnvConfig.apiBaseUrl}${EnvConfig.auth.verifyOTP}');
      
      // Get the stored request ID
      final userData = await _storage.readSecure(SecureStorageService.userDataKey);
      final Map<String, dynamic>? userDataMap = userData != null 
          ? json.decode(userData) as Map<String, dynamic>
          : null;
      final String? requestId = userDataMap?['last_otp_request_id'];
      
      print('Stored Request ID: ${requestId ?? 'Not found'}');
      
      final requestBody = {
        'email': email,
        'otp': otp,
        'tempID': requestId,
      };
      print('Request Body:');
      print(const JsonEncoder.withIndent('  ').convert(requestBody));

      final response = await _makeApiCall(() => http.post(
        Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.auth.verifyOTP),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(requestBody),
      ));

      print('\nResponse:');
      print(const JsonEncoder.withIndent('  ').convert(response));

      if (response['success']) {
        print('✅ OTP verified successfully');
      } else {
        print('❌ OTP verification failed');
        print('Error: ${response['error']}');
      }

      return response;
    } catch (e) {
      print('❌ OTP verification error');
      print('Error: $e');
      return {'success': false, 'error': e.toString()};
    } finally {
      print('======================\n');
    }
  }

  Future<Map<String, dynamic>> loginUser(String email, String password) async {
    print('\n=== Login Request ===');
    final url = Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.auth.loginUser);
    print('URL: $url');
    print('Request Data:');
    print(const JsonEncoder.withIndent('  ').convert({
      'email': email,
      'password': '********', // Masked for security
    }));

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      print('\n=== Login Response ===');
      print('Status Code: ${response.statusCode}');

      final data = await _handleResponse(response);
      print('Response Data:');
      final sanitizedData = Map<String, dynamic>.from(data);
      if (sanitizedData['data'] != null && sanitizedData['data']['token'] != null) {
        sanitizedData['data']['token'] = '********'; // Mask token for logging
      }
      print(const JsonEncoder.withIndent('  ').convert(sanitizedData));

      if (data['success'] && data.containsKey('data') && data['data'].containsKey('token')) {
        print('✅ Login Successful');
        final sessionService = SessionService();
        final sessionStored = await sessionService.setSession(
          token: data['data']['token'],
          refreshToken: data['data']['refresh_token'] ?? '',
          expiry: DateTime.now().add(const Duration(hours: 1)),
          userData: data['data']['user'] ?? {},
        );

        if (!sessionStored) {
          print('❌ Failed to store session data');
          return {
            'success': false,
            'error': 'Failed to store session data. Please try again.',
          };
        }

        print('✅ Session data stored successfully');
        // Add a small delay to ensure storage is fully complete
        await Future.delayed(const Duration(milliseconds: 100));
        return data;
      } else {
        print('❌ Login Failed');
        print('Error: ${data['error'] ?? 'Unknown error'}');
        return data;
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
      print('❌ Login Error: ${e.toString()}');
      return {
        'success': false,
        'error': e.toString(),
      };
    } finally {
      print('=====================\n');
    }
  }

  Future<Map<String, dynamic>> logout() async {
    try {
      // Make logout request
      await _makeApiCall(() async {
        final headers = await _getHeaders();
        final url = Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.auth.logout);
        return http.post(
          url,
          headers: headers,
        );
      });

      // Always clear session data
      final sessionService = SessionService();
      await sessionService.clearSession();

      return {
        'success': true,
        'message': 'Logged out successfully',
      };
    } catch (e) {
      // Clear session even if request fails
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
      Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.auth.resetPassword),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );
    await _handleResponse(response);
  }

  // ----------------------------
  // Profile Methods
  // ----------------------------

  Future<User> getUserProfile() async {
    print('\n=== Getting User Profile ===');
    final url = Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.profile.profile);
    print('Request URL: $url');
    
    final headers = await _getHeaders();
    print('Request Headers: ${const JsonEncoder.withIndent('  ').convert(headers)}');
    
    try {
      final response = await http.get(url, headers: headers);
      
      print('Response Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode != 200) {
        throw Exception('Failed to get profile: ${response.statusCode}');
      }

      // Parse the response body directly since it contains the user data
      final data = jsonDecode(response.body);
      print('Parsed Response: ${const JsonEncoder.withIndent('  ').convert(data)}');
      
      // Create user directly from response data
      return User.fromJson(data);
    } catch (e) {
      print('Error in getUserProfile: $e');
      throw Exception('Error fetching user profile: $e');
    } finally {
      print('=== End Getting User Profile ===\n');
    }
  }

  // ----------------------------
  // Settings Methods
  // ----------------------------

  Future<void> changePassword(String currentPassword, String newPassword) async {
    // Validate passwords
    if (currentPassword.isEmpty || newPassword.isEmpty) {
      throw Exception('Both current and new passwords are required');
    }

    // Password validation regex
    final passwordRegex = RegExp(
      r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    );

    if (!passwordRegex.hasMatch(newPassword)) {
      throw Exception(
        'Password must be at least 8 characters long and contain:\n'
        '- At least one uppercase letter\n'
        '- At least one lowercase letter\n'
        '- At least one number\n'
        '- At least one special character (@\$!%*?&)'
      );
    }

    if (currentPassword == newPassword) {
      throw Exception('New password must be different from current password');
    }

    print('\n=== Change Password Debug ===');
    print('Base URL: ${EnvConfig.apiBaseUrl}');
    print('Reset Password Path: ${EnvConfig.auth.resetPassword}');

    // Remove any trailing slashes from base URL
    final baseUrl = EnvConfig.apiBaseUrl.endsWith('/')
        ? EnvConfig.apiBaseUrl.substring(0, EnvConfig.apiBaseUrl.length - 1)
        : EnvConfig.apiBaseUrl;

    final url = Uri.parse('$baseUrl${EnvConfig.auth.resetPassword}');
    final headers = await _getHeaders();
    final requestBody = {
      'Old': currentPassword,
      'New': newPassword,
    };

    print('\n=== Change Password Request ===');
    print('Full URL: $url');
    print('Headers: ${headers.toString()}');
    print('Request Body: ${jsonEncode(requestBody)}');

    try {
      final response = await http.post(
        url,
        headers: headers,
        body: jsonEncode(requestBody),
      );

      print('\n=== Change Password Response ===');
      print('Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      final data = await _handleResponse(response);

      if (!data['success']) {
        throw Exception(data['error'] ?? 'Failed to change password');
      }
    } catch (e) {
      print('\n=== Change Password Error ===');
      print('Error: $e');
      throw e;
    } finally {
      print('=========================\n');
    }
  }

  Future<Map<String, dynamic>> deleteAccount(String email, String password) async {
    print('\n=== Delete Account Request ===');

    // Validate input
    if (email.isEmpty || password.isEmpty) {
      return {
        'success': false,
        'error': 'Email and password are required',
      };
    }

    // Validate email format
    if (!RegExp(r'^[^@]+@[^@]+\.[^@]+$').hasMatch(email)) {
      return {
        'success': false,
        'error': 'Invalid email format',
      };
    }

    try {
      final headers = await _getHeaders();
      final url = Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.profile.delete);
      final requestBody = {
        'Password': password,
        'Email': email,
      };

      print('Request URL: $url');
      print('Headers: ${headers.toString()}');
      print('Request Body: ${jsonEncode(requestBody)}');

      final response = await http.post(
        url,
        headers: headers,
        body: jsonEncode(requestBody),
      );

      print('Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      final result = await _handleResponse(response);

      if (result['success']) {
        // Clear session on successful deletion
        final sessionService = SessionService();
        await sessionService.clearSession();
      }

      return result;
    } catch (e) {
      print('Error: $e');
      return {
        'success': false,
        'error': 'Failed to delete account: ${e.toString()}',
      };
    } finally {
      print('=========================\n');
    }
  }

  // ----------------------------
  // Notifications Methods (Modified)
  // ----------------------------

  // Only GET notifications functionality is available.
  Future<List<AppNotification>> getNotifications() async {
    final response = await http.get(
      Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.notifications.get),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('notifications')) {
      return List<AppNotification>.from(
        (data['notifications'] as List).map((json) => AppNotification.fromJson(json))
      );
    }
    return [];
  }

  // ----------------------------
  // Log Methods
  // ----------------------------

  Future<List<Log>> getLogs() async {
    final result = await _makeApiCall(() async {
      final headers = await _getHeaders();
      return http.get(
        Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.logs.get),
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
        Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.logs.details.replaceAll('{id}', id)),
        headers: headers,
      );
    });

    if (result['success']) {
      return Log.fromJson(result['data']);
    }
    throw Exception(result['error']);
  }

  // ----------------------------
  // Medical Notifications Methods
  // ----------------------------

  Future<List<Map<String, dynamic>>> getMedicalNotifications() async {
    final response = await http.get(
      Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.notifications.get),
      headers: await _getHeaders(),
    );
    final data = await _handleResponse(response);
    if (data.containsKey('notifications')) {
      return List<Map<String, dynamic>>.from(data['notifications']);
    }
    return [];
  }

  Future<Map<String, dynamic>> addMedicalNotification(Map<String, dynamic> notification) async {
    final response = await http.post(
      Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.notifications.get),
      headers: await _getHeaders(),
      body: jsonEncode(notification),
    );
    return await _handleResponse(response);
  }

  Future<Map<String, dynamic>> updateMedicalNotification(String id, Map<String, dynamic> notification) async {
    final response = await http.put(
      Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.notifications.get + '/$id'),
      headers: await _getHeaders(),
      body: jsonEncode(notification),
    );
    return await _handleResponse(response);
  }

  Future<void> deleteMedicalNotification(String id) async {
    final response = await http.delete(
      Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.notifications.get + '/$id'),
      headers: await _getHeaders(),
    );
    await _handleResponse(response);
  }

  // ----------------------------
  // Connect with OTP Method
  // ----------------------------

  Future<Map<String, dynamic>> connectWithOTP({required String otp}) async {
    print('\n=== OTP Connect Request ===');

    if (otp.isEmpty) {
      print('❌ Validation Error: OTP is required');
      return {
        'success': false,
        'error': 'OTP is required',
      };
    }

    if (!RegExp(r'^[a-zA-Z0-9]{6}$').hasMatch(otp)) {
      print('❌ Validation Error: Invalid OTP format');
      return {
        'success': false,
        'error': 'Invalid OTP format',
      };
    }

    final url = Uri.parse(EnvConfig.apiBaseUrl + EnvConfig.auth.connectOTP);
    print('Request URL: $url');

    final requestData = {
      'otp': otp,
    };
    print('Request Data:');
    print(const JsonEncoder.withIndent('  ').convert(requestData));

    try {
      final headers = await _getHeaders();
      final result = await _makeApiCall(() => http.post(
        url,
        headers: headers,
        body: jsonEncode(requestData),
      ));

      print('\n=== OTP Connect Response ===');
      if (result['success']) {
        print('✅ OTP Connect Successful');
        print('Response Data:');
        print(const JsonEncoder.withIndent('  ').convert(result['data']));
      } else {
        print('❌ OTP Connect Failed');
        print('Error: ${result['error']}');
      }

      return result;
    } catch (e) {
      print('❌ OTP Connect Error: ${e.toString()}');
      return {
        'success': false,
        'error': e.toString(),
      };
    } finally {
      print('=====================\n');
    }
  }
}
