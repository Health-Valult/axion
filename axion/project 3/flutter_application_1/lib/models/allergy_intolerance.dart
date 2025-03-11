class AllergyIntolerance {
  final String patient;
  final String code;
  final String display;
  final String timestamp;
  final String? criticality;
  final String? severity;
  final String? category;
  final bool active;
  final String? source;
  final String? verificationStatus;

  AllergyIntolerance({
    required this.patient,
    required this.code,
    required this.display,
    required this.timestamp,
    this.criticality,
    this.severity,
    this.category,
    required this.active,
    this.source,
    this.verificationStatus,
  });

  factory AllergyIntolerance.fromJson(Map<String, dynamic> json) {
    return AllergyIntolerance(
      patient: json['patient'] as String,
      code: json['code'] as String,
      display: json['display'] as String,
      timestamp: json['timestamp'] as String,
      criticality: json['criticality'] as String?,
      severity: json['severity'] as String?,
      category: json['category'] as String?,
      active: json['active'] as bool,
      source: json['source'] as String?,
      verificationStatus: json['verificationStatus'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'patient': patient,
      'code': code,
      'display': display,
      'timestamp': timestamp,
      'criticality': criticality,
      'severity': severity,
      'category': category,
      'active': active,
      'source': source,
      'verificationStatus': verificationStatus,
    };
  }
}
