import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/log_entry.dart';

class LogDetailPage extends StatelessWidget {
  final LogEntry log;

  const LogDetailPage({Key? key, required this.log}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(log.title),
      ),
      body: Padding(
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
                  'Time: ${log.timestamp}',
                  style: const TextStyle(fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  'Location: ${log.location}',
                  style: const TextStyle(fontSize: 16),
                ),
                const Divider(height: 24),
                Text(
                  log.description,
                  style: const TextStyle(fontSize: 16),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
