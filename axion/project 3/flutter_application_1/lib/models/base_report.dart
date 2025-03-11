abstract class BaseReport {
  String get id;
  DateTime get dateTime;
  String get title;
  String get status;
  String? get placeholderImageUrl;
  List<Map<String, dynamic>>? get observations;
  Map<String, dynamic>? get meta;
}
