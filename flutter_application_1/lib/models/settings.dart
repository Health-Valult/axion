class Settings {
  final String userId;
  final Map<String, dynamic> preferences;
  final List<String> notifications;
  final Map<String, dynamic> security;
  final Map<String, dynamic> privacy;

  Settings({
    required this.userId,
    required this.preferences,
    required this.notifications,
    required this.security,
    required this.privacy,
  });

  factory Settings.fromJson(Map<String, dynamic> json) {
    return Settings(
      userId: json['userId'] as String,
      preferences: json['preferences'] as Map<String, dynamic>,
      notifications: (json['notifications'] as List<dynamic>).map((e) => e as String).toList(),
      security: json['security'] as Map<String, dynamic>,
      privacy: json['privacy'] as Map<String, dynamic>,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'preferences': preferences,
      'notifications': notifications,
      'security': security,
      'privacy': privacy,
    };
  }
}
