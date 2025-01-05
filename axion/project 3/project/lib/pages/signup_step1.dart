import 'package:flutter/material.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/custom_button.dart';
import '../widgets/progress_bar.dart';
import 'signup_step2.dart';

class SignupStep1 extends StatelessWidget {
  const SignupStep1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();

    return Scaffold(
      resizeToAvoidBottomInset: false, // Prevent content from moving with keyboard
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Sign up',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 20),
                  const ProgressBar(currentStep: 1),
                  const SizedBox(height: 40),
                  CustomTextField(
                    hintText: 'First Name',
                    validator: (value) => value == null || value.isEmpty
                        ? 'First Name cannot be empty'
                        : null,
                  ),
                  CustomTextField(
                    hintText: 'Last Name',
                    validator: (value) => value == null || value.isEmpty
                        ? 'Last Name cannot be empty'
                        : null,
                  ),
                  CustomTextField(
                    hintText: 'Email',
                    keyboardType: TextInputType.emailAddress,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Email cannot be empty';
                      }
                      final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
                      if (!emailRegex.hasMatch(value)) {
                        return 'Enter a valid email address';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 60),
                  CustomButton(
                    text: 'Next',
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => const SignupStep2()),
                        );
                      }
                    },
                  ),
                  const SizedBox(height: 20),
                  RichText(
                    text: TextSpan(
                      text: 'already have an account? ',
                      style: const TextStyle(color: Colors.white),
                      children: [
                        WidgetSpan(
                          child: GestureDetector(
                            onTap: () {
                              // Placeholder for future Login page
                            },
                            child: const Text(
                              'Login',
                              style: TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
