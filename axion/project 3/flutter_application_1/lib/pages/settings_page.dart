import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/main.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_application_1/models/settings.dart';
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

/// ==========================
/// SettingsPage
/// ==========================

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  final _apiService = ApiService();
  bool _isDarkMode = true;
  late String _selectedLanguage;
  bool _isLoading = true;
  String? _error;
  Settings? _settings;

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

  Future<void> _loadSettings({int retryCount = 3}) async {
    while (retryCount > 0) {
      try {
        setState(() {
          _isLoading = true;
          _error = null;
        });

        final settings = await _apiService.getSettings();
        setState(() {
          _settings = settings as Settings?;
          _isLoading = false;
        });
        return;
      } catch (e) {
        retryCount--;
        if (retryCount == 0) {
          setState(() {
            _error = e.toString();
            _isLoading = false;
          });
        } else {
          await Future.delayed(const Duration(seconds: 1));
        }
      }
    }
  }

  Future<Settings?> _loadSettingsFromPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final settingsJson = prefs.getString('settings');
      if (settingsJson != null) {
        final Map<String, dynamic> settingsMap = json.decode(settingsJson);
        return Settings.fromJson(settingsMap);
      }
      return null;
    } catch (e) {
      print('Error loading settings: $e');
      return null;
    }
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

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(title: Text(loc.settings)),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Error: $_error'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _loadSettings,
                child: Text(loc.retry),
              ),
            ],
          ),
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
            _buildChangePasswordCard(loc),
            const SizedBox(height: 16),
            _buildDeleteAccountCard(loc),
            if (_settings?.notifications.isNotEmpty ?? false) ...[
              const SizedBox(height: 16),
              _buildNotificationsCard(loc),
            ],
            if (_settings?.privacy.isNotEmpty ?? false) ...[
              const SizedBox(height: 16),
              _buildPrivacyCard(loc),
            ],
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
          try {
            await _apiService.updateSettings({'darkMode': value});
            setState(() => _isDarkMode = value);
            final newMode = value ? ThemeMode.dark : ThemeMode.light;
            MyApp.themeNotifier.value = newMode;
            await saveThemeMode(newMode);
          } catch (e) {
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Failed to update theme: ${e.toString()}')),
              );
            }
          }
        },
      ),
    );
  }

  Widget _buildLanguageCard(AppLocalizations loc) {
    return Card(
      child: ListTile(
        title: Text(loc.language),
        trailing: DropdownButton<String>(
          value: _selectedLanguage,
          items: _languageMap.keys.map((String lang) {
            return DropdownMenuItem<String>(
              value: lang,
              child: Text(lang),
            );
          }).toList(),
          onChanged: (String? value) async {
            if (value != null) {
              try {
                final newLocale = _languageMap[value]!;
                await _apiService.updateSettings({'language': newLocale.languageCode});
                setState(() => _selectedLanguage = value);
                MyApp.setLocale(newLocale);
                await saveLocale(newLocale);
              } catch (e) {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Failed to update language: ${e.toString()}')),
                  );
                }
              }
            }
          },
        ),
      ),
    );
  }

  Widget _buildChangePasswordCard(AppLocalizations loc) {
    return Card(
      child: ListTile(
        title: Text(loc.changePassword),
        trailing: const Icon(Icons.lock, color: Colors.blueGrey),
        onTap: () {
          showDialog(
            context: context,
            builder: (_) => const ChangePasswordDialog(),
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
        trailing: const Icon(Icons.delete_forever, color: Colors.red),
        onTap: () => _showDeleteAccountDialog(loc),
      ),
    );
  }

  Widget _buildNotificationsCard(AppLocalizations loc) {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              loc.notificationPreferences,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _settings!.notifications.length,
            itemBuilder: (context, index) {
              final notification = _settings!.notifications[index];
              return SwitchListTile(
                title: Text(notification),
                value: _settings!.preferences['notifications']?[notification] ?? false,
                onChanged: (bool value) async {
                  try {
                    await _apiService.updateNotificationPreferences({notification: value});
                    await _loadSettings();
                  } catch (e) {
                    if (mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Failed to update notification preference: ${e.toString()}')),
                      );
                    }
                  }
                },
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildPrivacyCard(AppLocalizations loc) {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              loc.privacySettings,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _settings!.privacy.length,
            itemBuilder: (context, index) {
              final entry = _settings!.privacy.entries.elementAt(index);
              return SwitchListTile(
                title: Text(entry.key),
                value: entry.value as bool,
                onChanged: (bool value) async {
                  try {
                    await _apiService.updatePrivacyPreference(entry.key, value);
                    await _loadSettings();
                  } catch (e) {
                    if (mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Failed to update privacy setting: ${e.toString()}')),
                      );
                    }
                  }
                },
              );
            },
          ),
        ],
      ),
    );
  }

  Future<void> _showDeleteAccountDialog(AppLocalizations loc) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(loc.confirmDeletion),
        content: Text(loc.deleteAccountWarning),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(loc.cancel),
          ),
          TextButton(
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(loc.delete),
          ),
        ],
      ),
    );

    if (confirm == true && mounted) {
      try {
        await _apiService.deleteAccount();
        if (mounted) {
          Navigator.of(context).pushReplacementNamed('/login');
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Failed to delete account: ${e.toString()}')),
          );
        }
      }
    }
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
  bool _currentPasswordVisible = false;
  bool _newPasswordVisible = false;
  bool _confirmPasswordVisible = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _attemptChangePassword() async {
    final loc = AppLocalizations.of(context)!;
    
    if (_currentPasswordController.text.isEmpty ||
        _newPasswordController.text.isEmpty ||
        _confirmPasswordController.text.isEmpty) {
      _showErrorDialog(loc.allFieldsRequired);
      return;
    }

    if (_newPasswordController.text != _confirmPasswordController.text) {
      _showErrorDialog(loc.passwordsDoNotMatch);
      return;
    }

    setState(() => _isLoading = true);

    try {
      await _apiService.changePassword(
        _currentPasswordController.text,
        _newPasswordController.text,
      );
      if (mounted) {
        Navigator.of(context).pop();
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
        title: Text(AppLocalizations.of(context)!.error),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(AppLocalizations.of(context)!.ok),
          ),
        ],
      ),
    );
  }

  void _showConfirmationDialog() {
    final loc = AppLocalizations.of(context)!;
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(loc.success),
        content: Text(loc.passwordChangeSuccess),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(loc.ok),
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
        suffixIcon: IconButton(
          icon: Icon(visible ? Icons.visibility_off : Icons.visibility),
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
        _isLoading
            ? const CircularProgressIndicator()
            : ElevatedButton(
                onPressed: _attemptChangePassword,
                child: Text(loc.save),
              ),
      ],
    );
  }
}