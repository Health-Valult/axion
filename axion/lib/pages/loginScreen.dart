import 'package:axion/components/buttons/login.dart';
import 'package:axion/components/inputFields/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 21, 23, 28),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                left: 0,
                top: 0,
                right: 0,
                bottom: 30.0
                ),
              child: SvgPicture.asset(
                "assets/img/Logo.svg",
                width: 100,
                height: 100,
                semanticsLabel: 'Red dash paths',
              ),
            ),
            Text(
              "Welcome Back",
              style: GoogleFonts.montserrat(
                textStyle: TextStyle(
                    fontSize: 40,
                    fontWeight:FontWeight.bold,
                    color: Color.fromARGB(255, 255, 255, 255)
                ),)
            ),
            Column(
              children: [
                LoginTextFieald(label: "NIC",),
                LoginTextFieald(label: "Password",),
                LoginButton()
              ],
            )
          

          ],

        ),
      ),
    );
  }
}

