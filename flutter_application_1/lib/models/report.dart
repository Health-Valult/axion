import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:flutter_application_1/models/base_report.dart';



@HiveType(typeId: 0)
@JsonSerializable()
class Report extends BaseReport {
  @HiveField(2)
  final String code;
  
  @HiveField(3)
  final String display;
  
  @HiveField(4)
  final String? encounter;
  
  @HiveField(5)
  final String? patient;

  Report({
    required String id,
    required DateTime dateTime,
    required this.code,
    required this.display,
    this.encounter,
    this.patient,
    Map<String, dynamic>? meta,
    List<Map<String, dynamic>>? observations,
  }) : super(
    id: id,
    dateTime: dateTime,
    title: display,
    status: 'completed',
    meta: meta,
    observations: observations,
    placeholderImageUrl: null,
  );



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
