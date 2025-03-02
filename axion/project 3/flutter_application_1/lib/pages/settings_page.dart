import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/main.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// ==========================
/// DatabaseService
/// ==========================

class DatabaseService {
  static const String baseUrl = 'https://api.example.com';

  static final http.Client client = MockClient((http.Request request) async {
    final String url = request.url.toString();
    await Future.delayed(const Duration(milliseconds: 100));

    if (request.method == 'POST' && url == '$baseUrl/change-password') {
      final Map<String, dynamic> data = json.decode(request.body);
      if (data["currentPassword"] == "password123") {
        return http.Response(json.encode({"success": true}), 200);
      } else {
        return http.Response(json.encode({"success": false}), 200);
      }
    } else if (request.method == 'POST' && url == '$baseUrl/delete-account') {
      return http.Response(json.encode({"success": true}), 200);
    }
    return http.Response('Not Found', 404);
  });

  static Future<bool> changePassword(String currentPassword, String newPassword) async {
    final response = await client.post(
      Uri.parse('$baseUrl/change-password'),
      headers: {"Content-Type": "application/json"},
      body: json.encode({
        "currentPassword": currentPassword,
        "newPassword": newPassword,
      }),
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data["success"] == true;
    }
    return false;
  }

  static Future<bool> deleteAccount() async {
    final response = await client.post(
      Uri.parse('$baseUrl/delete-account'),
      headers: {"Content-Type": "application/json"},
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data["success"] == true;
    }
    return false;
  }
}

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
  bool _isDarkMode = true;
  late String _selectedLanguage;
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
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(loc.settings)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildDarkModeCard(loc),
          const SizedBox(height: 16),
          _buildLanguageCard(loc),
          const SizedBox(height: 16),
          _buildChangePasswordCard(loc),
          const SizedBox(height: 16),
          _buildDeleteAccountCard(loc),
        ],
      ),
    );
  }

  /// Card for toggling dark mode.
  Widget _buildDarkModeCard(AppLocalizations loc) {
    return Card(
      child: SwitchListTile(
        title: Text(loc.darkMode),
        value: _isDarkMode,
        onChanged: (bool value) {
          setState(() => _isDarkMode = value);
          final newMode = value ? ThemeMode.dark : ThemeMode.light;
          MyApp.themeNotifier.value = newMode;
          saveThemeMode(newMode);
        },
      ),
    );
  }

  /// Card for selecting the language.
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
          onChanged: (String? value) {
            if (value != null) {
              setState(() {
                _selectedLanguage = value;
                final newLocale = _languageMap[value]!;
                MyApp.setLocale(newLocale);
                saveLocale(newLocale);
              });
            }
          },
        ),
      ),
    );
  }

  /// Card for changing the password.
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

  /// Card for deleting the account.
  Widget _buildDeleteAccountCard(AppLocalizations loc) {
    return Card(
      child: ListTile(
        title: Text(loc.deleteAccount),
        trailing: const Icon(Icons.delete_forever, color: Colors.red),
        onTap: () {
          showDialog(
            context: context,
            builder: (_) => AlertDialog(
              title: Text(loc.confirmDeletion),
              content: Text(loc.deleteMessage),
              actions: [
                TextButton(
                  child: Text(loc.no),
                  onPressed: () => Navigator.of(context).pop(),
                ),
                TextButton(
                  child: Text(loc.yes),
                  onPressed: () async {
                    final success = await DatabaseService.deleteAccount();
                    Navigator.of(context).pop(); // Close the dialog.
                    if (success) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("Account successfully deleted")),
                      );
                      // Optionally, navigate to a login screen.
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("Account deletion failed")),
                      );
                    }
                  },
                ),
              ],
            ),
          );
        },
      ),
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
  final TextEditingController currentPasswordController = TextEditingController();
  final TextEditingController newPasswordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  bool _currentPasswordVisible = false;
  bool _newPasswordVisible = false;
  bool _confirmPasswordVisible = false;

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
        title: const Text('Confirmation'),
        content: const Text('Your password has been successfully changed.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  Future<void> _attemptChangePassword() async {
    if (newPasswordController.text != confirmPasswordController.text) {
      _showErrorDialog("New password and confirm password do not match.");
      return;
    }
    final success = await DatabaseService.changePassword(
      currentPasswordController.text,
      newPasswordController.text,
    );
    if (success) {
      _showConfirmationDialog();
    } else {
      _showErrorDialog("Current password is incorrect.");
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Change Password'),
      content: SingleChildScrollView(
        child: Column(
          children: [
            _buildPasswordField(
              "Current Password",
              currentPasswordController,
              _currentPasswordVisible,
              () => setState(() => _currentPasswordVisible = !_currentPasswordVisible),
            ),
            _buildPasswordField(
              "New Password",
              newPasswordController,
              _newPasswordVisible,
              () => setState(() => _newPasswordVisible = !_newPasswordVisible),
            ),
            _buildPasswordField(
              "Confirm Password",
              confirmPasswordController,
              _confirmPasswordVisible,
              () => setState(() => _confirmPasswordVisible = !_confirmPasswordVisible),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _attemptChangePassword,
          child: const Text('Confirm'),
        ),
      ],
    );
  }

  Widget _buildPasswordField(
    String label,
    TextEditingController controller,
    bool visible,
    VoidCallback toggleVisibility,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: TextField(
        controller: controller,
        obscureText: !visible,
        decoration: InputDecoration(
          labelText: label,
          suffixIcon: IconButton(
            icon: Icon(visible ? Icons.visibility : Icons.visibility_off),
            onPressed: toggleVisibility,
          ),
          border: const OutlineInputBorder(),
        ),
      ),
    );
  }
}
