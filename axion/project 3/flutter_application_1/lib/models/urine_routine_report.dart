import 'package:hive/hive.dart';
import 'base_report.dart';

part 'urine_routine_report.g.dart';

@HiveType(typeId: 13)
class UrineRoutineReport implements BaseReport {
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
  
  // Specific fields for Urine Routine Report:
  // Physical Examination
  @HiveField(11)
  final String physicalQuantity;
  @HiveField(12)
  final String physicalColour;
  @HiveField(13)
  final String physicalTransparency;
  @HiveField(14)
  final String specificGravity;
  @HiveField(15)
  final String pH;
  // Chemical Examination
  @HiveField(16)
  final String chemicalProtein;
  @HiveField(17)
  final String chemicalSugar;
  @HiveField(18)
  final String chemicalKetoneBodies;
  @HiveField(19)
  final String chemicalBilirubin;
  // Microscopic Examination
  @HiveField(20)
  final String microscopicRBC;
  @HiveField(21)
  final String microscopicPusCells;
  @HiveField(22)
  final String microscopicEpithelialCells;
  @HiveField(23)
  final String microscopicCasts;
  @HiveField(24)
  final String microscopicCrystals;
  @HiveField(25)
  final String microscopicBacteria;
  
  UrineRoutineReport({
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
    required this.physicalQuantity,
    required this.physicalColour,
    required this.physicalTransparency,
    required this.specificGravity,
    required this.pH,
    required this.chemicalProtein,
    required this.chemicalSugar,
    required this.chemicalKetoneBodies,
    required this.chemicalBilirubin,
    required this.microscopicRBC,
    required this.microscopicPusCells,
    required this.microscopicEpithelialCells,
    required this.microscopicCasts,
    required this.microscopicCrystals,
    required this.microscopicBacteria,
  });
  
  factory UrineRoutineReport.fromJson(Map<String, dynamic> json) {
    return UrineRoutineReport(
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
      physicalQuantity: json['physicalQuantity'] as String,
      physicalColour: json['physicalColour'] as String,
      physicalTransparency: json['physicalTransparency'] as String,
      specificGravity: json['specificGravity'] as String,
      pH: json['pH'] as String,
      chemicalProtein: json['chemicalProtein'] as String,
      chemicalSugar: json['chemicalSugar'] as String,
      chemicalKetoneBodies: json['chemicalKetoneBodies'] as String,
      chemicalBilirubin: json['chemicalBilirubin'] as String,
      microscopicRBC: json['microscopicRBC'] as String,
      microscopicPusCells: json['microscopicPusCells'] as String,
      microscopicEpithelialCells: json['microscopicEpithelialCells'] as String,
      microscopicCasts: json['microscopicCasts'] as String,
      microscopicCrystals: json['microscopicCrystals'] as String,
      microscopicBacteria: json['microscopicBacteria'] as String,
    );
  }
}
