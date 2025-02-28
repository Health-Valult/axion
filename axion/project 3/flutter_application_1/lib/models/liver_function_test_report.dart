import 'package:hive/hive.dart';
import 'base_report.dart';

part 'liver_function_test_report.g.dart';

@HiveType(typeId: 7)
class LiverFunctionTestReport implements BaseReport {
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
  
  // Specific fields for Liver Function Test
  @HiveField(11)
  final String bilirubinTotal;
  @HiveField(12)
  final String bilirubinDirect;
  @HiveField(13)
  final String bilirubinIndirect;
  @HiveField(14)
  final String sgpt;
  @HiveField(15)
  final String sgot;
  @HiveField(16)
  final String alkalinePhosphatase;
  @HiveField(17)
  final String serumProtein;
  @HiveField(18)
  final String serumAlbumin;
  @HiveField(19)
  final String globulin;
  @HiveField(20)
  final String agRatio;
  
  LiverFunctionTestReport({
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
    required this.bilirubinTotal,
    required this.bilirubinDirect,
    required this.bilirubinIndirect,
    required this.sgpt,
    required this.sgot,
    required this.alkalinePhosphatase,
    required this.serumProtein,
    required this.serumAlbumin,
    required this.globulin,
    required this.agRatio,
  });
  
  factory LiverFunctionTestReport.fromJson(Map<String, dynamic> json) {
    return LiverFunctionTestReport(
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
      bilirubinTotal: json['bilirubinTotal'] as String,
      bilirubinDirect: json['bilirubinDirect'] as String,
      bilirubinIndirect: json['bilirubinIndirect'] as String,
      sgpt: json['sgpt'] as String,
      sgot: json['sgot'] as String,
      alkalinePhosphatase: json['alkalinePhosphatase'] as String,
      serumProtein: json['serumProtein'] as String,
      serumAlbumin: json['serumAlbumin'] as String,
      globulin: json['globulin'] as String,
      agRatio: json['agRatio'] as String,
    );
  }
}
