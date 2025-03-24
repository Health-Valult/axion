import 'package:axion/components/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

class SplashScreen extends StatelessWidget{
  const SplashScreen({super.key});

  @override
   Widget build(BuildContext context) {
    return(
      Scaffold(
       
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,

            children: [
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 30.0
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

              
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 30.0
                      ),
                    child: LoginButton(
                      onPressed: (context)=>context.push("/login"),
                    ),
                  ),
                  
                  SizedBox(
                    width: 350,
                    height: 60,
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12.0),
                        )
                      ),
                      onPressed: ()=>context.push('/signup'),
                      child: Text(
                        "Signup",
                        style: GoogleFonts.montserrat(
                        textStyle: TextStyle(
                        color: Color.fromRGBO(255, 255, 255, 0.5),
                        fontSize: 20,
                        fontWeight: FontWeight.w500
                        )
                                    ))),
                  ),
                ],
              )
            ],
          ),
        )
      )
    );
  }

}

