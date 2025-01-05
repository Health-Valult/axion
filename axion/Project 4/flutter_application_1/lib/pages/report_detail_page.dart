import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/report.dart';

class ReportDetailPage extends StatelessWidget {
  final Report report;

  const ReportDetailPage({
    super.key,
    required this.report,
  });

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
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Large placeholder image
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.network(
                report.placeholderImageUrl,
                height: 200,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 16),

            Text(
              'Status: ${report.status}',
              style: const TextStyle(
                fontSize: 18,
                color: Colors.green,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text('Date: $dateString'),
            Text('Time: $hour:$minute'),
            const SizedBox(height: 16),

            // Additional details
            Text(report.details),
          ],
        ),
      ),
    );
  }
}
