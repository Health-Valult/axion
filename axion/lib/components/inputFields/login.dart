import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginTextFieald extends StatelessWidget {
  final String label;
  const LoginTextFieald({
    super.key, 
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 350,
      height: 60,
      child: TextField(
        cursorColor: Color.fromRGBO(255, 255, 255, 1),
        style: TextStyle(
          color: Color.fromRGBO(255, 255, 255, 1)
        ),
        decoration: InputDecoration(
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: Color.fromRGBO(255, 255, 255, 0.5),
              width: 2.0)
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: Color.fromRGBO(255, 255, 255, 1),
              width: 2.0)
          ),
          focusColor: Color.fromRGBO(255, 255, 255, 1),
          labelText: label,
          floatingLabelStyle: GoogleFonts.montserrat(
            textStyle: TextStyle(
              color: Color.fromRGBO(255, 255, 255, 1),
            )),
          labelStyle: GoogleFonts.montserrat(
            textStyle: TextStyle(
              fontSize: 20
            )
          
          )
        ),
      ),
    );
  }
}