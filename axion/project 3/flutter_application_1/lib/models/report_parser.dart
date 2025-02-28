import 'base_report.dart';
import 'cbc_report.dart';
import 'serum_chloride_report.dart';
import 'serum_sodium_report.dart';
import 'hba1c_report.dart';
import 'serum_potassium_report.dart';
import 'lipid_profile_report.dart';
import 'liver_function_test_report.dart';
import 'thyroid_function_test_report.dart';
import 'crp_report.dart';
import 'serum_creatinine_report.dart';

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
    default:
      throw Exception('Unsupported report type: $type');
  }
}
