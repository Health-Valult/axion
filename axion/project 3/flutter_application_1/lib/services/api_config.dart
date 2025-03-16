import 'package:flutter_application_1/services/env_config.dart';

/// Deprecated: Use EnvConfig instead.
/// This class is kept for backward compatibility and will be removed in a future version.
@Deprecated('Use EnvConfig instead')
class ApiConfig {
  static String get baseUrl => EnvConfig.apiBaseUrl;
  static String get graphqlUrl => EnvConfig.graphqlUrl;
  
  // Auth endpoints
  static String get signupUser => EnvConfig.auth.signupUser;
  static String get validateEmail => EnvConfig.auth.validateEmail;
  static String get validateOTP => EnvConfig.auth.validateOTP;
  static String get sendOTP => EnvConfig.auth.sendOTP;
  static String get verifyOTP => EnvConfig.auth.verifyOTP;
  static String get loginUser => EnvConfig.auth.loginUser;
  static String get refreshToken => EnvConfig.auth.refreshToken;
  static String get logout => EnvConfig.auth.logout;
  static String get resetPassword => EnvConfig.auth.resetPassword;
  static String get userProfile => EnvConfig.profile.profile;
  static String get deleteUser => EnvConfig.auth.deleteUser;
  
  // Profile endpoints
  static String get updateProfile => EnvConfig.profile.update;
  static String get changePassword => EnvConfig.profile.changePassword;
  static String get uploadProfilePicture => EnvConfig.profile.uploadPicture;
  
  // Settings endpoints
  static String get getSettings => EnvConfig.settings.get;
  static String get updateSettings => EnvConfig.settings.update;
  static String get updateNotificationPreferences => EnvConfig.settings.notifications;
  
  // Notifications endpoints
  static String get getNotifications => EnvConfig.notifications.get;
  static String get markNotificationRead => EnvConfig.notifications.markRead;
  static String get markAllNotificationsRead => EnvConfig.notifications.markAllRead;
  static String get deleteAllNotifications => EnvConfig.notifications.deleteAll;
  static String get deleteNotification => EnvConfig.notifications.delete;
  static String get getMedicalNotifications => EnvConfig.notifications.medical;
  static String get getNotificationPreferences => EnvConfig.notifications.preferences;
  
  // Log endpoints
  static String get getLogs => EnvConfig.logs.get;
  static String get getLogDetails => EnvConfig.logs.details;
  
  // Link endpoints
  static String get getLinks => EnvConfig.links.get;
  static String get validateLink => EnvConfig.links.validate;
  
  // Medical Records endpoints (GraphQL)

  
  // Medical Notifications endpoints
  static String get addMedicalNotification => EnvConfig.notifications.medical;
  static String get updateMedicalNotification => EnvConfig.notifications.medical;
  static String get deleteMedicalNotification => EnvConfig.notifications.medical;
}
