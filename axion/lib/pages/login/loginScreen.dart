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
      resizeToAvoidBottomInset: true,
      
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                left: 0.0,
                top: 0.0,
                right: 0.0,
                bottom: 60.0,
              ),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 50.0
                      ),
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
                          fontWeight:FontWeight.bold,
                          color: Color.fromARGB(255, 255, 255, 255)
                      ),)
                  ),
              
                ],
              ),
            ),
            
            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 30.0
                  ),
                  child: LoginTextFieald(label: "NIC",),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 40.0
                  ),
                  child: LoginTextFieald(label: "Password",),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 40.0
                  ),
                  child: LoginButton(),
                ),
                SizedBox(
                  width: 100,
                  height: 100,
                  child: ElevatedButton(
                    onPressed: (){},
                    style: ButtonStyle(
                      backgroundColor: WidgetStatePropertyAll(Color.fromRGBO(21, 23, 28, 1)),
                      foregroundColor: WidgetStatePropertyAll(Color.fromRGBO(21, 23, 28, 1))
                    ), 
                    child: SvgPicture.asset(
                      "assets/img/biometricAuth.svg"
                    )),
                )
              ],
            )
          

          ],

        ),
      ),
    );
  }
}

