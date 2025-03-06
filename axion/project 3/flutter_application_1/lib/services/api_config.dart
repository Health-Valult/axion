class ApiConfig {
  static const String baseUrl = 'https://api.example.com'; // Replace with your actual base URL
  
  // Auth endpoints
  static const String signupUser = '/axion/auth/signup/user';
  static const String validateEmail = '/axion/auth/validate/email';
  static const String validateOTP = '/axion/auth/validate/otp';
  static const String sendOTP = '/axion/auth/send/otp';
  static const String loginUser = '/axion/auth/login/user';
  static const String loginDoctor = '/axion/auth/login/doc';
  static const String loginStaff = '/axion/auth/login/stf';
  static const String refreshToken = '/axion/auth/refresh';
  static const String logout = '/axion/auth/logout';
  static const String resetPassword = '/axion/auth/reset-password';
  static const String userProfile = '/axion/user/profile';
  static const String deleteAccount = '/axion/user/profile/delete';
  
  // Profile endpoints
  static const String updateProfile = '/axion/user/profile/update';
  static const String changePassword = '/axion/user/profile/change-password';
  static const String uploadProfilePicture = '/axion/user/profile/picture';
  
  // Settings endpoints
  static const String getSettings = '/axion/user/settings';
  static const String updateSettings = '/axion/user/settings/update';
  static const String updateNotificationPreferences = '/axion/user/settings/notifications';
  static const String updatePrivacySettings = '/axion/user/settings/privacy';
  
  // Notifications endpoints
  static const String getNotifications = '/axion/notifications';
  static const String markNotificationRead = '/axion/notifications/{id}/read';
  static const String markAllNotificationsRead = '/axion/notifications/read-all';
  static const String deleteAllNotifications = '/axion/notifications/delete-all';
  static const String deleteNotification = '/axion/notifications/{id}';
  static const String getMedicalNotifications = '/axion/notifications/medical';
  static const String getNotificationPreferences = '/axion/notifications/preferences';
  
  // Log endpoints
  static const String getLogs = '/axion/logs';
  static const String getLogDetails = '/axion/logs/{id}';
  static const String createLog = '/axion/logs';
  static const String updateLog = '/axion/logs/{id}';
  static const String deleteLog = '/axion/logs/{id}';
  
  // Link endpoints
  static const String getLinks = '/axion/links';
  static const String createLink = '/axion/links';
  static const String updateLink = '/axion/links/{id}';
  static const String deleteLink = '/axion/links/{id}';
  static const String validateLink = '/axion/links/validate';
  
  // Medical Records endpoints (GraphQL)
  static const String getMedicalRecords = '/axion/medical-records';
  static const String getMedications = '/graphql';
  static const String getAllergies = '/graphql';
  static const String getReports = '/graphql';
  static const String getReportDetails = '/graphql';
  
  // Medical Notifications endpoints
  static const String addMedicalNotification = '/axion/notifications/medical';
  static const String updateMedicalNotification = '/axion/notifications/medical/{id}';
  static const String deleteMedicalNotification = '/axion/notifications/medical/{id}';
}
