class AppNotification {
  final String id;
  final String title; // We'll use title to display the notification text.
  final String description; // You can set this to empty if not used.
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
    // Extract the timestamp string from the nested "$date" field.
    final timestampStr = json['timestamp'] != null &&
            json['timestamp'] is Map<String, dynamic> &&
            json['timestamp']['\$date'] != null
        ? json['timestamp']['\$date'] as String
        : '';

    return AppNotification(
      id: json['_id'] as String, // Use the '_id' field from the API.
      title: json['message'] as String, // Use the "message" as title.
      description: '', // Or set to any default or different field if available.
      timestamp: timestampStr.isNotEmpty ? DateTime.parse(timestampStr) : DateTime.now(),
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
