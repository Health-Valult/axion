import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class SplashScreen extends StatelessWidget{
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return(
      Scaffold(
        backgroundColor: Color.fromARGB(255, 21, 23, 28),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,

            children: [
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 0,top: 0,right: 0,bottom: 30.0),
                    child: SvgPicture.asset(
                      "assets/Logo.svg",
                      width: 150,
                      height: 150,
                      semanticsLabel: 'Red dash paths',
                    ),
                  ),
                  Text("AXION",
                      style: GoogleFonts.montserrat(
                        textStyle: TextStyle(
                            fontSize: 48,
                            fontWeight:FontWeight.bold,
                            letterSpacing: 25,
                            color: Color.fromARGB(255, 255, 255, 255)
                        ),)
                  ),
                ],
              ),
              LoginButton()
            ],
          ),
        )
      )
    );
  }

}

class LoginButton extends StatelessWidget {
  const LoginButton({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ClipRRect(
        child: Stack(
          children: [Positioned.fill(
            child: Container(
              decoration: BoxDecoration(

                  gradient: LinearGradient(colors: [
                    Color.fromRGBO(60, 169, 214, 1.0),
                    Color.fromRGBO(62, 107, 216, 1.0)
                  ],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter
                  )
              ),

              ),
            ),

          TextButton(
              onPressed: (){},
              child: Text(
                "Login",
                style: GoogleFonts.montserrat(
                textStyle: TextStyle(
                color: Color.fromARGB(255, 255, 255, 255),
                fontSize: 20,
                fontWeight: FontWeight.w500
                )
    ))
          )
          ]
        ),
      ),
    );
  }
}