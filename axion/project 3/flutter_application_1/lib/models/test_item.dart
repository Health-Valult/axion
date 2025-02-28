class TestItem {
  final String testName;
  final String value;
  final String unit;
  final String reference;
  
  TestItem({
    required this.testName,
    required this.value,
    required this.unit,
    required this.reference,
  });
  
  factory TestItem.fromJson(Map<String, dynamic> json) {
    return TestItem(
      testName: json['testName'] as String,
      value: json['value'] as String,
      unit: json['unit'] as String,
      reference: json['reference'] as String,
    );
  }
}
