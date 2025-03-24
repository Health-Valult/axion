class LogEntry {
  final String title;
  final String timestamp;
  final String location;
  final String description;
  final String date;

  LogEntry({
    required this.title,
    required this.timestamp,
    required this.location,
    required this.description,
    required this.date,
  });

  factory LogEntry.fromJson(Map<String, dynamic>? json) {
    // If json is null, return a default LogEntry.
    if (json == null) {
      return LogEntry(
        title: 'No Title',
        timestamp: '',
        location: '',
        description: '',
        date: 'Unknown Date',
      );
    }
    return LogEntry(
      title: json['title'] as String? ?? 'No Title',
      timestamp: json['timestamp'] as String? ?? '',
      location: json['location'] as String? ?? '',
      description: json['description'] as String? ?? '',
      date: json['date'] as String? ?? 'Unknown Date',
    );
  }
}
