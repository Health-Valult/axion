import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/pages/login/login_screen.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';

class SignupStep2 extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final VoidCallback onNext;

  const SignupStep2({
    Key? key,
    required this.formKey,
    required this.onNext,
  }) : super(key: key);

  @override
  _SignupStep2State createState() => _SignupStep2State();
}

class _SignupStep2State extends State<SignupStep2>
    with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: widget.formKey,
          child: Column(
            children: [
              CustomTextField(
                hintText: 'Telephone',
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Telephone cannot be empty';
                  }
                  if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
                    return 'Telephone can only contain digits';
                  }
                  return null;
                },
              ),
              CustomTextField(
                hintText: 'NIC',
                keyboardType: TextInputType.number,
                validator: (value) =>
                    value?.isEmpty ?? true ? 'NIC cannot be empty' : null,
              ),
              CustomTextField(
                hintText: 'Date of Birth (DD/MM/YYYY)',
                keyboardType: TextInputType.datetime,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Date of Birth cannot be empty';
                  }
                  if (!RegExp(r'^\d{2}/\d{2}/\d{4}$').hasMatch(value)) {
                    return 'Date of Birth must be in DD/MM/YYYY format';
                  }
                  final parts = value.split('/');
                  final day = int.tryParse(parts[0]);
                  final month = int.tryParse(parts[1]);
                  final year = int.tryParse(parts[2]);
                  if (day == null || month == null || year == null) {
                    return 'Invalid date format';
                  }
                  if (month < 1 || month > 12) {
                    return 'Invalid month';
                  }
                  if (day < 1 || day > 31) {
                    return 'Invalid day';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 40),
              CustomButton(text: 'Next', onPressed: widget.onNext),
              const SizedBox(height: 20),
              // "Login" link that navigates to LoginScreen
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Already have an account? ',
                    style: TextStyle(color: Colors.white),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const LoginScreen(),
                        ),
                      );
                    },
                    child: const Text(
                      'Login',
                      style: TextStyle(
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
