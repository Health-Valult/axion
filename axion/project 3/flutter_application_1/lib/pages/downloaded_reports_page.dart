import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/pages/report_detail_page.dart';

class DownloadedReportsPage extends StatelessWidget {
  const DownloadedReportsPage({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    // Use the same box name and type.
    final downloadedReportsBox = Hive.box<BaseReport>('downloadedReports');
    return Scaffold(
      appBar: AppBar(
        title: const Text('Downloaded Reports'),
      ),
      body: ValueListenableBuilder(
        valueListenable: downloadedReportsBox.listenable(),
        builder: (context, Box<BaseReport> box, _) {
          if (box.isEmpty) {
            return const Center(child: Text('No downloaded reports'));
          }
          final reports = box.values.toList();
          return ListView.builder(
            itemCount: reports.length,
            itemBuilder: (context, index) {
              final report = reports[index];
              return ListTile(
                title: Text(report.title),
                subtitle: Text(
                  '${report.dateTime.month.toString().padLeft(2, '0')}/${report.dateTime.day.toString().padLeft(2, '0')}/${report.dateTime.year}',
                ),
                trailing: IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () async {
                    await box.delete(report.id);
                  },
                ),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => ReportDetailPage(report: report)),
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}
