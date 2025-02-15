import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class MedicalNotificationsPage extends StatelessWidget {
  /// Declare a static list of reminders:
  static final List<Map<String, dynamic>> reminders = [
    {
      'time': '07:00 AM',
      'title': 'Amlodipine 5 mg',

    },
    {
      'time': '09:00 AM',
      'title': 'Metformin 500 mg',

    },
    {
      'time': '12:00 PM',
      'title': 'Ibuprofen 200 mg',

    },
  ];

  const MedicalNotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.medicalNotifications), // 🔹 Translated title
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: reminders.isEmpty
            ? Center(
                child: Text(
                  loc.noReports, // 🔹 Translated "No upcoming medication alerts."
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 16),
                ),
              )
            : ListView.builder(
                itemCount: reminders.length,
                itemBuilder: (context, index) {
                  final reminder = reminders[index];
                  final time = reminder['time'] ?? 'N/A';
                  final title = reminder['title'] ?? 'Untitled' ?? '';

                  return Card(
                    margin: const EdgeInsets.only(bottom: 016),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 2,
                    child: ListTile(
                      contentPadding: const EdgeInsets.all(16),
                      leading: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(Icons.schedule, color: Colors.cyan),
                        ],
                      ),
                      title: Text(
                        '$time - $title',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      
                      onTap: () {
                        // Placeholder for tapping a reminder
                      },
                    ),
                  );
                },
              ),
      ),
    );
  }
}
