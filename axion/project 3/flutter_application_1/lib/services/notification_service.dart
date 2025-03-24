import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter/material.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  static final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  static bool _authRequired = false;
  static List<Map<String, dynamic>> _notifications = [];

  static Future<void> initialize() async {
    await Firebase.initializeApp();
    
    await _firebaseMessaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );


    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const initSettings = InitializationSettings(android: androidSettings);
    await _localNotifications.initialize(initSettings);


    const androidChannel = AndroidNotificationChannel(
      'medical_notifications',
      'Medical Notifications',
      description: 'Notifications for medical reminders and updates',
      importance: Importance.high,
      enableVibration: true,
      enableLights: true,
      ledColor: Color(0xFFFF9800),
    );

    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(androidChannel);

    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      _handleForegroundMessage(message);
    });

    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      _handleNotificationTap(message);
    });
  }

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

  static void _handleNotificationTap(RemoteMessage message) {
  }

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
      color: Color(0xFFFF9800),
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

  static Future<String?> getFCMToken() async {
    return await _firebaseMessaging.getToken();
  }


  static void triggerAuthNotification() {
    _authRequired = true;
    _showLocalNotification(
      title: 'Authentication Required',
      body: 'Please authenticate to continue using the app',
    );
  }

  static Future<bool> checkAuthNotification() async {
    return _authRequired;
  }


  static void resetAuthNotification() {
    _authRequired = false;
  }


  static void addNotification(Map<String, dynamic> notification) {
    _notifications.add(notification);
  }


  static List<Map<String, dynamic>> getNotifications() {
    return _notifications;
  }


  static void markAsRead(int index) {
    if (index >= 0 && index < _notifications.length) {
      _notifications[index]['read'] = true;
    }
  }


  static void clearNotifications() {
    _notifications.clear();
  }
}
