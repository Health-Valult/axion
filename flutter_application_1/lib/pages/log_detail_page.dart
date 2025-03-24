import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/log.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LogDetailPage extends StatelessWidget {
  final Log log;

  const LogDetailPage({Key? key, required this.log}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    
    return Scaffold(
      appBar: AppBar(
        title: Text(log.title),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Card(
          elevation: 2,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  log.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '${loc.time}: ${log.formattedTimestamp}',
                  style: const TextStyle(fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  '${loc.location}: ${log.location}',
                  style: const TextStyle(fontSize: 16),
                ),
                if (log.userId != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    '${loc.user}: ${log.userId}',
                    style: const TextStyle(fontSize: 16),
                  ),
                ],
                if (log.action != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    '${loc.action}: ${log.action}',
                    style: const TextStyle(fontSize: 16),
                  ),
                ],
                const Divider(height: 24),
                Text(
                  log.description,
                  style: const TextStyle(fontSize: 16),
                ),
                if (log.metadata != null && log.metadata!.isNotEmpty) ...[
                  const Divider(height: 24),
                  Text(
                    loc.additionalDetails,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...log.metadata!.entries.map((entry) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text(
                        '${entry.key}: ${entry.value}',
                        style: const TextStyle(fontSize: 16),
                      ),
                    );
                  }),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
