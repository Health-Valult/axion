import 'package:hive/hive.dart';
import 'base_report.dart';

part 'thyroid_function_test_report.g.dart';

@HiveType(typeId: 8)
class ThyroidFunctionTestReport implements BaseReport {
  // Common fields
  @HiveField(0)
  final String id;
  @HiveField(1)
  final DateTime dateTime;
  @HiveField(2)
  final String title;
  @HiveField(3)
  final String status;
  @HiveField(4)
  final String placeholderImageUrl;
  @HiveField(5)
  final String patientName;
  @HiveField(6)
  final String referredBy;
  @HiveField(7)
  final String ageSex;
  @HiveField(8)
  final String investigations;
  @HiveField(9)
  final String dailyCaseNumber;
  @HiveField(10)
  final String patientID;
  
  // Specific fields for Thyroid Function Test
  @HiveField(11)
  final String t3;
  @HiveField(12)
  final String t4;
  @HiveField(13)
  final String tsh;
  
  ThyroidFunctionTestReport({
    required this.id,
    required this.dateTime,
    required this.title,
    required this.status,
    required this.placeholderImageUrl,
    required this.patientName,
    required this.referredBy,
    required this.ageSex,
    required this.investigations,
    required this.dailyCaseNumber,
    required this.patientID,
    required this.t3,
    required this.t4,
    required this.tsh,
  });
  
  factory ThyroidFunctionTestReport.fromJson(Map<String, dynamic> json) {
    return ThyroidFunctionTestReport(
      id: json['id'] as String,
      dateTime: DateTime.parse(json['dateTime'] as String),
      title: json['title'] as String,
      status: json['status'] as String,
      placeholderImageUrl: json['placeholderImageUrl'] as String,
      patientName: json['patientName'] as String,
      referredBy: json['referredBy'] as String,
      ageSex: json['ageSex'] as String,
      investigations: json['investigations'] as String,
      dailyCaseNumber: json['dailyCaseNumber'] as String,
      patientID: json['patientID'] as String,
      t3: json['t3'] as String,
      t4: json['t4'] as String,
      tsh: json['tsh'] as String,
    );
  }
}
