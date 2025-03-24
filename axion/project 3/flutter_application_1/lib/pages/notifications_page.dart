import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/models/notification.dart';
import 'package:flutter_application_1/services/api_service.dart';

class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  final _apiService = ApiService();
  List<AppNotification>? _notifications;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadNotifications();
  }

  Future<void> _loadNotifications() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });
      final notifications = await _apiService.getNotifications();
      setState(() {
        _notifications = notifications;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text(loc.notifications)),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(title: Text(loc.notifications)),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(_error!, style: const TextStyle(color: Colors.red)),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _loadNotifications,
                child: Text(loc.retry),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.notifications),
      ),
      body: _notifications?.isEmpty == true
          ? Center(
              child: Text(
                loc.noNotifications,
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            )
          : RefreshIndicator(
              onRefresh: _loadNotifications,
              child: ListView.builder(
                itemCount: _notifications?.length ?? 0,
                itemBuilder: (context, index) {
                  final notification = _notifications![index];
                  return ListTile(
                    title: Text(
                      notification.title, 
                      style: TextStyle(
                        fontWeight: notification.read ? FontWeight.normal : FontWeight.bold,
                      ),
                    ),
                    subtitle: Text(notification.type),
                    onTap: () {
                    },
                  );
                },
              ),
            ),
    );
  }
}
