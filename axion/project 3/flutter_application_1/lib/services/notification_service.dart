class NotificationService {
  static bool _authRequired = false;
  static List<Map<String, dynamic>> _notifications = [];

  // Trigger authentication notification
  static void triggerAuthNotification() {
    _authRequired = true;
  }

  // Check if authentication is required
  static Future<bool> checkAuthNotification() async {
    return _authRequired;
  }

  // Reset authentication notification
  static void resetAuthNotification() {
    _authRequired = false;
  }

  // Add a new notification
  static void addNotification(Map<String, dynamic> notification) {
    _notifications.add(notification);
  }

  // Get all notifications
  static List<Map<String, dynamic>> getNotifications() {
    return _notifications;
  }

  // Mark notification as read
  static void markAsRead(int index) {
    if (index >= 0 && index < _notifications.length) {
      _notifications[index]['read'] = true;
    }
  }

  // Clear all notifications
  static void clearNotifications() {
    _notifications.clear();
  }
}
