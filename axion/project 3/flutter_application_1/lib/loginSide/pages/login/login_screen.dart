import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/components/button.dart';
import 'package:flutter_application_1/loginSide/components/text_fieald.dart';
import 'package:flutter_application_1/main.dart';
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

  // Hard-coded credentials.
  final String correctNIC = "1111111111";
  final String correctPassword = "Rivindu123";

  @override
  void dispose() {
    _nicController.dispose();
    _passwordController.dispose();
    super.dispose();
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
            // Logo and welcome message.
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
            // Login form.
            Form(
              key: _loginForm,
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 30.0),
                    child: LoginTextFieald(
                      controller: _nicController,
                      label: "NIC",
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
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
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        if (value.length < 8) {
                          return 'Password is too short';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 40.0),
                    child: LoginButton(
                      onPressed: (context) {
                        if (_loginForm.currentState!.validate()) {
                          // Check hard-coded credentials.
                          if (_nicController.text == correctNIC &&
                              _passwordController.text == correctPassword) {
                            // Set global authentication flag to true.
                            isLoggedIn = true;
                            // Redirect to the home page (make sure your router maps '/home' to HomePage).
                            context.go('/home');
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text("Invalid credentials"),
                              ),
                            );
                          }
                        }
                      },
                    ),
                  ),
                  SizedBox(
                    width: 100,
                    height: 100,
                    child: ElevatedButton(
                      onPressed: () {},
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(
                            const Color.fromRGBO(21, 23, 28, 1)),
                        foregroundColor: MaterialStateProperty.all(
                            const Color.fromRGBO(21, 23, 28, 1)),
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
