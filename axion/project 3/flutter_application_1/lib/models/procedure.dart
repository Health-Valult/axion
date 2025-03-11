class Procedure {
  final String? encounter;
  final String patient;
  final String id;
  final String code;
  final String display;
  final String date;
  final Map<String, dynamic> meta;

  Procedure({
    this.encounter,
    required this.patient,
    required this.id,
    required this.code,
    required this.display,
    required this.date,
    required this.meta,
  });

  factory Procedure.fromJson(Map<String, dynamic> json) {
    return Procedure(
      encounter: json['encounter'] as String?,
      patient: json['patient'] as String,
      id: json['id'] as String,
      code: json['code'] as String,
      display: json['display'] as String,
      date: json['Date'] as String,  // Note: API sends 'Date' with capital D
      meta: json['meta'] as Map<String, dynamic>,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'encounter': encounter,
      'patient': patient,
      'id': id,
      'code': code,
      'display': display,
      'Date': date,  // Note: API expects 'Date' with capital D
      'meta': meta,
    };
  }
}
