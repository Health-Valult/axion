import 'package:flutter/material.dart';
import 'package:flutter_application_1/services/hive_service.dart';
import 'package:flutter_application_1/widgets/report_card.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class DownloadedReportsPage extends StatefulWidget {
  const DownloadedReportsPage({Key? key}) : super(key: key);

  @override
  State<DownloadedReportsPage> createState() => _DownloadedReportsPageState();
}

class _DownloadedReportsPageState extends State<DownloadedReportsPage> {
  List<BaseReport> _downloadedReports = [];

  @override
  void initState() {
    super.initState();
    _loadDownloadedReports();
  }

  void _loadDownloadedReports() {
    setState(() {
      _downloadedReports = HiveService.getDownloadedReports();
    });
  }

  Future<void> _deleteReport(BaseReport report) async {
    await HiveService.deleteReport(report.id);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(AppLocalizations.of(context)!.reportDeleted)),
    );
    _loadDownloadedReports();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.downloadedReports),
        actions: [
          if (_downloadedReports.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.delete_outline),
              onPressed: () async {
                final confirmed = await showDialog<bool>(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Clear Downloads'),
                    content: const Text('Are you sure you want to delete all downloaded reports?'),
                    actions: [
                      TextButton(
                        child: const Text('Cancel'),
                        onPressed: () => Navigator.pop(context, false),
                      ),
                      TextButton(
                        child: const Text('Delete All'),
                        onPressed: () => Navigator.pop(context, true),
                      ),
                    ],
                  ),
                );

                if (confirmed == true) {
                  await HiveService.clearAllReports();
                  _loadDownloadedReports();
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('All downloads cleared')),
                    );
                  }
                }
              },
            ),
        ],
      ),
      body: _downloadedReports.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.download_outlined,
                    size: 64,
                    color: Theme.of(context).disabledColor,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No downloaded reports',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Your downloaded reports will appear here',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).textTheme.bodySmall?.color,
                        ),
                  ),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _downloadedReports.length,
              itemBuilder: (context, index) {
                final report = _downloadedReports[index];
                return Dismissible(
                  key: Key(report.id),
                  direction: DismissDirection.endToStart,
                  background: Container(
                    alignment: Alignment.centerRight,
                    padding: const EdgeInsets.only(right: 16),
                    color: Colors.red,
                    child: const Icon(Icons.delete, color: Colors.white),
                  ),
                  onDismissed: (_) => _deleteReport(report),
                  child: ReportCard(report: report),
                );
              },
            ),
    );
  }
}
