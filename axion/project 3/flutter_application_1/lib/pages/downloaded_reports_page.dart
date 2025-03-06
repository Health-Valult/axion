import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/pages/report_detail_page.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class DownloadedReportsPage extends StatelessWidget {
  const DownloadedReportsPage({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.downloadedReports),
      ),
      body: ValueListenableBuilder(
        valueListenable: Hive.box<BaseReport>('downloadedReports').listenable(),
        builder: (context, Box<BaseReport> box, _) {
          if (box.isEmpty) {
            return Center(
              child: Text(AppLocalizations.of(context)!.noDownloadedReports),
            );
          }

          final reports = box.values.toList();
          return ListView.builder(
            itemCount: reports.length,
            itemBuilder: (context, index) {
              final report = reports[index];
              return Card(
                margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: ListTile(
                  title: Text(report.title),
                  subtitle: Text(
                    '${report.dateTime.month.toString().padLeft(2, '0')}/${report.dateTime.day.toString().padLeft(2, '0')}/${report.dateTime.year}',
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.visibility),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => ReportDetailPage(report: report),
                            ),
                          );
                        },
                      ),
                      IconButton(
                        icon: Icon(Icons.delete),
                        onPressed: () async {
                          await box.delete(report.id);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(AppLocalizations.of(context)!.reportDeleted),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
