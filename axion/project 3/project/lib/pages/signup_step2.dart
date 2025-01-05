import 'package:flutter/material.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/custom_button.dart';
import '../widgets/progress_bar.dart';
import 'signup_step3.dart';

class SignupStep2 extends StatelessWidget {
  const SignupStep2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();

    return Scaffold(
      resizeToAvoidBottomInset: false, // Prevent content shift when keyboard appears
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
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
                  const ProgressBar(currentStep: 2),
                  const SizedBox(height: 40),
                  CustomTextField(
                    hintText: 'Telephone',
                    keyboardType: TextInputType.phone,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Telephone cannot be empty';
                      }
                      if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
                        return 'Enter a valid phone number';
                      }
                      return null;
                    },
                  ),
                  CustomTextField(
                    hintText: 'NIC',
                    keyboardType: TextInputType.number,
                    validator: (value) => value == null || value.isEmpty
                        ? 'NIC cannot be empty'
                        : null,
                  ),
                  CustomTextField(
                    hintText: 'Date of Birth (DD/MM/YYYY)',
                    keyboardType: TextInputType.datetime,
                    validator: (value) => value == null || value.isEmpty
                        ? 'Date of Birth cannot be empty'
                        : null,
                  ),
                  const SizedBox(height: 60),
                  CustomButton(
                    text: 'Next',
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => const SignupStep3()),
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
