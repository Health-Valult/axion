import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:flutter_application_1/models/base_report.dart';

part 'report.g.dart';

@HiveType(typeId: 0)
@JsonSerializable()
class Report implements BaseReport {
  @HiveField(0)
  @override
  final String id;
  
  @HiveField(1)
  @override
  final DateTime dateTime;
  
  @HiveField(2)
  final String code;
  
  @HiveField(3)
  final String display;
  
  @HiveField(4)
  final String? encounter;
  
  @HiveField(5)
  final String? patient;
  
  @HiveField(6)
  @override
  final Map<String, dynamic>? meta;
  
  @HiveField(7)
  @override
  List<Map<String, dynamic>>? observations;

  @override
  String get title => display;

  @override
  String get status => 'completed';  // Default status for loaded reports

  @override
  String? get placeholderImageUrl => null;  // We don't use placeholder images

  Report({
    required this.id,
    required this.dateTime,
    required this.code,
    required this.display,
    this.encounter,
    this.patient,
    this.meta,
    this.observations,
  });

  factory Report.fromJson(Map<String, dynamic> json) => _$ReportFromJson(json);
  Map<String, dynamic> toJson() => _$ReportToJson(this);

  factory Report.fromProcedure(Map<String, dynamic> procedure) {
    return Report(
      id: procedure['id'],
      dateTime: DateTime.parse(procedure['Date']),
      code: procedure['code'] ?? '',
      display: procedure['display'] ?? '',
      encounter: procedure['encounter'],
      patient: procedure['patient'],
      meta: procedure['meta'] as Map<String, dynamic>?,
    );
  }
}
