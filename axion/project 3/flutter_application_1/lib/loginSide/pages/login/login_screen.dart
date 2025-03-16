import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/components/button.dart';
import 'package:flutter_application_1/loginSide/components/text_fieald.dart';
import 'package:flutter_application_1/main.dart';
import 'package:flutter_application_1/services/auth_service.dart';
import 'package:flutter_application_1/services/connectivity_service.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:convert';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _loginForm = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final _authService = AuthService();
  final _connectivityService = ConnectivityService();
  bool _isLoading = false;
  String? _error;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    if (!_loginForm.currentState!.validate()) {
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // Check internet connectivity first
      final hasInternet = await _connectivityService.checkInternetConnection();
      if (!hasInternet) {
        setState(() {
          _error = 'No internet connection. Please check your network and try again.';
          _isLoading = false;
        });
        return;
      }

      final result = await _authService.login(
        _emailController.text,
        _passwordController.text,
      );

      if (mounted) {
        if (result['success']) {  
          // Wait a short moment for token to be saved
          await Future.delayed(const Duration(milliseconds: 100));
          isLoggedIn = true;
          if (!mounted) return;
          context.go('/home');
        } else {
          setState(() {
            if (result['details'] != null) {
              print('Login Error Details: ${json.encode(result['details'])}');
            }
            _error = result['error'] ?? 'Login failed';
          });
        }
      }
    } catch (e) {
      print('Login Screen Error: $e');
      if (mounted) {
        setState(() {
          _error = 'An unexpected error occurred. Please try again.';
        });
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
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color ?? Colors.white;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo and welcome message
            Padding(
              padding: const EdgeInsets.only(bottom: 60.0),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 50.0),
                    child: Hero(
                      tag: 'logo',
                      child: SvgPicture.asset(
                        "assets/img/Logo.svg",
                        width: 100,
                        height: 100,
                        semanticsLabel: 'Red dash paths',
                      ),
                    ),
                  ),
                  Text(
                    "Welcome Back",
                    style: GoogleFonts.montserrat(
                      textStyle: TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                        color: textColor,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Login form
            Form(
              key: _loginForm,
              child: Column(
                children: [
                  if (_error != null)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16.0),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.error.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.error_outline,
                              color: theme.colorScheme.error,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                _error!,
                                style: TextStyle(
                                  color: theme.colorScheme.error,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 30.0),
                    child: LoginTextFieald(
                      controller: _emailController,
                      label: "Email",
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your email';
                        }
                        final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
                        if (!emailRegex.hasMatch(value)) {
                          return 'Please enter a valid email address';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 40.0),
                    child: LoginTextFieald(
                      controller: _passwordController,
                      label: "Password",
                      isPassword: true,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your password';
                        }
                        if (value.length < 8) {
                          return 'Password must be at least 8 characters';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 40.0),
                    child: _isLoading
                        ? const CircularProgressIndicator()
                        : LoginButton(
                            onPressed: (BuildContext context) async {
                              await _handleLogin();
                            },
                          ),
                  ),
                  SizedBox(
                    width: 100,
                    height: 100,
                    child: ElevatedButton(
                      onPressed: _isLoading ? null : () {
                        // TODO: Implement biometric authentication
                      },
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(
                          const Color.fromRGBO(21, 23, 28, 1),
                        ),
                        foregroundColor: MaterialStateProperty.all(
                          const Color.fromRGBO(21, 23, 28, 1),
                        ),
                      ),
                      child: SvgPicture.asset("assets/img/biometricAuth.svg"),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
