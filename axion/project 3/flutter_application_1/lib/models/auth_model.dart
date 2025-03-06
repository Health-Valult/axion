import 'package:shared_preferences/shared_preferences.dart';

class AuthModel {
  static const String _tokenKey = 'auth_token';
  static const String _userTypeKey = 'user_type';
  
  final _prefs = SharedPreferences.getInstance();
  
  Future<void> setAuthToken(String token) async {
    final prefs = await _prefs;
    await prefs.setString(_tokenKey, token);
  }
  
  Future<String?> getAuthToken() async {
    final prefs = await _prefs;
    return prefs.getString(_tokenKey);
  }
  
  Future<void> setUserType(String userType) async {
    final prefs = await _prefs;
    await prefs.setString(_userTypeKey, userType);
  }
  
  Future<String?> getUserType() async {
    final prefs = await _prefs;
    return prefs.getString(_userTypeKey);
  }
  
  Future<void> clearAuth() async {
    final prefs = await _prefs;
    await prefs.remove(_tokenKey);
    await prefs.remove(_userTypeKey);
  }
  
  Future<bool> isAuthenticated() async {
    final token = await getAuthToken();
    return token != null;
  }
}
