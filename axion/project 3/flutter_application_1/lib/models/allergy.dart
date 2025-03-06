class Allergy {
  final String id;
  final String name;
  final String severity;
  final String reaction;
  final DateTime diagnosedDate;
  final String? notes;

  Allergy({
    required this.id,
    required this.name,
    required this.severity,
    required this.reaction,
    required this.diagnosedDate,
    this.notes,
  });

  factory Allergy.fromJson(Map<String, dynamic> json) {
    return Allergy(
      id: json['id'],
      name: json['name'],
      severity: json['severity'],
      reaction: json['reaction'],
      diagnosedDate: DateTime.parse(json['diagnosedDate']),
      notes: json['notes'],
    );
  }
}
