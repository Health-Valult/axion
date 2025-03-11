class Observation {
  final String? encounter;
  final String patient;
  final String code;
  final String display;
  final String? unit;
  final dynamic value;
  final String timestamp;
  final Map<String, dynamic> meta;

  Observation({
    this.encounter,
    required this.patient,
    required this.code,
    required this.display,
    this.unit,
    required this.value,
    required this.timestamp,
    required this.meta,
  });

  factory Observation.fromJson(Map<String, dynamic> json) {
    return Observation(
      encounter: json['encounter'] as String?,
      patient: json['patient'] as String,
      code: json['code'] as String,
      display: json['display'] as String,
      unit: json['unit'] as String?,
      value: json['value'],
      timestamp: json['timestamp'] as String,
      meta: json['meta'] as Map<String, dynamic>,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'encounter': encounter,
      'patient': patient,
      'code': code,
      'display': display,
      'unit': unit,
      'value': value,
      'timestamp': timestamp,
      'meta': meta,
    };
  }
}
