class MedicationRecord {
  final String patient;
  final String code;
  final String display;
  final String? dosage;
  final String? route;
  final String? prescriber;
  final Map<String, dynamic> meta;

  MedicationRecord({
    required this.patient,
    required this.code,
    required this.display,
    this.dosage,
    this.route,
    this.prescriber,
    required this.meta,
  });

  factory MedicationRecord.fromJson(Map<String, dynamic> json) {
    return MedicationRecord(
      patient: json['patient'] as String,
      code: json['code'] as String,
      display: json['display'] as String,
      dosage: json['dosage'] as String?,
      route: json['route'] as String?,
      prescriber: json['prescriber'] as String?,
      meta: json['meta'] as Map<String, dynamic>,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'patient': patient,
      'code': code,
      'display': display,
      'dosage': dosage,
      'route': route,
      'prescriber': prescriber,
      'meta': meta,
    };
  }
}
