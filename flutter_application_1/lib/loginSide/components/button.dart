import 'package:flutter/material.dart';

import 'package:google_fonts/google_fonts.dart';

class LoginButton extends StatelessWidget {

  final void Function(BuildContext) onPressed;

  const LoginButton({
    super.key,
    required this.onPressed
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ClipRRect(
        borderRadius: BorderRadius.circular(15),
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

          SizedBox(
            width: 350,
            height: 60,
            child: TextButton(
                onPressed: ()=>onPressed(context),
                child: Text(
                  "Login",
                  style: GoogleFonts.montserrat(
                  textStyle: TextStyle(
                  color: Color.fromARGB(255, 255, 255, 255),
                  fontSize: 20,
                  fontWeight: FontWeight.w500
                  )
                ))
            ),
          )
          ]
        ),
      ),
    );
  }
}