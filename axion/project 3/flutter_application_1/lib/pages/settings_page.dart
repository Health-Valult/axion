import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/main.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_application_1/services/api_service.dart';

/// ==========================
/// Helper methods to persist settings
/// ==========================

Future<void> saveThemeMode(ThemeMode mode) async {
  final prefs = await SharedPreferences.getInstance();
  String modeString;
  switch (mode) {
    case ThemeMode.dark:
      modeString = 'dark';
      break;
    case ThemeMode.light:
      modeString = 'light';
      break;
    default:
      modeString = 'system';
      break;
  }
  await prefs.setString('theme_mode', modeString);
}

Future<void> saveLocale(Locale locale) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('locale', locale.languageCode);
}

Future<void> saveNotificationPreferences(Map<String, bool> preferences) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('notification_preferences', json.encode(preferences));
}

Future<void> savePrivacySettings(Map<String, bool> settings) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('privacy_settings', json.encode(settings));
}

/// ==========================
/// SettingsPage
/// ==========================

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  bool _isDarkMode = true;
  late String _selectedLanguage;
  bool _isLoading = true;
  Map<String, bool> _notificationPreferences = {};
  Map<String, bool> _privacySettings = {};

  final Map<String, Locale> _languageMap = {
    'English': const Locale('en'),
    'සිංහල': const Locale('si'),
    'தமிழ்': const Locale('ta'),
  };

  @override
  void initState() {
    super.initState();
    _isDarkMode = (MyApp.themeNotifier.value == ThemeMode.dark);
    _selectedLanguage = _languageMap.keys.firstWhere(
      (lang) => _languageMap[lang] == MyApp.localeNotifier.value,
      orElse: () => 'English',
    );
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    setState(() => _isLoading = true);
    
    try {
      final prefs = await SharedPreferences.getInstance();
      
      // Load notification preferences
      final notificationPrefsString = prefs.getString('notification_preferences');
      if (notificationPrefsString != null) {
        _notificationPreferences = Map<String, bool>.from(
          json.decode(notificationPrefsString)
        );
      } else {
        // Default preferences
        _notificationPreferences = {
          'push_notifications': true,
          'email_notifications': true,
          'medical_alerts': true,
        };
      }

      // Load privacy settings
      final privacySettingsString = prefs.getString('privacy_settings');
      if (privacySettingsString != null) {
        _privacySettings = Map<String, bool>.from(
          json.decode(privacySettingsString)
        );
      } else {
        // Default settings
        _privacySettings = {
          'share_profile': false,
          'show_activity': true,
          'allow_recommendations': true,
        };
      }
    } catch (e) {
      // If there's an error, use default values
      _notificationPreferences = {
        'push_notifications': true,
        'email_notifications': true,
        'medical_alerts': true,
      };
      _privacySettings = {
        'share_profile': false,
        'show_activity': true,
        'allow_recommendations': true,
      };
    }

    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    final appLocalizations = AppLocalizations.of(context)!;
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final cardColor = isDarkMode ? const Color.fromRGBO(13, 14, 18, 1) : const Color.fromRGBO(241, 241, 241, 1);

    return Scaffold(
      appBar: AppBar(
        title: Text(appLocalizations.settings),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
            ))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildDarkModeCard(appLocalizations, cardColor),
                  const SizedBox(height: 8),
                  _buildLanguageCard(appLocalizations, cardColor),
                  const SizedBox(height: 8),
                  _buildNotificationsCard(appLocalizations, cardColor),
                  const SizedBox(height: 8),
                  _buildPrivacyCard(appLocalizations, cardColor),
                  const SizedBox(height: 8),
                  _buildChangePasswordCard(appLocalizations, cardColor),
                  const SizedBox(height: 8),
                  _buildDeleteAccountCard(appLocalizations, cardColor),
                ],
              ),
            ),
    );
  }

  Widget _buildDarkModeCard(AppLocalizations loc, Color cardColor) {
    return Card(
      color: cardColor,
      child: SwitchListTile(
        title: Text(loc.darkMode),
        value: _isDarkMode,
        onChanged: (bool value) {
          setState(() => _isDarkMode = value);
          MyApp.themeNotifier.value = value ? ThemeMode.dark : ThemeMode.light;
          saveThemeMode(MyApp.themeNotifier.value);
        },
      ),
    );
  }

  Widget _buildLanguageCard(AppLocalizations loc, Color cardColor) {
    return Card(
      color: cardColor,
      child: Column(
        children: [
          ListTile(
            title: Text(loc.language),
          ),
          ...(_languageMap.keys.map((lang) => RadioListTile<String>(
            title: Text(lang),
            value: lang,
            groupValue: _selectedLanguage,
            onChanged: (String? value) async {
              if (value != null) {
                setState(() => _selectedLanguage = value);
                MyApp.localeNotifier.value = _languageMap[value]!;
                await saveLocale(_languageMap[value]!);
              }
            },
          ))),
        ],
      ),
    );
  }

  Widget _buildNotificationsCard(AppLocalizations loc, Color cardColor) {
    return Card(
      color: cardColor,
      child: Column(
        children: [
          ListTile(
            title: Text(loc.notifications),
          ),
          ...(_notificationPreferences.entries.map((entry) => SwitchListTile(
            title: Text(_getNotificationTitle(entry.key, loc)),
            value: entry.value,
            onChanged: (bool value) async {
              setState(() {
                _notificationPreferences[entry.key] = value;
              });
              await saveNotificationPreferences(_notificationPreferences);
            },
          ))),
        ],
      ),
    );
  }

  Widget _buildPrivacyCard(AppLocalizations loc, Color cardColor) {
    return Card(
      color: cardColor,
      child: Column(
        children: [
          ListTile(
            title: Text(loc.privacy),
          ),
          ...(_privacySettings.entries.map((entry) => SwitchListTile(
            title: Text(_getPrivacySettingTitle(entry.key, loc)),
            value: entry.value,
            onChanged: (bool value) async {
              setState(() {
                _privacySettings[entry.key] = value;
              });
              await savePrivacySettings(_privacySettings);
            },
          ))),
        ],
      ),
    );
  }

  Widget _buildChangePasswordCard(AppLocalizations loc, Color cardColor) {
    return Card(
      color: cardColor,
      child: ListTile(
        title: Text(loc.changePassword),
        trailing: const Icon(Icons.arrow_forward_ios),
        onTap: () {
          showDialog(
            context: context,
            builder: (context) => const ChangePasswordDialog(),
          );
        },
      ),
    );
  }

  Widget _buildDeleteAccountCard(AppLocalizations loc, Color cardColor) {
    return Card(
      color: cardColor,
      child: ListTile(
        title: Text(
          loc.deleteAccount,
          style: const TextStyle(color: Colors.red),
        ),
        trailing: const Icon(Icons.arrow_forward_ios, color: Colors.red),
        onTap: () {
          showDialog(
            context: context,
            builder: (context) => const DeleteAccountDialog(),
          );
        },
      ),
    );
  }

  String _getNotificationTitle(String key, AppLocalizations loc) {
    switch (key) {
      case 'push_notifications':
        return loc.pushNotifications;
      case 'email_notifications':
        return loc.emailNotifications;
      case 'medical_alerts':
        return loc.medicalAlerts;
      default:
        return key;
    }
  }

  String _getPrivacySettingTitle(String key, AppLocalizations loc) {
    switch (key) {
      case 'share_profile':
        return loc.shareProfile;
      case 'show_activity':
        return loc.showActivity;
      case 'allow_recommendations':
        return loc.allowRecommendations;
      default:
        return key;
    }
  }
}

