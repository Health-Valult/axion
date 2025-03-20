import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter/material.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  static final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  static bool _authRequired = false;
  static List<Map<String, dynamic>> _notifications = [];

  // Initialize notification services
  static Future<void> initialize() async {
    // Initialize Firebase
    await Firebase.initializeApp();
    
    // Request notification permissions
    await _firebaseMessaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    // Initialize local notifications
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const initSettings = InitializationSettings(android: androidSettings);
    await _localNotifications.initialize(initSettings);

    // Configure notification channels for Android
    const androidChannel = AndroidNotificationChannel(
      'medical_notifications',
      'Medical Notifications',
      description: 'Notifications for medical reminders and updates',
      importance: Importance.high,
      enableVibration: true,
      enableLights: true,
      ledColor: Color(0xFFFF9800), // Orange color as per memory requirements
    );

    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(androidChannel);

    // Handle background messages
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      _handleForegroundMessage(message);
    });

    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      _handleNotificationTap(message);
    });
  }

  // Background message handler
  static Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
    await Firebase.initializeApp();
    _showLocalNotification(
      title: message.notification?.title ?? 'Medical Reminder',
      body: message.notification?.body ?? '',
      payload: message.data.toString(),
    );
    addNotification({
      'title': message.notification?.title,
      'body': message.notification?.body,
      'timestamp': DateTime.now().toIso8601String(),
      'read': false,
      'data': message.data,
    });
  }

  // Handle foreground messages
  static void _handleForegroundMessage(RemoteMessage message) {
    _showLocalNotification(
      title: message.notification?.title ?? 'Medical Reminder',
      body: message.notification?.body ?? '',
      payload: message.data.toString(),
    );
    addNotification({
      'title': message.notification?.title,
      'body': message.notification?.body,
      'timestamp': DateTime.now().toIso8601String(),
      'read': false,
      'data': message.data,
    });
  }

  // Handle notification taps
  static void _handleNotificationTap(RemoteMessage message) {
    // Navigate to notifications page or handle specific actions
    // This will be handled by the app's navigation system
  }

  // Show local notification
  static Future<void> _showLocalNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const androidDetails = AndroidNotificationDetails(
      'medical_notifications',
      'Medical Notifications',
      channelDescription: 'Notifications for medical reminders and updates',
      importance: Importance.high,
      priority: Priority.high,
      color: Color(0xFFFF9800), // Orange color as per memory requirements
      icon: '@mipmap/ic_launcher',
    );

    const notificationDetails = NotificationDetails(android: androidDetails);

    await _localNotifications.show(
      DateTime.now().millisecond,
      title,
      body,
      notificationDetails,
      payload: payload,
    );
  }

  // Get FCM token
  static Future<String?> getFCMToken() async {
    return await _firebaseMessaging.getToken();
  }

  // Trigger authentication notification
  static void triggerAuthNotification() {
    _authRequired = true;
    _showLocalNotification(
      title: 'Authentication Required',
      body: 'Please authenticate to continue using the app',
    );
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
