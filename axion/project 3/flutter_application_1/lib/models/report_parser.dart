import 'package:flutter_application_1/models/report.dart';

class ReportParser {
  static Report fromJson(Map<String, dynamic> json) {
    return Report(
      id: json['id'] as String,
      dateTime: DateTime.parse(json['dateTime'] as String),
      code: json['code'] as String,
      display: json['display'] as String,
      encounter: json['encounter'] as String?,
      patient: json['patient'] as String?,
      meta: json['meta'] as Map<String, dynamic>?,
      observations: (json['observations'] as List<dynamic>?)
          ?.map((e) => e as Map<String, dynamic>)
          .toList(),
    );
  }

  static Map<String, dynamic> toJson(Report report) {
    return {
      'id': report.id,
      'dateTime': report.dateTime.toIso8601String(),
      'code': report.code,
      'display': report.display,
      'encounter': report.encounter,
      'patient': report.patient,
      'meta': report.meta,
      'observations': report.observations,
    };
  }
}
