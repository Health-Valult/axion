import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginTextFieald extends StatelessWidget {
  final String label;
  final String? Function(String?) validator;
  final TextEditingController? controller;
  final bool isPassword;
  final Widget? suffixIcon; // New parameter for suffix icon

  const LoginTextFieald({
    Key? key, 
    required this.label,
    required this.validator,
    this.controller,
    this.isPassword = false,
    this.suffixIcon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    // Determine border colors based on brightness.
    final enabledBorderColor = theme.brightness == Brightness.dark 
        ? Colors.white.withOpacity(0.5) 
        : Colors.black.withOpacity(0.5);
    final focusedBorderColor = theme.brightness == Brightness.dark 
        ? Colors.white 
        : Colors.black;
    final errorBorderColor = Colors.red.withOpacity(0.5);
    final focusedErrorBorderColor = Colors.redAccent.withOpacity(0.5);

    return SizedBox(
      width: 350,
      height: 80,
      child: TextFormField(
        controller: controller,
        validator: validator,
        obscureText: isPassword,
        cursorColor: focusedBorderColor,
        style: theme.textTheme.bodyLarge,
        decoration: InputDecoration(
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: enabledBorderColor,
              width: 2.0,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: focusedBorderColor,
              width: 2.0,
            ),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: errorBorderColor,
              width: 2.0,
            ),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: focusedErrorBorderColor,
              width: 2.0,
            ),
          ),
          labelText: label,
          labelStyle: theme.textTheme.labelMedium,
          floatingLabelStyle: theme.textTheme.labelSmall,
          errorStyle: GoogleFonts.montserrat(
            textStyle: TextStyle(
              color: Colors.red.withOpacity(0.75),
            ),
          ),
          focusColor: focusedBorderColor,
          suffixIcon: suffixIcon, // Insert the suffix icon here
        ),
      ),
    );
  }
}
