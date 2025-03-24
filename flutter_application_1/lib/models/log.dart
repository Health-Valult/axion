class Log {
  final String id;
  final String title;
  final String description;
  final String location;
  final DateTime timestamp;
  final String? userId;
  final String? action;
  final Map<String, dynamic>? metadata;

  Log({
    required this.id,
    required this.title,
    required this.description,
    required this.location,
    required this.timestamp,
    this.userId,
    this.action,
    this.metadata,
  });

  String get date {
    return '${timestamp.month}/${timestamp.day}/${timestamp.year}';
  }

  String get formattedTimestamp {
    return '${timestamp.month}/${timestamp.day}/${timestamp.year} ${timestamp.hour}:${timestamp.minute.toString().padLeft(2, '0')}';
  }

  factory Log.fromJson(Map<String, dynamic> json) {
    return Log(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      location: json['location'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
      userId: json['userId'] as String?,
      action: json['action'] as String?,
      metadata: json['metadata'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'location': location,
      'timestamp': timestamp.toIso8601String(),
      'userId': userId,
      'action': action,
      'metadata': metadata,
    };
  }
}
