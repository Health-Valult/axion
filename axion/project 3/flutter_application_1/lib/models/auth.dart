class SignUpRequest {
  final String email;
  final String password;
  final String firstName;
  final String lastName;
  final String? phoneNumber;
  final String? dateOfBirth;
  final Map<String, dynamic>? additionalInfo;

  SignUpRequest({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
    this.phoneNumber,
    this.dateOfBirth,
    this.additionalInfo,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      if (phoneNumber != null) 'phoneNumber': phoneNumber,
      if (dateOfBirth != null) 'dateOfBirth': dateOfBirth,
      if (additionalInfo != null) ...additionalInfo!,
    };
  }
}

class AuthResponse {
  final bool success;
  final String? token;
  final String? refreshToken;
  final String? userId;
  final String? error;
  final Map<String, dynamic>? userData;

  AuthResponse({
    required this.success,
    this.token,
    this.refreshToken,
    this.userId,
    this.error,
    this.userData,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      success: json['success'] as bool,
      token: json['token'] as String?,
      refreshToken: json['refreshToken'] as String?,
      userId: json['userId'] as String?,
      error: json['error'] as String?,
      userData: json['userData'] as Map<String, dynamic>?,
    );
  }

  factory AuthResponse.error(String message) {
    return AuthResponse(
      success: false,
      error: message,
    );
  }
}