/// ==========================
/// DeleteAccountDialog
/// ==========================

class DeleteAccountDialog extends StatefulWidget {
  const DeleteAccountDialog({super.key});

  @override
  State<DeleteAccountDialog> createState() => _DeleteAccountDialogState();
}

class _DeleteAccountDialogState extends State<DeleteAccountDialog> {
  final _apiService = ApiService();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  bool _passwordVisible = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _attemptDeleteAccount() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      _showErrorDialog('Please fill in all fields');
      return;
    }

    // Validate email format
    if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email)) {
      _showErrorDialog('Please enter a valid email address');
      return;
    }

    setState(() => _isLoading = true);

    try {
      final result = await _apiService.deleteAccount(email, password);
      
      if (!mounted) return;

      if (result['success']) {
        // Show success message and navigate
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Account deleted successfully')),
        );
        
        Navigator.of(context).pop(); // Close dialog
        Navigator.of(context).pushNamedAndRemoveUntil('/login', (route) => false);
      } else {
        String errorMessage = 'Failed to delete account. Please try again.';
        
        // Handle specific error cases
        if (result['error']?.toLowerCase().contains('password')) {
          errorMessage = 'Incorrect password. Please check your password and try again.';
        } else if (result['error']?.toLowerCase().contains('not found') || 
                  result['error']?.toLowerCase().contains('no account')) {
          errorMessage = 'Account not found. Please check your email.';
        } else if (result['error']?.toLowerCase().contains('authenticated')) {
          errorMessage = 'You must be logged in to delete your account.';
        } else if (result['error'] != null) {
          errorMessage = result['error'];
        }
        
        _showErrorDialog(errorMessage);
      }
    } catch (e) {
      if (!mounted) return;
      _showErrorDialog('An unexpected error occurred. Please try again.');
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      barrierDismissible: true,
      builder: (context) => AlertDialog(
        title: const Text('Error'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showConfirmationDialog() {
    final loc = AppLocalizations.of(context)!;
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text(loc.deleteAccountConfirmation),
        content: Text(loc.deleteAccountWarning),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(loc.cancel),
          ),
          TextButton(
            onPressed: _attemptDeleteAccount,
            style: TextButton.styleFrom(
              foregroundColor: Theme.of(context).colorScheme.error,
            ),
            child: Text(loc.delete),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    
    return AlertDialog(
      title: Text(loc.deleteAccount),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(loc.deleteAccountConfirmation),
            const SizedBox(height: 16),
            TextField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                labelText: loc.email,
                hintText: 'Enter your email address',
                border: const OutlineInputBorder(),
                prefixIcon: const Icon(Icons.email_outlined),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: loc.password,
                hintText: 'Enter your password',
                border: const OutlineInputBorder(),
                prefixIcon: const Icon(Icons.lock_outlined),
                suffixIcon: IconButton(
                  icon: Icon(
                    _passwordVisible ? Icons.visibility_off : Icons.visibility,
                  ),
                  onPressed: () {
                    setState(() {
                      _passwordVisible = !_passwordVisible;
                    });
                  },
                ),
              ),
              obscureText: !_passwordVisible,
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(loc.cancel),
        ),
        if (_isLoading)
          const CircularProgressIndicator()
        else
          TextButton(
            onPressed: _showConfirmationDialog,
            style: TextButton.styleFrom(
              foregroundColor: Theme.of(context).colorScheme.error,
            ),
            child: Text(loc.delete),
          ),
      ],
    );
  }
}

