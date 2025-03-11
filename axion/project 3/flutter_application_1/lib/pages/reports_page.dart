import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/models/report.dart';
import 'package:flutter_application_1/pages/downloaded_reports_page.dart';
import 'package:flutter_application_1/widgets/report_card.dart';
import 'package:flutter_application_1/services/graphql_queries.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:intl/intl.dart';

class ReportsPage extends StatefulWidget {
  const ReportsPage({Key? key}) : super(key: key);
  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> {
  int _selectedYear = DateTime.now().year;
  DateTime? _selectedDate;
  List<Report>? _reports;
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchReports();
  }

  Future<void> _fetchReports() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final GraphQLClient client = GraphQLProvider.of(context).value;

      final result = await client.query(
        QueryOptions(
          document: gql(GraphQLQueries.getPatientData),
          variables: {
            'patient': null,  // Fetch all reports
          },
          fetchPolicy: FetchPolicy.noCache,
        ),
      );

      if (result.hasException) {
        throw result.exception!;
      }

      // Process procedures (reports)
      final procedures = result.data?['procedures']['Procedures'] as List?;
      if (procedures == null) {
        throw Exception('No procedures data found');
      }

      // Convert procedures to Reports using the generic Report model
      final reports = procedures.map((proc) => Report.fromProcedure(proc)).toList();

      // Fetch observations for each report
      for (var report in reports) {
        final obsResult = await client.query(
          QueryOptions(
            document: gql(GraphQLQueries.getObservationsByEncounter),
            variables: {
              'patient': report.patient,
              'encounter': report.encounter,
            },
          ),
        );

        if (!obsResult.hasException && obsResult.data != null) {
          final observations = obsResult.data!['observations'] as List?;
          if (observations != null) {
            report.observations = observations.map((obs) => {
              'id': obs['id'],
              'code': obs['code'],
              'display': obs['display'],
              'value': obs['value'],
              'unit': obs['unit'],
              'timestamp': obs['timestamp'],
              'meta': obs['meta'],
            }).toList();
          }
        }
      }

      setState(() {
        _reports = reports;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  List<DateTime> _getDatesInYear() {
    final yearReports = _reports?.where((r) => r.dateTime.year == _selectedYear).toList() ?? [];
    final uniqueDates = <DateTime>{};
    for (final r in yearReports) {
      uniqueDates.add(DateTime(r.dateTime.year, r.dateTime.month, r.dateTime.day));
    }
    return uniqueDates.toList()..sort((a, b) => a.compareTo(b));
  }

  List<Report> _getDisplayedReports() {
    final yearReports = _reports?.where((r) => r.dateTime.year == _selectedYear).toList() ?? [];
    if (_selectedDate == null) return yearReports;
    return yearReports.where((r) =>
      r.dateTime.month == _selectedDate!.month &&
      r.dateTime.day == _selectedDate!.day
    ).toList();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: Text(AppLocalizations.of(context)!.reports),
          actions: [
            IconButton(
              icon: const Icon(Icons.download_outlined),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const DownloadedReportsPage()),
                );
              },
            ),
          ],
        ),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final displayedReports = _getDisplayedReports();
    final datesInYear = _getDatesInYear();

    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.reports),
        actions: [
          IconButton(
            icon: const Icon(Icons.calendar_today),
            onPressed: _pickYear,
          ),
          IconButton(
            icon: const Icon(Icons.download_outlined),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const DownloadedReportsPage()),
              );
            },
          ),
        ],
      ),
      body: _error != null
        ? Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Error: $_error'),
                ElevatedButton(
                  onPressed: _fetchReports,
                  child: const Text('Retry'),
                ),
              ],
            ),
          )
        : Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Text(
                      '$_selectedYear',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const Spacer(),
                    if (_selectedDate != null)
                      TextButton(
                        onPressed: () => setState(() => _selectedDate = null),
                        child: const Text('Clear Date Filter'),
                      ),
                  ],
                ),
              ),
              if (datesInYear.isNotEmpty)
                SizedBox(
                  height: 60,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: datesInYear.length,
                    itemBuilder: (context, index) {
                      final date = datesInYear[index];
                      final isSelected = _selectedDate != null &&
                          _selectedDate!.month == date.month &&
                          _selectedDate!.day == date.day;
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4.0),
                        child: FilterChip(
                          label: Text(DateFormat('MMM d').format(date)),
                          selected: isSelected,
                          onSelected: (selected) => setState(() {
                            _selectedDate = selected ? date : null;
                          }),
                        ),
                      );
                    },
                  ),
                ),
              Expanded(
                child: displayedReports.isEmpty
                  ? Center(
                      child: Text(
                        _selectedDate != null
                          ? 'No reports for selected date'
                          : 'No reports for $_selectedYear',
                      ),
                    )
                  : ListView.builder(
                      itemCount: displayedReports.length,
                      itemBuilder: (context, index) {
                        final report = displayedReports[index];
                        return ReportCard(report: report);
                      },
                    ),
              ),
            ],
          ),
    );
  }

  Future<void> _pickYear() async {
    final startYear = 2020;
    final endYear = DateTime.now().year;
    final years = List.generate(endYear - startYear + 1, (i) => startYear + i);
    
    final selectedYear = await showDialog<int>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Select Year"),
          content: Container(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: years.length,
              itemBuilder: (context, index) {
                final year = years[index];
                return ListTile(
                  title: Text(year.toString()),
                  onTap: () => Navigator.of(context).pop(year),
                );
              },
            ),
          ),
        );
      },
    );

    if (selectedYear != null) {
      setState(() {
        _selectedYear = selectedYear;
        _selectedDate = null;
      });
      _fetchReports();
    }
  }
}
