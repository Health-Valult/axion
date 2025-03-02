import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomTextField extends StatelessWidget {
  final String hintText;
  final TextEditingController? controller;
  final TextInputType keyboardType;
  final bool isPassword;
  final String? Function(String?)? validator;

  const CustomTextField({
    Key? key,
    required this.hintText,
    this.controller,
    this.keyboardType = TextInputType.text,
    this.isPassword = false,
    this.validator,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 350,
      height: 80,
      child: TextFormField(
        controller: controller,
        keyboardType: keyboardType,
        obscureText: isPassword,
        validator: validator,
        cursorColor: const Color.fromRGBO(255, 255, 255, 1),
        style: const TextStyle(
          color: Color.fromRGBO(255, 255, 255, 1),
        ),
        decoration: InputDecoration(
          labelText: hintText,
          focusColor: const Color.fromRGBO(255, 255, 255, 1),
          errorStyle: GoogleFonts.montserrat(
            textStyle: const TextStyle(
              color: Color.fromRGBO(255, 0, 0, 0.75),
            ),
          ),
          floatingLabelStyle: Theme.of(context).textTheme.labelSmall,
          labelStyle: Theme.of(context).textTheme.labelMedium,
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(
              color: Color.fromRGBO(255, 255, 255, 0.5),
              width: 2.0,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(
              color: Color.fromRGBO(255, 255, 255, 1),
              width: 2.0,
            ),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(
              color: Color.fromRGBO(255, 0, 0, 0.5),
              width: 2.0,
            ),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(
              color: Color.fromRGBO(255, 72, 72, 0.5),
              width: 2.0,
            ),
          ),
        ),
      ),
    );
  }
}