/// ==========================
/// ChangePasswordDialog
/// ==========================

class ChangePasswordDialog extends StatefulWidget {
  const ChangePasswordDialog({super.key});

  @override
  State<ChangePasswordDialog> createState() => _ChangePasswordDialogState();
}

class _ChangePasswordDialogState extends State<ChangePasswordDialog> {
  final _apiService = ApiService();
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _isLoading = false;
  bool _currentPasswordVisible = false;
  bool _newPasswordVisible = false;
  bool _confirmPasswordVisible = false;

  // Password validation states
  bool _hasUpperCase = false;
  bool _hasLowerCase = false;
  bool _hasNumber = false;
  bool _hasSpecialChar = false;
  bool _hasMinLength = false;

  @override
  void initState() {
    super.initState();
    _newPasswordController.addListener(_validatePassword);
  }

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _validatePassword() {
    final password = _newPasswordController.text;
    setState(() {
      _hasUpperCase = password.contains(RegExp(r'[A-Z]'));
      _hasLowerCase = password.contains(RegExp(r'[a-z]'));
      _hasNumber = password.contains(RegExp(r'[0-9]'));
      _hasSpecialChar = password.contains(RegExp(r'[@$!%*?&]'));
      _hasMinLength = password.length >= 8;
    });
  }

