import 'package:hive/hive.dart';
import 'base_report.dart';

part 'serum_potassium_report.g.dart';

@HiveType(typeId: 5)
class SerumPotassiumReport implements BaseReport {
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
  
  // Specific fields for Serum Potassium
  @HiveField(11)
  final String potassiumValue;
  @HiveField(12)
  final String unit;
  @HiveField(13)
  final String reference;
  
  SerumPotassiumReport({
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
    required this.potassiumValue,
    required this.unit,
    required this.reference,
  });
  
  factory SerumPotassiumReport.fromJson(Map<String, dynamic> json) {
    return SerumPotassiumReport(
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
      potassiumValue: json['potassiumValue'] as String,
      unit: json['unit'] as String,
      reference: json['reference'] as String,
    );
  }
}
