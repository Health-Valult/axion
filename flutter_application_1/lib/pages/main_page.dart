import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/user.dart';
import 'package:flutter_application_1/pages/home_page.dart';
import 'package:flutter_application_1/pages/log_page.dart';
import 'package:flutter_application_1/pages/reports_page.dart';
import 'package:flutter_application_1/pages/link_page.dart';
import 'package:flutter_application_1/pages/profile_page.dart';
import 'package:flutter_application_1/widgets/floating_nav_bar.dart'; 
import 'package:flutter_application_1/services/api_service.dart';
import 'package:flutter_application_1/services/notification_service.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _currentIndex = 0;
  bool _showAuthNotification = false;
  Timer? _authPoller;
  final TextEditingController _verificationController = TextEditingController();
  String _authNotificationText = "Authentication Required. Tap to verify.";
  User? _currentUser;

  List<Widget> get _pages => [
    const HomePage(),
    const ReportsPage(),
    const LogPage(),
    _currentUser == null 
      ? const Center(child: CircularProgressIndicator()) 
      : ProfilePage(user: _currentUser!),
    const LinkPage(),
  ];

  @override
  void initState() {
    super.initState();
    _loadCurrentUser();
    _startAuthNotificationPolling();
  }

  Future<void> _loadCurrentUser() async {
    try {
      for (int i = 0; i < 3; i++) {
        try {
          final user = await ApiService().getUserProfile();
          if (mounted) {
            setState(() {
              _currentUser = user;
            });
          }
          return; 
        } catch (e) {
          if (i < 2) {
            await Future.delayed(Duration(milliseconds: (i + 1) * 500));
          }
        }
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to load profile. Please try refreshing.'),
            duration: Duration(seconds: 3),
          ),
        );
      }
    } catch (e) {
      debugPrint('Error loading user: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to load profile. Please try refreshing.'),
            duration: Duration(seconds: 3),
          ),
        );
      }
    }
  }

  @override
  void dispose() {
    _authPoller?.cancel();
    _verificationController.dispose();
    super.dispose();
  }

  void _startAuthNotificationPolling() {
    _authPoller = Timer.periodic(const Duration(seconds: 5), (timer) async {
      bool authRequired = await NotificationService.checkAuthNotification();
      if (authRequired && !_showAuthNotification) {
        setState(() {
          _showAuthNotification = true;
        });
      }
    });
  }

  void _showAuthDialog() {
    _verificationController.clear();
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        String errorMsg = '';
        return StatefulBuilder(
          builder: (context, setStateDialog) {
            return AlertDialog(
              title: const Text("Authentication Required"),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: _verificationController,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      labelText: "Enter Verification Code",
                    ),
                  ),
                  if (errorMsg.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        errorMsg,
                        style: const TextStyle(color: Colors.red),
                      ),
                    ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    // Cancel
                    Navigator.of(context).pop();
                    setState(() {
                      _showAuthNotification = false;
                      _authNotificationText = "Authentication Required. Tap to verify.";
                    });
                    NotificationService.resetAuthNotification();
                  },
                  child: const Text("Cancel"),
                ),
                ElevatedButton(
                  onPressed: () {
                    const correctCode = "123456";
                    if (_verificationController.text.trim() == correctCode) {
                      Navigator.of(context).pop();
                      setState(() {
                        _authNotificationText = "Authentication Successful";
                      });
                      NotificationService.resetAuthNotification();
                      NotificationService.addNotification({
                        "title": "Authentication Verified",
                        "description": "Your verification code has been accepted.",
                        "read": false,
                      });
                      // After 1 second, hide overlay
                      Future.delayed(const Duration(seconds: 1), () {
                        setState(() {
                          _showAuthNotification = false;
                          _authNotificationText = "Authentication Required. Tap to verify.";
                        });
                      });
                    } else {
                      setStateDialog(() {
                        errorMsg = "Incorrect verification code";
                      });
                    }
                  },
                  child: const Text("Send"),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(child: _pages[_currentIndex]),
          if (_showAuthNotification)
            Positioned(
              top: 50,
              left: 16,
              right: 16,
              child: GestureDetector(
                onTap: _showAuthDialog,
                child: Material(
                  elevation: 4,
                  borderRadius: BorderRadius.circular(8),
                  color: Colors.orangeAccent,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        const Icon(Icons.lock, color: Colors.white),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            _authNotificationText,
                            style: const TextStyle(color: Colors.white),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
      bottomNavigationBar: FloatingNavBar(
        currentIndex: _currentIndex,
        onItemSelected: (index) {
          setState(() => _currentIndex = index);
        },
      ),
    );
  }
}
