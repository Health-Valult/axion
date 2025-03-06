import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/components/button.dart';
import 'package:flutter_application_1/loginSide/components/text_fieald.dart';
import 'package:flutter_application_1/main.dart';
import 'package:flutter_application_1/services/auth_service.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _loginForm = GlobalKey<FormState>();
  final TextEditingController _nicController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final _authService = AuthService();
  bool _isLoading = false;
  String? _error;

  @override
  void dispose() {
    _nicController.dispose();
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
      final result = await _authService.login(
        _nicController.text,
        _passwordController.text,
      );

      if (mounted) {
        if (result['success']) {
          isLoggedIn = true;
          context.go('/home');
        } else {
          setState(() {
            _error = result['error'];
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(_error ?? 'Login failed')),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = 'Network error occurred';
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(_error!)),
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
                      child: Text(
                        _error!,
                        style: TextStyle(
                          color: theme.colorScheme.error,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 30.0),
                    child: LoginTextFieald(
                      controller: _nicController,
                      label: "NIC",
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your NIC';
                        }
                        if (!(value.length == 10 || value.length == 12)) {
                          return 'Incorrect NIC format';
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
