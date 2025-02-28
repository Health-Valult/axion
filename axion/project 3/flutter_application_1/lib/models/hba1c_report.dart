import 'package:hive/hive.dart';
import 'base_report.dart';

part 'hba1c_report.g.dart';

@HiveType(typeId: 4)
class HBA1cReport implements BaseReport {
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
  
  // Specific fields for HbA1c
  @HiveField(11)
  final String hba1cValue;
  @HiveField(12)
  final String unit;
  @HiveField(13)
  final String reference;
  
  HBA1cReport({
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
    required this.hba1cValue,
    required this.unit,
    required this.reference,
  });
  
  factory HBA1cReport.fromJson(Map<String, dynamic> json) {
    return HBA1cReport(
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
      hba1cValue: json['hba1cValue'] as String,
      unit: json['unit'] as String,
      reference: json['reference'] as String,
    );
  }
}
