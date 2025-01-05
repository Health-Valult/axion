class Report {
  final String id;
  final DateTime dateTime;
  final String status;
  final String title;
  final String placeholderImageUrl;
  final String details;

  Report({
    required this.id,
    required this.dateTime,
    required this.status,
    required this.title,
    required this.placeholderImageUrl,
    required this.details,
  });
}
