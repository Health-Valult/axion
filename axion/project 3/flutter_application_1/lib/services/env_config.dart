import 'package:flutter_dotenv/flutter_dotenv.dart';

/// A centralized configuration class that provides access to all environment variables
/// and configuration settings used throughout the application.
class EnvConfig {
  // API Configuration
  static String get apiBaseUrl =>
      dotenv.env['API_BASE_URL'] ?? 'https://axiontestgateway.azure-api.net';
  static String get graphqlUrl =>
      dotenv.env['GRAPHQL_URL'] ?? 'https://axiontestgateway.azure-api.net/records-patients';

  // Authentication Configuration
  static int get accessTokenDuration => int.parse(dotenv.env['ACCESS_TOKEN_DURATION'] ?? '3600');
  static int get refreshTokenDuration => int.parse(dotenv.env['REFRESH_TOKEN_DURATION'] ?? '604800');

  // API Endpoints
  static const auth = _AuthEndpoints();
  static const profile = _ProfileEndpoints();
  static const settings = _SettingsEndpoints();
  static const notifications = _NotificationEndpoints();
  static const logs = _LogEndpoints();
  static const links = _LinkEndpoints();
  static const medical = _MedicalEndpoints();
}

/// Authentication-related endpoints
class _AuthEndpoints {
  const _AuthEndpoints();

  String get signupUser => '/axion/auth/signup/patient';
  String get validateEmail => '/axion/auth/validate/email';
  String get validateOTP => '/axion/auth/validate/otp';
  String get sendOTP => '/axion/auth/send/otp';
  String get verifyOTP => '/axion/auth/verify/otp';
  String get loginUser => '/axion/auth/login/patient';
  String get refreshToken => '/axion/auth/refresh';
  String get logout => '/axion/auth/logout';
  String get resetPassword => '/user/reset-password';
  String get connectOTP => '/axion/otp/connect';
}

/// Profile-related endpoints
class _ProfileEndpoints {
  const _ProfileEndpoints();

  String get profile => '/axion/user/profile';
  String get update => '/axion/user/profile/update';
  String get changePassword => '/axion/user/reset-password';
  String get uploadPicture => '/axion/user/profile/picture';
  String get delete => '/axion/user/profile/delete';
}

/// Settings-related endpoints
class _SettingsEndpoints {
  const _SettingsEndpoints();

  String get get => '/axion/user/settings';
  String get update => '/axion/user/settings/update';
  String get notifications => '/axion/user/settings/notifications';
}

/// Notification-related endpoints
class _NotificationEndpoints {
  const _NotificationEndpoints();

  // Only the GET endpoint is needed now.
  String get get => '/notification/notifications';
}

/// Log-related endpoints
class _LogEndpoints {
  const _LogEndpoints();

  String get get => '/axion/logs';
  String get details => '/axion/logs/{id}';
}

/// Link-related endpoints
class _LinkEndpoints {
  const _LinkEndpoints();

  String get get => '/axion/links';
  String get validate => '/axion/links/validate';
}

/// Medical-related endpoints
class _MedicalEndpoints {
  const _MedicalEndpoints();

  // All medical endpoints use GraphQL
  String get endpoint => '/graphql';
}
