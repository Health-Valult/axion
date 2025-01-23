import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginTextFieald extends StatelessWidget {
  final String label;
  final dynamic validator;
  const LoginTextFieald({
    super.key, 
    required this.label,
    required this.validator
  });

  @override
  Widget build(BuildContext context) {
    
    return SizedBox(
      width: 350,
      height: 80,
      child: TextFormField(
        validator: validator,
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


          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: Color.fromRGBO(255, 0, 0, 0.5),
              width: 2.0)
          ),


          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: Color.fromRGBO(255, 72, 72, 0.5),
              width: 2.0)
          ),
          

          focusColor: Color.fromRGBO(255, 255, 255, 1),
          labelText: label,
          errorStyle: GoogleFonts.montserrat(
            textStyle: TextStyle(
              color: Color.fromRGBO(255, 0, 0, 0.75),
            )),
          
          floatingLabelStyle: Theme.of(context).textTheme.labelSmall,
          labelStyle: Theme.of(context).textTheme.labelMedium
        ),
      ),
    );
  }
}