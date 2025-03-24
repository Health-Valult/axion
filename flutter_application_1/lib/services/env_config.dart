import 'package:flutter_dotenv/flutter_dotenv.dart';


class EnvConfig {
  static String get apiBaseUrl =>
      dotenv.env['API_BASE_URL'] ?? 'https://axiontestgateway.azure-api.net';
  static String get graphqlUrl =>
      dotenv.env['GRAPHQL_URL'] ?? 'https://axiontestgateway.azure-api.net/records-patients';


  static int get accessTokenDuration => int.parse(dotenv.env['ACCESS_TOKEN_DURATION'] ?? '3600');
  static int get refreshTokenDuration => int.parse(dotenv.env['REFRESH_TOKEN_DURATION'] ?? '604800');


  static const auth = _AuthEndpoints();
  static const profile = _ProfileEndpoints();
  static const settings = _SettingsEndpoints();
  static const notifications = _NotificationEndpoints();
  static const logs = _LogEndpoints();
  static const links = _LinkEndpoints();
  static const medical = _MedicalEndpoints();
}


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
  String get resetPassword => '/axion/user/reset-password';
  String get connectOTP => '/records/records/verify-request';
}

class _ProfileEndpoints {
  const _ProfileEndpoints();

  String get profile => '/axion/user/profile';
  String get update => '/axion/user/profile/update';
  String get changePassword => '/axion/user/reset-password';
  String get uploadPicture => '/axion/user/profile/picture';
  String get delete => '/axion/user/profile/delete';
}

class _SettingsEndpoints {
  const _SettingsEndpoints();

  String get get => '/axion/user/settings';
  String get update => '/axion/user/settings/update';
  String get notifications => '/axion/user/settings/notifications';
}

class _NotificationEndpoints {
  const _NotificationEndpoints();


  String get get => '/notification/notifications';
}

class _LogEndpoints {
  const _LogEndpoints();

  String get get => '/axion/logs';
  String get details => '/axion/logs/{id}';
}

class _LinkEndpoints {
  const _LinkEndpoints();

  String get get => '/axion/links';
  String get validate => '/axion/links/validate';
}

class _MedicalEndpoints {
  const _MedicalEndpoints();

  String get endpoint => '/graphql';
}
