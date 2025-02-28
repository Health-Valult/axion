import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/pages/report_detail_page.dart';

class ReportCard extends StatelessWidget {
  final BaseReport report;

  const ReportCard({super.key, required this.report});

  @override
  Widget build(BuildContext context) {
    final hour = report.dateTime.hour.toString().padLeft(2, '0');
    final minute = report.dateTime.minute.toString().padLeft(2, '0');
    final timeString = '$hour:$minute';

    return Card(
      color: const Color(0xFF1A1A1A),
      margin: const EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 2,
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => ReportDetailPage(report: report),
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            children: [
              // Instead of using report.placeholderImageUrl, we use a default icon
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: Colors.grey[800],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.insert_drive_file, color: Colors.white),
              ),
              const SizedBox(width: 12),
              // Title & time information
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      report.title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          timeString,
                          style: const TextStyle(color: Colors.blueGrey),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
