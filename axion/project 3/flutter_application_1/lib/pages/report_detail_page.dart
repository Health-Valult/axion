import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/report.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ReportDetailPage extends StatelessWidget {
  final Report report;

  const ReportDetailPage({
    super.key,
    required this.report,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
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
              // Image
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
                    '${loc.status}: ${report.status}',
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
                        '${loc.date}: $dateString',
                        style: const TextStyle(fontSize: 16),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      const Icon(Icons.access_time, size: 16),
                      const SizedBox(width: 8),
                      Text(
                        '${loc.time}: $hour:$minute',
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
                  color: Theme.of(context).cardColor,
                  borderRadius: BorderRadius.circular(12),
                ),
                padding: const EdgeInsets.all(16),
                child: Text(
                  report.details,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
