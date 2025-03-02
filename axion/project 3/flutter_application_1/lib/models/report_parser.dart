import 'models.dart'; // This imports all models so they’re all included in the build.


BaseReport parseReportFromJson(Map<String, dynamic> json) {
  final String type = json['reportType'];
  switch (type) {
    case 'cbc':
      return CBCReport.fromJson(json);
    case 'serumChloride':
      return SerumChlorideReport.fromJson(json);
    case 'serumSodium':
      return SerumSodiumReport.fromJson(json);
    case 'hba1c':
      return HBA1cReport.fromJson(json);
    case 'serumPotassium':
      return SerumPotassiumReport.fromJson(json);
    case 'lipidProfile':
      return LipidProfileReport.fromJson(json);
    case 'liverFunctionTest':
      return LiverFunctionTestReport.fromJson(json);
    case 'thyroidFunctionTest':
      return ThyroidFunctionTestReport.fromJson(json);
    case 'crp':
      return CRPReport.fromJson(json);
    case 'serumCreatinine':
      return SerumCreatinineReport.fromJson(json);
    case 'esrWintrobe':
      return ESRWintrobeReport.fromJson(json);
    case 'esrWestergren':
      return ESRWestergrenReport.fromJson(json);
    case 'urineRoutine':
      return UrineRoutineReport.fromJson(json);
    default:
      throw Exception('Unsupported report type: $type');
  }
}
