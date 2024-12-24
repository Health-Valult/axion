import 'package:axion/components/inputFields/login.dart';
import 'package:flutter/material.dart';

class SignupPageOne extends StatelessWidget {
  const SignupPageOne({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Center(
          child: Column(
            children: [
              LoginTextFieald(label: "First Name"),
              LoginTextFieald(label: "Last Name"),
              LoginTextFieald(label: "Email"),
            ],
          ),
        ),
      ),
    );
  }
}