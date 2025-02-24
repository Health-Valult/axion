import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/report.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_application_1/pages/downloaded_reports_page.dart';

class ReportDetailPage extends StatelessWidget {
  final Report report;

  const ReportDetailPage({
    super.key,
    required this.report,
  });

  Future<void> _downloadReport(BuildContext context) async {
    final box = Hive.box<Report>('downloadedReports');
    if (box.containsKey(report.id)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Report already downloaded')),
      );
    } else {
      await box.put(report.id, report);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Report downloaded successfully')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final dateString =
        '${report.dateTime.month.toString().padLeft(2, '0')}/'
        '${report.dateTime.day.toString().padLeft(2, '0')}/'
        '${report.dateTime.year}';
    final hour = report.dateTime.hour.toString().padLeft(2, '0');
    final minute = report.dateTime.minute.toString().padLeft(2, '0');

    return Scaffold(
      appBar: AppBar(
        title: Text(report.title),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Image with tap-to-zoom
              GestureDetector(
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return Dialog(
                        child: InteractiveViewer(
                          child: Image.network(
                            report.placeholderImageUrl,
                            fit: BoxFit.contain,
                          ),
                        ),
                      );
                    },
                  );
                },
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Image.network(
                    report.placeholderImageUrl,
                    height: 200,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              // Title and Status
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      report.title,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Text(
                    'Status: ${report.status}',
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.green,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const Divider(height: 30, thickness: 1.5),
              // Date and Time
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.calendar_today, size: 16),
                      const SizedBox(width: 8),
                      Text(
                        'Date: $dateString',
                        style: const TextStyle(fontSize: 16),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      const Icon(Icons.access_time, size: 16),
                      const SizedBox(width: 8),
                      Text(
                        'Time: $hour:$minute',
                        style: const TextStyle(fontSize: 16),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 20),
              // Details Section
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: const Color(0xFF1A1A1A),
                  borderRadius: BorderRadius.circular(12),
                ),
                padding: const EdgeInsets.all(16),
                child: Text(report.details),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _downloadReport(context),
        label: const Text('Download'),
        icon: const Icon(Icons.download),
      ),
    );
  }
}
