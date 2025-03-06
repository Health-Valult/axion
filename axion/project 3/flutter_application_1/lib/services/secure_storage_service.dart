import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'dart:convert';

class SecureStorageService {
  static final SecureStorageService _instance = SecureStorageService._internal();
  factory SecureStorageService() => _instance;
  SecureStorageService._internal();

  final _storage = const FlutterSecureStorage();
  static const _keyPrefix = 'app_';
  static const _encryptionKeyKey = '${_keyPrefix}encryption_key';
  
  // Encryption key management
  encrypt.Key? _encryptionKey;
  final _iv = encrypt.IV.fromLength(16);

  Future<void> init() async {
    // Generate or retrieve encryption key
    String? storedKey = await _storage.read(key: _encryptionKeyKey);
    if (storedKey == null) {
      final key = encrypt.Key.fromSecureRandom(32);
      await _storage.write(key: _encryptionKeyKey, value: base64.encode(key.bytes));
      _encryptionKey = key;
    } else {
      _encryptionKey = encrypt.Key(base64.decode(storedKey));
    }
  }

  Future<void> writeSecure(String key, String value) async {
    if (_encryptionKey == null) await init();
    final encrypter = encrypt.Encrypter(encrypt.AES(_encryptionKey!));
    final encrypted = encrypter.encrypt(value, iv: _iv);
    await _storage.write(key: '$_keyPrefix$key', value: encrypted.base64);
  }

  Future<String?> readSecure(String key) async {
    if (_encryptionKey == null) await init();
    final encrypted = await _storage.read(key: '$_keyPrefix$key');
    if (encrypted == null) return null;
    
    final encrypter = encrypt.Encrypter(encrypt.AES(_encryptionKey!));
    try {
      final decrypted = encrypter.decrypt64(encrypted, iv: _iv);
      return decrypted;
    } catch (e) {
      return null;
    }
  }

  Future<void> deleteSecure(String key) async {
    await _storage.delete(key: '$_keyPrefix$key');
  }

  Future<void> clearAll() async {
    await _storage.deleteAll();
  }

  // Session-specific storage keys
  static const sessionTokenKey = 'session_token';
  static const refreshTokenKey = 'refresh_token';
  static const sessionExpiryKey = 'session_expiry';
  static const userDataKey = 'user_data';
}
