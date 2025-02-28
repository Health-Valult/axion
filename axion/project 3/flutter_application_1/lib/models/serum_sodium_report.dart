import 'package:hive/hive.dart';
import 'base_report.dart';

part 'serum_sodium_report.g.dart';

@HiveType(typeId: 3)
class SerumSodiumReport implements BaseReport {
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
  
  // Specific fields for Serum Sodium
  @HiveField(11)
  final String sodiumValue;
  @HiveField(12)
  final String unit;
  @HiveField(13)
  final String reference;
  
  SerumSodiumReport({
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
    required this.sodiumValue,
    required this.unit,
    required this.reference,
  });
  
  factory SerumSodiumReport.fromJson(Map<String, dynamic> json) {
    return SerumSodiumReport(
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
      sodiumValue: json['sodiumValue'] as String,
      unit: json['unit'] as String,
      reference: json['reference'] as String,
    );
  }
}
