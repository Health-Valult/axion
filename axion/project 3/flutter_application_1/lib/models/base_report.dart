abstract class BaseReport {
  final String id;
  final DateTime dateTime;
  final String title;
  final String status;
  final String? placeholderImageUrl;
  List<Map<String, dynamic>>? observations; 
  final Map<String, dynamic>? meta;

  BaseReport({
    required this.id,
    required this.dateTime,
    required this.title,
    required this.status,
    this.placeholderImageUrl,
    this.observations,
    this.meta,
  });
}