  Widget _buildRequirementRow(bool met, String text) {
    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: Row(
        children: [
          Icon(
            met ? Icons.check_circle : Icons.cancel,
            color: met ? Colors.green : Colors.grey,
            size: 16,
          ),
          const SizedBox(width: 8),
          Text(
            text,
            style: TextStyle(
              color: met ? Colors.green : Colors.grey,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPasswordField(
    String label,
    TextEditingController controller,
    bool visible,
    VoidCallback toggleVisibility,
    {bool isNewPassword = false}
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          controller: controller,
          obscureText: !visible,
          decoration: InputDecoration(
            labelText: label,
            border: const OutlineInputBorder(),
            suffixIcon: IconButton(
              icon: Icon(
                visible ? Icons.visibility_off : Icons.visibility,
              ),
              onPressed: toggleVisibility,
            ),
          ),
        ),
        if (isNewPassword) ...[
          const SizedBox(height: 8),
          _buildRequirementRow(_hasMinLength, 'At least 8 characters'),
          _buildRequirementRow(_hasUpperCase, 'At least one uppercase letter'),
          _buildRequirementRow(_hasLowerCase, 'At least one lowercase letter'),
          _buildRequirementRow(_hasNumber, 'At least one number'),
          _buildRequirementRow(_hasSpecialChar, 'At least one special character (@\$!%*?&)'),
        ],
      ],
    );
  }

  Future<void> _attemptChangePassword() async {
    // Validate empty fields
    if (_currentPasswordController.text.isEmpty ||
        _newPasswordController.text.isEmpty ||
        _confirmPasswordController.text.isEmpty) {
      _showErrorDialog('Please fill in all fields');
      return;
    }

    // Password validation regex
    final passwordRegex = RegExp(
      r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    );

    // Validate new password format
    if (!passwordRegex.hasMatch(_newPasswordController.text)) {
      _showErrorDialog(
        'Password must be at least 8 characters long and contain:\n'
        '- At least one uppercase letter\n'
        '- At least one lowercase letter\n'
        '- At least one number\n'
        '- At least one special character (@\$!%*?&)'
      );
      return;
    }

    // Validate passwords match
    if (_newPasswordController.text != _confirmPasswordController.text) {
      _showErrorDialog('New passwords do not match');
      return;
    }

    // Validate new password is different from current
    if (_currentPasswordController.text == _newPasswordController.text) {
      _showErrorDialog('New password must be different from current password');
      return;
    }

    setState(() => _isLoading = true);

    try {
      print('\n=== Change Password Attempt ===');
      print('Current Password: ${_currentPasswordController.text}');
      print('New Password: ${_newPasswordController.text}');
      
      await _apiService.changePassword(
        _currentPasswordController.text,
        _newPasswordController.text,
      );
      
      if (mounted) {
        // Clear the form
        _currentPasswordController.clear();
        _newPasswordController.clear();
        _confirmPasswordController.clear();
        
        // Show success dialog
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Success'),
            content: const Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Your password has been changed successfully.'),
                SizedBox(height: 8),
                Text(
                  'Please use your new password the next time you log in.',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(); // Close success dialog
                  Navigator.of(context).pop(); // Close change password dialog
                },
                child: const Text('OK'),
              ),
            ],
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        print('\n=== Change Password Error ===');
        print('Error: $e');
        _showErrorDialog(e.toString());
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
      print('=========================\n');
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Error'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    
    return AlertDialog(
      title: Text(loc.changePassword),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildPasswordField(
              loc.currentPassword,
              _currentPasswordController,
              _currentPasswordVisible,
              () => setState(() => _currentPasswordVisible = !_currentPasswordVisible),
            ),
            const SizedBox(height: 16),
            _buildPasswordField(
              loc.newPassword,
              _newPasswordController,
              _newPasswordVisible,
              () => setState(() => _newPasswordVisible = !_newPasswordVisible),
              isNewPassword: true,
            ),
            const SizedBox(height: 16),
            _buildPasswordField(
              loc.confirmNewPassword,
              _confirmPasswordController,
              _confirmPasswordVisible,
              () => setState(() => _confirmPasswordVisible = !_confirmPasswordVisible),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(loc.cancel),
        ),
        if (_isLoading)
          const CircularProgressIndicator()
        else
          TextButton(
            onPressed: _attemptChangePassword,
            child: Text(loc.save),
          ),
      ],
    );
  }
}
