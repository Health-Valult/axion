import 'package:hive/hive.dart';
import 'base_report.dart';

part 'lipid_profile_report.g.dart';

@HiveType(typeId: 6)
class LipidProfileReport implements BaseReport {
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
  
  // Specific fields for Lipid Profile
  @HiveField(11)
  final String totalCholesterol;
  @HiveField(12)
  final String triglycerides;
  @HiveField(13)
  final String hdl;
  @HiveField(14)
  final String ldl;
  @HiveField(15)
  final String vldl;
  @HiveField(16)
  final String ldlHdlRatio;
  @HiveField(17)
  final String totalCholesterolHdlRatio;
  
  LipidProfileReport({
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
    required this.totalCholesterol,
    required this.triglycerides,
    required this.hdl,
    required this.ldl,
    required this.vldl,
    required this.ldlHdlRatio,
    required this.totalCholesterolHdlRatio,
  });
  
  factory LipidProfileReport.fromJson(Map<String, dynamic> json) {
    return LipidProfileReport(
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
      totalCholesterol: json['totalCholesterol'] as String,
      triglycerides: json['triglycerides'] as String,
      hdl: json['hdl'] as String,
      ldl: json['ldl'] as String,
      vldl: json['vldl'] as String,
      ldlHdlRatio: json['ldlHdlRatio'] as String,
      totalCholesterolHdlRatio: json['totalCholesterolHdlRatio'] as String,
    );
  }
}
