import 'package:axion/pages/signup/pages/pageOne.dart';
import 'package:axion/pages/signup/pages/pageThree.dart';
import 'package:axion/pages/signup/pages/pageTwo.dart';
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