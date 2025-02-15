import 'package:flutter/material.dart';
import 'package:flutter_application_1/pages/settings_page.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    // Hardcoded user data
    const userName = 'Elizja';
    const userEmail = 'elizja@gmail.com';
    const userPhone = '+934726531232';
    const displayName = 'Elizja Abram';

    return Scaffold(
      body: Stack(
        children: [
          // Dark header
          Container(
            height: 120,
            padding: const EdgeInsets.only(left: 16, right: 16, top: 40),
            alignment: Alignment.centerLeft,
            child: Text(
              loc.profile,
              style: const TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),

          // White panel with user details
          SingleChildScrollView(
            child: Container(
              margin: const EdgeInsets.only(top: 130, left: 16, right: 16),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
              decoration: BoxDecoration(
                color: Theme.of(context).cardColor,
                borderRadius: const BorderRadius.all(Radius.circular(24)),
              ),
              child: Column(
                children: [
                  const SizedBox(height: 60), // Space for avatar

                  // User Name
                  Text(
                    displayName,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),

                  // User Details List
                  _buildDetailRow(Icons.person_outlined, loc.username, userName),
                  _buildDetailRow(Icons.email_outlined, loc.email, userEmail),
                  _buildDetailRow(Icons.phone_outlined, loc.phone, userPhone),

                  const Divider(height: 30),

                  // Settings option
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

                  // Logout button
                  ListTile(
                    leading: const Icon(Icons.logout),
                    title: Text(loc.logout),
                    onTap: () {
                      _showLogoutConfirmation(context, loc);
                    },
                  ),
                ],
              ),
            ),
          ),

          // Avatar with edit option
          Positioned(
            top: 80,
            left: MediaQuery.of(context).size.width / 2 - 50,
            child: Stack(
              children: [
                CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.grey[200],
                  backgroundImage: const NetworkImage(
                    'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
                  ),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: InkWell(
                    onTap: () {
                      _showEditDetailsPage(context);
                    },
                    child: CircleAvatar(
                      radius: 16,
                      backgroundColor: Colors.blue,
                      child: const Icon(
                        Icons.edit,
                        size: 16,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Helper for building detail rows
  static Widget _buildDetailRow(IconData icon, String label, String value) {
    return ListTile(
      leading: Icon(icon),
      title: Text(label),
      subtitle: Text(value),
    );
  }

  // Show logout confirmation dialog
  void _showLogoutConfirmation(BuildContext context, AppLocalizations loc) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(loc.logout),
          content: Text(loc.logoutMessage),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(loc.cancel),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close dialog
                // Perform logout logic
              },
              child: Text(loc.logout),
            ),
          ],
        );
      },
    );
  }

  // Show edit details page
  void _showEditDetailsPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const EditDetailsPage(),
      ),
    );
  }
}

class EditDetailsPage extends StatelessWidget {
  const EditDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final TextEditingController displayNameController = TextEditingController();
    final TextEditingController usernameController = TextEditingController();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController phoneController = TextEditingController();

    return Scaffold(
      appBar: AppBar(title: Text(loc.editDetails)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(controller: displayNameController, decoration: InputDecoration(labelText: loc.profile)),
            const SizedBox(height: 16),
            TextField(controller: usernameController, decoration: InputDecoration(labelText: loc.username)),
            const SizedBox(height: 16),
            TextField(controller: emailController, decoration: InputDecoration(labelText: loc.email)),
            const SizedBox(height: 16),
            TextField(controller: phoneController, decoration: InputDecoration(labelText: loc.phone)),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                if (displayNameController.text.isEmpty &&
                    usernameController.text.isEmpty &&
                    emailController.text.isEmpty &&
                    phoneController.text.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(loc.noChangesMade)));
                  return;
                }

                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: Text(loc.confirmChanges),
                      content: Text(loc.confirmChanges),
                      actions: [
                        TextButton(onPressed: () => Navigator.of(context).pop(), child: Text(loc.cancel)),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                            Navigator.of(context).pop();
                          },
                          child: Text(loc.saveChanges),
                        ),
                      ],
                    );
                  },
                );
              },
              child: Text(loc.saveChanges),
            ),
          ],
        ),
      ),
    );
  }
}
