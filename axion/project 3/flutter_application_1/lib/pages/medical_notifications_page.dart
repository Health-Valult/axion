import 'package:flutter/material.dart';

class MedicalNotificationsPage extends StatelessWidget {
  const MedicalNotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Medical Notifications'),
        backgroundColor: Colors.black,
      ),
      body: const Center(
        child: Text(
          'Here you can add upcoming medication reminders.\n(Placeholder)',
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
