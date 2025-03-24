import 'package:flutter/material.dart';
import 'package:flutter_application_1/pages/settings_page.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:flutter_application_1/models/user.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_1/main.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ProfilePage extends StatelessWidget {
  final User user;

  const ProfilePage({super.key, required this.user});

  String formatDob(dynamic dob) {
    if (dob is int) {
      final dobStr = dob.toString();
      if (dobStr.length == 8) {
        return '${dobStr.substring(6, 8)}/${dobStr.substring(4, 6)}/${dobStr.substring(0, 4)}';
      }
      return dobStr;
    }
    else if (dob is String) {
      if (dob.contains('-') || dob.contains('T')) {
        try {
          final date = DateTime.parse(dob);
          return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
        } catch (e) {
          return dob;
        }
      } else if (dob.length == 8) {
        return '${dob.substring(6, 8)}/${dob.substring(4, 6)}/${dob.substring(0, 4)}';
      }
      return dob;
    }
    return '';
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final cardColor = isDarkMode
        ? const Color.fromRGBO(13, 14, 18, 1)
        : const Color.fromRGBO(241, 241, 241, 1);
    final headlineStyle = Theme.of(context).textTheme.headlineMedium;

    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
          color: Colors.blue,
          onRefresh: () async {},
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 120),
            child: Column(
              children: [
                Center(
                  child: Column(
                    children: [
                      CircleAvatar(
                        radius: 50,
                        backgroundColor:
                            isDarkMode ? Colors.grey[700] : Colors.grey[200],
                        child: Text(
                          '${user.firstName[0]}${user.lastName[0]}',
                          style: headlineStyle?.copyWith(
                            color: isDarkMode
                                ? Colors.white
                                : Colors.grey[800],
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        '${user.firstName} ${user.lastName}',
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        user.email,
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                Card(
                  color: cardColor,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          loc.contactInfo,
                          style: const TextStyle(fontSize: 18),
                        ),
                        const SizedBox(height: 16),
                        ListTile(
                          leading: const Icon(Icons.email),
                          title: Text(loc.email),
                          subtitle: Text(user.email),
                        ),
                        ListTile(
                          leading: const Icon(Icons.phone),
                          title: Text(loc.phone),
                          subtitle: Text(user.telephone),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Card(
                  color: cardColor,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          loc.personalInfo,
                          style: const TextStyle(fontSize: 18),
                        ),
                        const SizedBox(height: 16),
                        ListTile(
                          leading: const Icon(Icons.person),
                          title: Text(loc.fullName),
                          subtitle:
                              Text('${user.firstName} ${user.lastName}'),
                        ),
                        ListTile(
                          leading: const Icon(Icons.cake),
                          title: Text(loc.birthday),
                          subtitle: Text(formatDob(user.dateOfBirth)),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 32),
                ListTile(
                  leading: const Icon(Icons.settings_outlined),
                  title: Text(loc.settings),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => const SettingsPage(),
                      ),
                    );
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.logout),
                  title: Text(loc.logout),
                  onTap: () {
                    _showLogoutConfirmation(context);
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _showLogoutConfirmation(BuildContext context) async {
    final loc = AppLocalizations.of(context)!;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(loc.confirmLogout),
        content: Text(loc.logoutMessage),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(loc.cancel),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(loc.logout),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      if (!context.mounted) return;

      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) => const Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
          ),
        ),
      );

      try {
        final result = await ApiService().logout();

        if (!context.mounted) return;
        Navigator.of(context).pop();

        if (result['success']) {
          isLoggedIn = false;
          context.go('/login');
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
                content: Text('${loc.logoutFailed}: ${result['error'] ?? ''}')),
          );
          if (!context.mounted) return;
          isLoggedIn = false;
          context.go('/login');
        }
      } catch (e) {
        if (!context.mounted) return;
        Navigator.of(context).pop();

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${loc.logoutFailed}: $e')),
        );
        if (!context.mounted) return;
        isLoggedIn = false;
        context.go('/login');
      }
    }
  }
}
