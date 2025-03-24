import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // <-- For inputFormatters
import 'package:google_fonts/google_fonts.dart';

class CustomTextField extends StatelessWidget {
  final String hintText;
  final TextEditingController? controller;
  final TextInputType keyboardType;
  final bool obscureText;
  final String? Function(String?)? validator;
  final void Function(String?)? onSaved;
  final bool enabled;
  final Widget? suffixIcon;
  final int? maxLines;
  final List<TextInputFormatter>? inputFormatters;

  const CustomTextField({
    Key? key,
    required this.hintText,
    this.controller,
    this.keyboardType = TextInputType.text,
    this.obscureText = false,
    this.validator,
    this.onSaved,
    this.enabled = true,
    this.suffixIcon,
    this.maxLines = 1,
    this.inputFormatters,
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
        keyboardType: keyboardType,
        obscureText: obscureText,
        validator: validator,
        onSaved: onSaved,
        enabled: enabled,
        maxLines: maxLines,
        cursorColor: focusedBorderColor,
        style: theme.textTheme.bodyLarge,
        inputFormatters: inputFormatters,
        decoration: InputDecoration(
          labelText: hintText,
          suffixIcon: suffixIcon,
          focusColor: focusedBorderColor,
          errorStyle: GoogleFonts.montserrat(
            textStyle: TextStyle(
              color: Colors.red.withOpacity(0.75),
            ),
          ),
          floatingLabelStyle: theme.textTheme.labelSmall,
          labelStyle: theme.textTheme.labelMedium,
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
        ),
      ),
    );
  }
}
