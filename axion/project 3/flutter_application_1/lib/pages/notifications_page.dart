import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';

/// ==========================
/// NotificationService
/// ==========================
///
/// This class simulates backend endpoints for notifications.
class NotificationService {
  static const String baseUrl = 'https://api.example.com';

  // Simulated HTTP client.
  static final http.Client client = MockClient((http.Request request) async {
    final String url = request.url.toString();
    // Simulate a short network delay.
    await Future.delayed(const Duration(milliseconds: 100));

    // Simulate GET /notifications.
    if (request.method == 'GET' && url == '$baseUrl/notifications') {
      return http.Response(
        json.encode([
          {
            "title": "Medication Reminder",
            "description": "Don't forget to take your medication at 8 AM.",
            "read": false
          },
          {
            "title": "Appointment",
            "description": "You have an appointment scheduled for tomorrow at 3 PM.",
            "read": false
          }
        ]),
        200,
      );
    }
    // Simulate POST /delete-all-notifications.
    else if (request.method == 'POST' && url == '$baseUrl/delete-all-notifications') {
      return http.Response(json.encode({"success": true}), 200);
    }
    return http.Response('Not Found', 404);
  });

  /// Fetch the list of notifications.
  static Future<List<Map<String, dynamic>>> getNotifications() async {
    final response = await client.get(Uri.parse('$baseUrl/notifications'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((n) => Map<String, dynamic>.from(n)).toList();
    }
    throw Exception("Failed to load notifications");
  }

  /// Delete all notifications.
  static Future<bool> deleteAllNotifications() async {
    final response = await client.post(
      Uri.parse('$baseUrl/delete-all-notifications'),
      headers: {"Content-Type": "application/json"},
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data["success"] == true;
    }
    return false;
  }
}

/// ==========================
/// NotificationsPage
/// ==========================

class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  List<Map<String, dynamic>>? _notifications;

  @override
  void initState() {
    super.initState();
    _loadNotifications();
  }

  /// Load notifications from the simulated endpoint.
  Future<void> _loadNotifications() async {
    try {
      final notifications = await NotificationService.getNotifications();
      setState(() {
        _notifications = notifications;
      });
    } catch (e) {
      debugPrint("Error loading notifications: $e");
      setState(() {
        _notifications = [];
      });
    }
  }

  /// Mark a single notification as read.
  void _markAsRead(int index) {
    setState(() {
      _notifications![index]['read'] = true;
    });
  }

  /// Mark all notifications as read.
  void _markAllAsRead() {
    setState(() {
      for (int i = 0; i < _notifications!.length; i++) {
        _notifications![i]['read'] = true;
      }
    });
  }

  /// Delete all notifications via the simulated endpoint.
  Future<void> _deleteAllNotifications() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Confirm Deletion"),
        content: const Text("Are you sure you want to delete all notifications?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text("Cancel"),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text("Delete"),
          ),
        ],
      ),
    );
    if (confirm == true) {
      final success = await NotificationService.deleteAllNotifications();
      if (success) {
        await _loadNotifications();
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text("Deletion Successful"),
            content: const Text("All notifications have been deleted."),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text("OK"),
              ),
            ],
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Failed to delete notifications")),
        );
      }
    }
  }

  /// Compute the count of unread notifications.
  int _unreadCount() {
    if (_notifications == null) return 0;
    return _notifications!.where((n) => n['read'] != true).length;
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final theme = Theme.of(context);

    // Using Flutter 3's text theme keys.
    final unreadTitleStyle = theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)
        ?? const TextStyle(fontWeight: FontWeight.bold);
    final readTitleStyle = theme.textTheme.titleMedium;
    final unreadSubtitleStyle = theme.textTheme.bodyMedium?.copyWith(
          color: theme.brightness == Brightness.dark ? Colors.white70 : Colors.black87,
        ) ?? const TextStyle();
    final readSubtitleStyle = theme.textTheme.bodyMedium;

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.notifications),
        actions: [
          // Mark all as read.
          IconButton(
            icon: const Icon(Icons.mark_email_read),
            onPressed: _markAllAsRead,
            tooltip: "Mark all as read",
          ),
          // Delete all notifications.
          IconButton(
            icon: const Icon(Icons.delete_forever),
            onPressed: _deleteAllNotifications,
            tooltip: "Delete all notifications",
          ),
          // Unread notifications badge.
          if (_unreadCount() > 0)
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: CircleAvatar(
                radius: 10,
                backgroundColor: Colors.red,
                child: Text(
                  _unreadCount().toString(),
                  style: const TextStyle(fontSize: 12, color: Colors.white),
                ),
              ),
            ),
        ],
      ),
      body: _notifications == null
          ? const Center(child: CircularProgressIndicator())
          : _notifications!.isEmpty
              ? Center(child: Text(loc.noNewNotifications, textAlign: TextAlign.center))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _notifications!.length,
                  itemBuilder: (context, index) {
                    final notification = _notifications![index];
                    final title = notification['title'] ?? 'No Title';
                    final description = notification['description'] ?? 'No Description';
                    final bool isRead = notification['read'] == true;
                    return Card(
                      margin: const EdgeInsets.only(bottom: 16),
                      child: ListTile(
                        onTap: () {
                          if (!isRead) _markAsRead(index);
                        },
                        title: Text(
                          title,
                          style: isRead ? readTitleStyle : unreadTitleStyle,
                        ),
                        subtitle: Text(
                          description,
                          style: isRead ? readSubtitleStyle : unreadSubtitleStyle,
                        ),
                        trailing: SizedBox(
                          width: 24,
                          height: 24,
                          child: Icon(
                            isRead ? Icons.mark_email_read : Icons.mark_email_unread,
                            color: isRead ? Colors.green : Colors.red,
                          ),
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
