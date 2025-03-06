class AppNotification {
  final String id;
  final String title;
  final String description;
  final DateTime timestamp;
  final String type;
  final bool read;
  final String? action;
  final Map<String, dynamic>? data;

  AppNotification({
    required this.id,
    required this.title,
    required this.description,
    required this.timestamp,
    required this.type,
    required this.read,
    this.action,
    this.data,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    return AppNotification(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
      type: json['type'] as String,
      read: json['read'] as bool,
      action: json['action'] as String?,
      data: json['data'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'timestamp': timestamp.toIso8601String(),
      'type': type,
      'read': read,
      'action': action,
      'data': data,
    };
  }

  String get formattedTimestamp {
    return '${timestamp.month}/${timestamp.day}/${timestamp.year} ${timestamp.hour}:${timestamp.minute.toString().padLeft(2, '0')}';
  }
}
