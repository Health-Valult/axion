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

  Future<void> _markAsRead(String id) async {
    try {
      await _apiService.markNotificationRead(id);
      setState(() {
        final index = _notifications?.indexWhere((n) => n.id == id) ?? -1;
        if (index != -1) {
          _notifications![index] = AppNotification(
            id: _notifications![index].id,
            title: _notifications![index].title,
            description: _notifications![index].description,
            timestamp: _notifications![index].timestamp,
            type: _notifications![index].type,
            read: true,
            action: _notifications![index].action,
            data: _notifications![index].data,
          );
        }
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to mark notification as read: ${e.toString()}')),
        );
      }
    }
  }

  Future<void> _markAllAsRead() async {
    try {
      await _apiService.markAllNotificationsRead();
      setState(() {
        _notifications = _notifications?.map((notification) => AppNotification(
          id: notification.id,
          title: notification.title,
          description: notification.description,
          timestamp: notification.timestamp,
          type: notification.type,
          read: true,
          action: notification.action,
          data: notification.data,
        )).toList();
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to mark all notifications as read: ${e.toString()}')),
        );
      }
    }
  }

  Future<void> _deleteAllNotifications() async {
    final loc = AppLocalizations.of(context)!;
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(loc.deleteAllNotifications),
        content: Text(loc.deleteAllNotificationsConfirm),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(loc.cancel),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(loc.delete),
          ),
        ],
      ),
    );

    if (confirm == true) {
      try {
        await _apiService.deleteAllNotifications();
        setState(() {
          _notifications = [];
        });
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Failed to delete notifications: ${e.toString()}')),
          );
        }
      }
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
        actions: [
          if (_notifications?.isNotEmpty == true) ...[
            IconButton(
              icon: const Icon(Icons.done_all),
              onPressed: _markAllAsRead,
              tooltip: loc.markAllAsRead,
            ),
            IconButton(
              icon: const Icon(Icons.delete_sweep),
              onPressed: _deleteAllNotifications,
              tooltip: loc.deleteAllNotifications,
            ),
          ],
        ],
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
                  return Dismissible(
                    key: Key(notification.id),
                    direction: DismissDirection.endToStart,
                    background: Container(
                      color: Colors.red,
                      alignment: Alignment.centerRight,
                      padding: const EdgeInsets.only(right: 16),
                      child: const Icon(Icons.delete, color: Colors.white),
                    ),
                    onDismissed: (_) async {
                      try {
                        await _apiService.deleteNotification(notification.id);
                        setState(() {
                          _notifications!.removeAt(index);
                        });
                      } catch (e) {
                        if (mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Failed to delete notification: ${e.toString()}')),
                          );
                        }
                      }
                    },
                    child: ListTile(
                      title: Text(
                        notification.title,
                        style: TextStyle(
                          fontWeight: notification.read ? FontWeight.normal : FontWeight.bold,
                        ),
                      ),
                      subtitle: Text(notification.description),
                      trailing: notification.read
                          ? null
                          : IconButton(
                              icon: const Icon(Icons.done),
                              onPressed: () => _markAsRead(notification.id),
                              tooltip: loc.markAsRead,
                            ),
                      onTap: () {
                        if (!notification.read) {
                          _markAsRead(notification.id);
                        }
                        // Handle notification tap (e.g., navigate to relevant screen)
                        if (notification.action != null) {
                          // Handle action based on notification type
                        }
                      },
                    ),
                  );
                },
              ),
            ),
    );
  }
}
