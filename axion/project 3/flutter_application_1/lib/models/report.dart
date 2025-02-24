import 'package:hive/hive.dart';

part 'report.g.dart';

@HiveType(typeId: 0)
class Report {
  @HiveField(0)
  final String id;
  
  @HiveField(1)
  final DateTime dateTime;
  
  @HiveField(2)
  final String status;
  
  @HiveField(3)
  final String title;
  
  @HiveField(4)
  final String placeholderImageUrl;
  
  @HiveField(5)
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
