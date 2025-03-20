import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_application_1/models/report.dart';

class HiveService {
  static const String reportsBoxName = 'downloaded_reports';
  
  static Future<void> init() async {
    await Hive.initFlutter();
    
    // Register adapters if not already registered
    if (!Hive.isAdapterRegistered(0)) {
      Hive.registerAdapter(ReportAdapter());
    }
    
    // Open boxes
    await Hive.openBox<Report>(reportsBoxName);
  }
  
  // Save report for offline access
  static Future<void> saveReport(Report report) async {
    final box = Hive.box<Report>(reportsBoxName);
    await box.put(report.id, report);
    print('Report saved to offline storage: ${report.id}');
  }
  
  // Get all downloaded reports
  static List<Report> getDownloadedReports() {
    final box = Hive.box<Report>(reportsBoxName);
    return box.values.toList();
  }
  
  // Check if a report is downloaded
  static bool isReportDownloaded(String reportId) {
    final box = Hive.box<Report>(reportsBoxName);
    return box.containsKey(reportId);
  }
  
  // Delete a downloaded report
  static Future<void> deleteReport(String reportId) async {
    final box = Hive.box<Report>(reportsBoxName);
    await box.delete(reportId);
    print('Report deleted from offline storage: $reportId');
  }
  
  // Get a specific downloaded report
  static Report? getReport(String reportId) {
    final box = Hive.box<Report>(reportsBoxName);
    return box.get(reportId);
  }
  
  // Clear all downloaded reports
  static Future<void> clearAllReports() async {
    final box = Hive.box<Report>(reportsBoxName);
    await box.clear();
    print('All reports cleared from offline storage');
  }
}
