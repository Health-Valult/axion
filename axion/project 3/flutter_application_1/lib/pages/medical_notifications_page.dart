import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/services/api_service.dart';

class MedicalNotificationsPage extends StatefulWidget {
  const MedicalNotificationsPage({super.key});

  static List<Map<String, String>> reminders = [];

  static List<Map<String, String>> getReminders(List<Map<String, dynamic>> notifications) {
    reminders = notifications.map((notification) => {
      'time': notification['time']?.toString() ?? 'N/A',
      'title': notification['title']?.toString() ?? 'Untitled'
    }).toList();
    return reminders;
  }

  @override
  State<MedicalNotificationsPage> createState() => _MedicalNotificationsPageState();
}

class _MedicalNotificationsPageState extends State<MedicalNotificationsPage> {
  final ApiService _apiService = ApiService();
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadNotifications();
  }

  Future<void> _loadNotifications() async {
    try {
      final notifications = await _apiService.getMedicalNotifications();
      setState(() {
        _isLoading = false;
        // Update static reminders
        MedicalNotificationsPage.getReminders(notifications);
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load notifications: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: Text(loc.medicalNotifications),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.medicalNotifications),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: MedicalNotificationsPage.reminders.isEmpty
            ? Center(
                child: Text(
                  loc.noReports,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 16),
                ),
              )
            : ListView.builder(
                itemCount: MedicalNotificationsPage.reminders.length,
                itemBuilder: (context, index) {
                  final notification = MedicalNotificationsPage.reminders[index];
                  final time = notification['time'] ?? 'N/A';
                  final title = notification['title'] ?? 'Untitled';

                  return Card(
                    margin: const EdgeInsets.only(bottom: 16),
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
                    ),
                  );
                },
              ),
      ),
    );
  }
}

class AddNotificationDialog extends StatefulWidget {
  const AddNotificationDialog({super.key});

  @override
  State<AddNotificationDialog> createState() => _AddNotificationDialogState();
}

class _AddNotificationDialogState extends State<AddNotificationDialog> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  TimeOfDay _selectedTime = TimeOfDay.now();

  @override
  void dispose() {
    _titleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return AlertDialog(
      title: Text(loc.addMedication),
      content: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              controller: _titleController,
              decoration: InputDecoration(labelText: loc.medicationName),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return loc.medicationNameRequired;
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            ListTile(
              title: Text(loc.time),
              subtitle: Text(_selectedTime.format(context)),
              trailing: const Icon(Icons.access_time),
              onTap: () async {
                final TimeOfDay? time = await showTimePicker(
                  context: context,
                  initialTime: _selectedTime,
                );
                if (time != null) {
                  setState(() {
                    _selectedTime = time;
                  });
                }
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text(loc.cancel),
        ),
        TextButton(
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              Navigator.pop(context, {
                'title': _titleController.text,
                'time': _selectedTime.format(context),
              });
            }
          },
          child: Text(loc.add),
        ),
      ],
    );
  }
}

class EditNotificationDialog extends StatefulWidget {
  final Map<String, dynamic> notification;

  const EditNotificationDialog({
    super.key,
    required this.notification,
  });

  @override
  State<EditNotificationDialog> createState() => _EditNotificationDialogState();
}

class _EditNotificationDialogState extends State<EditNotificationDialog> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _titleController;
  late TimeOfDay _selectedTime;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.notification['title']);
    
    // Parse the time string to TimeOfDay
    final timeStr = widget.notification['time'];
    final timeParts = timeStr.split(':');
    if (timeParts.length == 2) {
      final hour = int.tryParse(timeParts[0]) ?? TimeOfDay.now().hour;
      final minute = int.tryParse(timeParts[1].split(' ')[0]) ?? TimeOfDay.now().minute;
      _selectedTime = TimeOfDay(hour: hour, minute: minute);
    } else {
      _selectedTime = TimeOfDay.now();
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return AlertDialog(
      title: Text(loc.editMedication),
      content: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              controller: _titleController,
              decoration: InputDecoration(labelText: loc.medicationName),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return loc.medicationNameRequired;
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            ListTile(
              title: Text(loc.time),
              subtitle: Text(_selectedTime.format(context)),
              trailing: const Icon(Icons.access_time),
              onTap: () async {
                final TimeOfDay? time = await showTimePicker(
                  context: context,
                  initialTime: _selectedTime,
                );
                if (time != null) {
                  setState(() {
                    _selectedTime = time;
                  });
                }
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text(loc.cancel),
        ),
        TextButton(
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              Navigator.pop(context, {
                'title': _titleController.text,
                'time': _selectedTime.format(context),
              });
            }
          },
          child: Text(loc.save),
        ),
      ],
    );
  }
}