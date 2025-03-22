import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/components/button.dart'; // Your custom button.
import 'package:flutter_application_1/loginSide/components/text_fieald.dart';
import 'package:flutter_application_1/services/auth_service.dart';
import 'package:flutter_application_1/services/connectivity_service.dart';
import 'package:flutter_application_1/main.dart'; // Assumes isLoggedIn is defined here.
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

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
  bool _obscurePassword = true;

  // Field-specific errors.
  String? _emailError;
  String? _passwordError;
  // General error.
  String? _error;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    final l10n = AppLocalizations.of(context)!;

    // Reset previous errors.
    setState(() {
      _emailError = null;
      _passwordError = null;
      _error = null;
    });

    if (!_loginForm.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    try {
      final hasInternet = await _connectivityService.checkInternetConnection();
      if (!hasInternet) {
        setState(() {
          _error = l10n.noInternetError;
          _isLoading = false;
        });
        return;
      }

      final result = await _authService.login(
        _emailController.text,
        _passwordController.text,
      );

      if (result['success'] == true) {
        await Future.delayed(const Duration(milliseconds: 500));
        isLoggedIn = true;
        context.go('/home');
      } else {
        final statusCode = result['statusCode'] as int?;
        final errorText = (result['error'] ?? '').toLowerCase();

        setState(() {
          if (statusCode == 404) {
            _emailError = l10n.loginErrorAccountNotFound;
          } else if (statusCode == 401) {
            _passwordError = l10n.loginErrorIncorrectPassword;
          } else if (statusCode == 422) {
            // Handle 422 (e.g., invalid email format or similar validation error).
            _emailError = l10n.emailValidationInvalid; 
          } else {
            _error = result['error'] ?? l10n.unexpectedError;
          }
        });
      }
    } catch (e) {
      print('Login Screen Error: $e');
      setState(() {
        _error = l10n.unexpectedError;
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: theme.iconTheme.color),
          onPressed: () => context.go('/'),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      resizeToAvoidBottomInset: false,
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Logo / image section.
              Padding(
                padding: const EdgeInsets.only(bottom: 60.0),
                child: Hero(
                  tag: 'logo',
                  child: SvgPicture.asset(
                    "assets/img/login_image.svg",
                    width: 200,
                    height: 200,
                    semanticsLabel: l10n.loginImage,
                  ),
                ),
              ),
              Form(
                key: _loginForm,
                child: Column(
                  children: [
                    // General error container.
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
                              Icon(Icons.error_outline,
                                  color: theme.colorScheme.error),
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
                    // Email text field.
                    Padding(
                      padding: const EdgeInsets.only(bottom: 30.0),
                      child: LoginTextFieald(
                        controller: _emailController,
                        label: l10n.emailLabel,
                        errorText: _emailError,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return l10n.emailValidationEmpty;
                          }
                          final emailRegex = RegExp(
                              r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
                          if (!emailRegex.hasMatch(value)) {
                            return l10n.emailValidationInvalid;
                          }
                          return null;
                        },
                      ),
                    ),
                    // Password text field.
                    Padding(
                      padding: const EdgeInsets.only(bottom: 40.0),
                      child: LoginTextFieald(
                        controller: _passwordController,
                        label: l10n.passwordLabel,
                        isPassword: _obscurePassword,
                        errorText: _passwordError,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return l10n.passwordValidationEmpty;
                          }
                          if (value.length < 8) {
                            return l10n.passwordValidationLength;
                          }
                          return null;
                        },
                        suffixIcon: IconButton(
                          icon: Icon(
                            _obscurePassword
                                ? Icons.visibility
                                : Icons.visibility_off,
                          ),
                          onPressed: () {
                            setState(() {
                              _obscurePassword = !_obscurePassword;
                            });
                          },
                          tooltip: _obscurePassword
                              ? l10n.showPassword
                              : l10n.hidePassword,
                        ),
                      ),
                    ),
                    // Login button using your custom LoginButton.
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
                    // Biometric authentication button placeholder.
                    SizedBox(
                      width: 100,
                      height: 100,
                      child: ElevatedButton(
                        onPressed: _isLoading
                            ? null
                            : () {
                                // TODO: Implement biometric authentication.
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
      ),
    );
  }
}
