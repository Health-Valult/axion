import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/log.dart';
import 'package:flutter_application_1/pages/log_detail_page.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';

/// ==========================
/// LogService
/// ==========================
///
/// Simulates backend endpoints for logs.
class LogService {
  static const String baseUrl = 'https://api.example.com';

  // Simulated HTTP client.
  static final http.Client client = MockClient((http.Request request) async {
    final String url = request.url.toString();
    await Future.delayed(const Duration(milliseconds: 100));

    // Simulate GET /logs endpoint.
    if (request.method == 'GET' && url == '$baseUrl/logs') {
      return http.Response(
        json.encode([
          {
            "title": "System Access",
            "timestamp": "Jan 20, 2025 10:15 AM",
            "date": "Jan 20, 2025",
            "location": "New York, USA",
            "description": "User X accessed the system. IP: 192.168.0.10"
          },
          {
            "title": "Settings Changed",
            "timestamp": "Jan 19, 2025 3:47 PM",
            "date": "Jan 19, 2025",
            "location": "Berlin, Germany",
            "description": "User Y changed some settings here..."
          },
          {
            "title": "System Access",
            "timestamp": "Jan 19, 2025 9:05 AM",
            "date": "Jan 19, 2025",
            "location": "London, UK",
            "description": "User Z logged into the system. IP: 10.0.0.5"
          },
        ]),
        200,
      );
    }
    return http.Response("Not Found", 404);
  });

  /// Fetch logs from the simulated backend.
  static Future<List<Map<String, dynamic>>> getLogs() async {
    final response = await client.get(Uri.parse('$baseUrl/logs'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((e) => Map<String, dynamic>.from(e)).toList();
    }
    throw Exception("Failed to load logs");
  }
}

/// ==========================
/// LogPage
/// ==========================

class LogPage extends StatefulWidget {
  const LogPage({Key? key}) : super(key: key);

  @override
  State<LogPage> createState() => _LogPageState();
}

class _LogPageState extends State<LogPage> {
  final _apiService = ApiService();
  List<Log>? _logs;
  Map<String, List<Log>> _groupedLogs = {};
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadLogs();
  }

  Future<void> _loadLogs() async {
    try {
      if (!mounted) return;
      setState(() {
        _isLoading = true;
        _error = null;
      });

      final logs = await _apiService.getLogs();
      if (!mounted) return;
      setState(() {
        _logs = logs;
        _groupedLogs = _groupByDate(logs);
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Map<String, List<Log>> _groupByDate(List<Log> logs) {
    final Map<String, List<Log>> grouped = {};
    for (var log in logs) {
      final date = log.date;
      grouped.putIfAbsent(date, () => []).add(log);
    }
    return Map.fromEntries(
      grouped.entries.toList()
        ..sort((a, b) => b.key.compareTo(a.key))
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: Text(loc.log),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(
          title: Text(loc.log),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Error: $_error'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _loadLogs,
                child: Text(loc.retry),
              ),
            ],
          ),
        ),
      );
    }

    if (_logs == null || _logs!.isEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: Text(loc.log),
        ),
        body: Center(
          child: Text(loc.noNewNotifications),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.log),
      ),
      body: RefreshIndicator(
        onRefresh: _loadLogs,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: _groupedLogs.entries.map((entry) {
            final date = entry.key;
            final logsForDate = entry.value;
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8.0),
                  child: Text(
                    date,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                ...logsForDate.map((log) {
                  return GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => LogDetailPage(log: log),
                        ),
                      );
                    },
                    child: Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              margin: const EdgeInsets.only(right: 12),
                              width: 12,
                              height: 12,
                              decoration: const BoxDecoration(
                                color: Colors.blue,
                                shape: BoxShape.circle,
                              ),
                            ),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    log.title,
                                    style: const TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    log.formattedTimestamp,
                                    style: const TextStyle(
                                      fontSize: 14,
                                      color: Colors.grey,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    'Location: ${log.location}',
                                    style: const TextStyle(fontSize: 14),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }
}
