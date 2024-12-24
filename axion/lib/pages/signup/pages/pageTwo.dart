import 'package:axion/components/inputFields/login.dart';
import 'package:flutter/material.dart';

class SignupPageTwo extends StatelessWidget {
  const SignupPageTwo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              LoginTextFieald(label: "Telephone"),
              LoginTextFieald(label: "NIC"),
              Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: 320,
                      child: CalendarDatePicker(
                        initialDate: DateTime.now(),
                        firstDate: DateTime(2000, 1, 1),
                        lastDate: DateTime(2100, 12, 31),
                        onDateChanged: (DateTime newDate) {}, // Empty function
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}