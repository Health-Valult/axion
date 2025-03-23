import 'dart:async';
import 'dart:convert';
import 'package:flutter_application_1/services/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_application_1/services/secure_storage_service.dart';
import 'package:flutter_application_1/services/graphql_config.dart';
import 'package:flutter_application_1/services/env_config.dart';

class SessionService {
  static final SessionService _instance = SessionService._internal();
  factory SessionService() => _instance;
  SessionService._internal();

  final _storage = SecureStorageService();
  Timer? _refreshTimer;
  bool _isRefreshing = false;

  // Session management
  Future<bool> isSessionValid() async {
    final expiryStr = await _storage.readSecure(SecureStorageService.sessionExpiryKey);
    if (expiryStr == null) return false;
    
    final expiry = DateTime.parse(expiryStr);
    return DateTime.now().isBefore(expiry);
  }

  Future<bool> setSession({
    required String token,
    required String refreshToken,
    required DateTime expiry,
    required Map<String, dynamic> userData,
  }) async {
    try {
      // First update the GraphQL client token to ensure it's ready immediately
      GraphQLConfig.token = token;
      GraphQLConfig.updateToken(token);

      // Store tokens sequentially to ensure order
      await _storage.writeSecure(SecureStorageService.sessionTokenKey, token);
      await _storage.writeSecure(SecureStorageService.refreshTokenKey, refreshToken);
      await _storage.writeSecure(SecureStorageService.sessionExpiryKey, expiry.toIso8601String());
      await _storage.writeSecure(SecureStorageService.userDataKey, json.encode(userData));

      // Verify token was stored correctly
      final storedToken = await _storage.readSecure(SecureStorageService.sessionTokenKey);
      if (storedToken != token) {
        print('❌ Token storage verification failed');
        return false;
      }

      // Schedule token refresh
      _scheduleTokenRefresh(expiry);
      return true;
    } catch (e) {
      print('❌ Error storing session data: $e');
      await clearSession(); // Clean up on error
      return false;
    }
  }

  Future<void> clearSession() async {
    print('\n=== Clearing Session Data ===');
    try {
      print('Cancelling refresh timer...');
      _refreshTimer?.cancel();
      
      print('Clearing secure storage...');
      await _storage.clearAll();
      print('Secure storage cleared');
      
      print('Updating GraphQL token...');
      GraphQLConfig.updateToken('');
      print('GraphQL token cleared');
      
      print('=== Session Data Cleared Successfully ===\n');
    } catch (e) {
      print('\n❌ Error clearing session:');
      print('Error details: $e');
      print('Stack trace:');
      print(StackTrace.current);
      print('=== Session Clear Failed ===\n');
      rethrow;
    }
  }

  // Token refresh management
  void _scheduleTokenRefresh(DateTime expiry) {
    _refreshTimer?.cancel();
    
    // Schedule refresh 5 minutes before expiry
    final refreshTime = expiry.subtract(const Duration(minutes: 5));
    final now = DateTime.now();
    
    if (refreshTime.isAfter(now)) {
      _refreshTimer = Timer(refreshTime.difference(now), _refreshToken);
    } else {
      // Token is already close to expiry or expired, refresh immediately
      _refreshToken();
    }
  }

  Future<void> _refreshToken() async {
    if (_isRefreshing) return;
    _isRefreshing = true;

    try {
      final refreshToken = await _storage.readSecure(SecureStorageService.refreshTokenKey);
      if (refreshToken == null || AuthService.baseUrl.isEmpty) {
        await clearSession();
        return;
      }

      final response = await http.post(
        Uri.parse('${AuthService.baseUrl}/auth/refresh'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $refreshToken',
        },
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final newToken = data['token'];
        final newRefreshToken = data['refreshToken'];
        final expiry = DateTime.now().add(Duration(seconds: EnvConfig.accessTokenDuration));

        await setSession(
          token: newToken,
          refreshToken: newRefreshToken,
          expiry: expiry,
          userData: data['userData'] ?? {},
        );
      } else {
        // Refresh token is invalid or expired
        await clearSession();
      }
    } catch (e) {
      // Handle network errors
      print('Error refreshing token: $e');
    } finally {
      _isRefreshing = false;
    }
  }

  // User data management
  Future<Map<String, dynamic>?> getUserData() async {
    final userDataStr = await _storage.readSecure(SecureStorageService.userDataKey);
    if (userDataStr == null) return null;
    return json.decode(userDataStr);
  }

  Future<String?> getSessionToken() async {
    print('\n=== Getting Session Token ===');
    final token = await _storage.readSecure(SecureStorageService.sessionTokenKey);
    print('Token from storage: ${token != null ? '${token.substring(0, 10)}...' : 'null'}');
    
    if (token == null) {
      print('❌ No token found in storage');
      return null;
    }

    final isValid = await isSessionValid();
    print('Is session valid? $isValid');
    
    if (!isValid) {
      print('❌ Session is expired, clearing...');
      await clearSession();
      return null;
    }

    print('✅ Valid token found');
    return token;
  }
}
