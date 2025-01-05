
import 'package:flutter/material.dart';
import 'pages/signup_pageview.dart'; // Updated to point to the PageView file

void main() {
  runApp(const SignupApp());
}

class SignupApp extends StatelessWidget {
  const SignupApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: const SignupPageView(), // Updated entry point
    );
  }
}
