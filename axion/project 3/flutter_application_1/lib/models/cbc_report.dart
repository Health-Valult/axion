import 'package:hive/hive.dart';
import 'test_item.dart';
import 'base_report.dart';

part 'cbc_report.g.dart';

@HiveType(typeId: 1)
class CBCReport implements BaseReport {
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
  
  // Specific field for CBC
  @HiveField(11)
  final List<TestItem> testResults;
  
  CBCReport({
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
    required this.testResults,
  });
  
  factory CBCReport.fromJson(Map<String, dynamic> json) {
    final List<dynamic> testsJson = json['testResults'] as List<dynamic>;
    List<TestItem> tests = testsJson
        .map((item) => TestItem.fromJson(item as Map<String, dynamic>))
        .toList();
    return CBCReport(
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
      testResults: tests,
    );
  }
}
