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
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final subtleColor = isDarkMode ? Colors.grey[400] : Colors.grey[600];
    final iconColor = isDarkMode ? Colors.grey[300] : Colors.grey[700];
    final cardColor = isDarkMode ? const Color.fromRGBO(13, 14, 18, 1) : const Color.fromRGBO(241, 241, 241, 1);


    final formattedDate = DateFormat.yMMMd(Localizations.localeOf(context).toString()).format(report.dateTime);

    return Card(
      color: cardColor,
      margin: const EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: Colors.grey.withOpacity(0.2),
          width: 1,
        ),
      ),
      elevation: 0,
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
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(Icons.insert_drive_file, color: iconColor),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      report.title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(
                          Icons.calendar_today,
                          size: 14,
                          color: subtleColor,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          formattedDate,
                          style: TextStyle(
                            color: subtleColor,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Icon(
                          Icons.access_time,
                          size: 14,
                          color: subtleColor,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          timeString,
                          style: TextStyle(
                            color: subtleColor,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.chevron_right,
                color: subtleColor?.withOpacity(0.7),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
