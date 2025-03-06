import 'package:flutter/material.dart';
import 'package:flutter_application_1/pages/settings_page.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:flutter_application_1/models/user.dart';

class ProfilePage extends StatefulWidget {
  final User user;
  
  const ProfilePage({
    super.key,
    required this.user,
  });

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final displayName = '${widget.user.firstName} ${widget.user.lastName}';

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
                  _buildDetailRow(Icons.person_outlined, loc.name, displayName),
                  _buildDetailRow(Icons.email_outlined, loc.email, widget.user.email),
                  if (widget.user.phoneNumber != null)
                    _buildDetailRow(Icons.phone_outlined, loc.phone, widget.user.phoneNumber!),

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
                  backgroundImage: widget.user.profilePicture != null
                      ? NetworkImage(widget.user.profilePicture!)
                      : null,
                  child: widget.user.profilePicture == null
                      ? Text(
                          '${widget.user.firstName[0]}${widget.user.lastName[0]}',
                          style: const TextStyle(fontSize: 24),
                        )
                      : null,
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

  Widget _buildDetailRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Icon(icon),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: const TextStyle(
                    fontSize: 14,
                    color: Colors.grey,
                  ),
                ),
                Text(
                  value,
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

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
              onPressed: () async {
                Navigator.of(context).pop();
                try {
                  await ApiService().logout();
                  // Navigate to login page or handle logout success
                } catch (e) {
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Logout failed: ${e.toString()}')),
                    );
                  }
                }
              },
              child: Text(loc.logout),
            ),
          ],
        );
      },
    );
  }

  void _showEditDetailsPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => EditDetailsPage(),
      ),
    );
  }
}

class EditDetailsPage extends StatefulWidget {
  const EditDetailsPage({super.key});

  @override
  State<EditDetailsPage> createState() => _EditDetailsPageState();
}

class _EditDetailsPageState extends State<EditDetailsPage> {
  final _formKey = GlobalKey<FormState>();
  final ApiService _apiService = ApiService();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _updateProfile() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    try {
      await _apiService.updateProfile({
        'firstName': _firstNameController.text,
        'lastName': _lastNameController.text,
        'email': _emailController.text,
        'phoneNumber': _phoneController.text,
      });

      if (mounted) {
        Navigator.pop(context, true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Update failed: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(loc.editDetails)),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              TextFormField(
                controller: _firstNameController,
                decoration: InputDecoration(labelText: loc.firstName),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return loc.firstNameRequired;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _lastNameController,
                decoration: InputDecoration(labelText: loc.lastName),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return loc.lastNameRequired;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _emailController,
                decoration: InputDecoration(labelText: loc.email),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return loc.emailRequired;
                  }
                  if (!value.contains('@')) {
                    return loc.invalidEmail;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _phoneController,
                decoration: InputDecoration(labelText: loc.phone),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return loc.phoneRequired;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _isLoading ? null : _updateProfile,
                child: _isLoading
                    ? const CircularProgressIndicator()
                    : Text(loc.save),
              ),
            ],
          ),
        ),
      ),
    );
  }
}