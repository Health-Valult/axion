import 'package:axion/pages/signup/pageOne.dart';
import 'package:axion/pages/signup/pageThree.dart';
import 'package:axion/pages/signup/pageTwo.dart';
import 'package:flutter/material.dart';

class SignupScreen extends StatelessWidget {
  const SignupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        children: [
          SignupPageTwo(),
          SignupPageOne(),
          SignupPageThree()
        ],
        ),
    );
  }
}