import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/pages/report_detail_page.dart';
import 'package:intl/intl.dart';

class ReportCard extends StatelessWidget {
  final BaseReport report;

  const ReportCard({super.key, required this.report});

  @override
  Widget build(BuildContext context) {
    final hour = report.dateTime.hour.toString().padLeft(2, '0');
    final minute = report.dateTime.minute.toString().padLeft(2, '0');
    final timeString = '$hour:$minute';

    // Format the date using the intl package (localized)
    final formattedDate = DateFormat.yMMMd(Localizations.localeOf(context).toString()).format(report.dateTime);

    // Use theme properties for colors and text styles
    final cardColor = Theme.of(context).cardColor;
    final iconBackground = Theme.of(context).brightness == Brightness.dark
        ? Colors.grey[800]
        : Colors.grey[300];

    return Card(
      color: cardColor,
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
              // Use a themed background for the icon container
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: iconBackground,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.insert_drive_file, color: Colors.white),
              ),
              const SizedBox(width: 12),
              // Title, date and time information using theme text styles
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      report.title,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          formattedDate,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.blueGrey),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          timeString,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.blueGrey),
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
