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
    final loc = AppLocalizations.of(context)!;

    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text(loc.settings)),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text(loc.settings)),
      body: RefreshIndicator(
        onRefresh: _loadSettings,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _buildDarkModeCard(loc),
            const SizedBox(height: 16),
            _buildLanguageCard(loc),
            const SizedBox(height: 16),
            _buildNotificationsCard(loc),
            const SizedBox(height: 16),
            _buildPrivacyCard(loc),
            const SizedBox(height: 16),
            _buildChangePasswordCard(loc),
            const SizedBox(height: 16),
            _buildDeleteAccountCard(loc),
          ],
        ),
      ),
    );
  }

  Widget _buildDarkModeCard(AppLocalizations loc) {
    return Card(
      child: SwitchListTile(
        title: Text(loc.darkMode),
        value: _isDarkMode,
        onChanged: (bool value) async {
          setState(() => _isDarkMode = value);
          final newMode = value ? ThemeMode.dark : ThemeMode.light;
          MyApp.themeNotifier.value = newMode;
          await saveThemeMode(newMode);
        },
      ),
    );
  }

  Widget _buildLanguageCard(AppLocalizations loc) {
    return Card(
      child: Column(
        children: [
          ListTile(
            title: Text(loc.language),
          ),
          ...(_languageMap.keys.map((language) => RadioListTile<String>(
            title: Text(language),
            value: language,
            groupValue: _selectedLanguage,
            onChanged: (String? value) async {
              if (value != null) {
                setState(() => _selectedLanguage = value);
                final newLocale = _languageMap[value]!;
                MyApp.localeNotifier.value = newLocale;
                await saveLocale(newLocale);
              }
            },
          ))),
        ],
      ),
    );
  }

  Widget _buildNotificationsCard(AppLocalizations loc) {
    return Card(
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

  Widget _buildPrivacyCard(AppLocalizations loc) {
    return Card(
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

  Widget _buildChangePasswordCard(AppLocalizations loc) {
    return Card(
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

  Widget _buildDeleteAccountCard(AppLocalizations loc) {
    return Card(
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
  final _nicController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _nicController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _attemptDeleteAccount() async {
    if (_nicController.text.isEmpty || _passwordController.text.isEmpty) {
      _showErrorDialog('Please fill in all fields');
      return;
    }

    setState(() => _isLoading = true);

    try {
      await _apiService.verifyAndDeleteAccount(
        _nicController.text,
        _passwordController.text,
      );
      
      if (mounted) {
        Navigator.of(context).pop(); // Close dialog
        Navigator.of(context).pushReplacementNamed('/login');
      }
    } catch (e) {
      if (mounted) {
        _showErrorDialog(e.toString());
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
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

  void _showConfirmationDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirm Account Deletion'),
        content: const Text(
          'Are you sure you want to delete your account? This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _attemptDeleteAccount();
            },
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Delete'),
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
              controller: _nicController,
              decoration: InputDecoration(
                labelText: loc.nic,
                border: const OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: loc.password,
                border: const OutlineInputBorder(),
              ),
              obscureText: true,
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
            style: TextButton.styleFrom(foregroundColor: Colors.red),
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

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _attemptChangePassword() async {
    if (_currentPasswordController.text.isEmpty ||
        _newPasswordController.text.isEmpty ||
        _confirmPasswordController.text.isEmpty) {
      _showErrorDialog('Please fill in all fields');
      return;
    }

    if (_newPasswordController.text != _confirmPasswordController.text) {
      _showErrorDialog('New passwords do not match');
      return;
    }

    setState(() => _isLoading = true);

    try {
      await _apiService.changePassword(
        _currentPasswordController.text,
        _newPasswordController.text,
      );
      
      if (mounted) {
        _showConfirmationDialog();
      }
    } catch (e) {
      if (mounted) {
        _showErrorDialog(e.toString());
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
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

  void _showConfirmationDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Success'),
        content: const Text('Your password has been changed successfully.'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(); // Close confirmation dialog
              Navigator.of(context).pop(); // Close change password dialog
            },
            child: const Text('OK'),
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
  ) {
    return TextField(
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
