// lib/pages/reports_page.dart
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/models/report_parser.dart';
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
  List<BaseReport>? _reports;
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
          document: gql(GraphQLQueries.getReports),
          variables: {
            'year': _selectedYear,
          },
          fetchPolicy: FetchPolicy.noCache,
        ),
      );

      if (result.hasException) {
        throw result.exception!;
      }

      final reports = (result.data?['reports'] as List?)
          ?.map((report) => parseReportFromJson(report))
          .whereType<BaseReport>()
          .toList();

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
      if (r?.dateTime != null) {
        uniqueDates.add(DateTime(r.dateTime!.year, r.dateTime!.month, r.dateTime!.day));
      }
    }
    return uniqueDates.toList()..sort((a, b) => a.compareTo(b));
  }

  List<BaseReport> _getDisplayedReports() {
    final yearReports = _reports?.where((r) => r?.dateTime?.year == _selectedYear).toList();
    if (_selectedDate == null) return yearReports ?? [];
    return yearReports?.where((r) =>
      r?.dateTime?.month == _selectedDate!.month &&
      r?.dateTime?.day == _selectedDate!.day
    ).toList() ?? [];
  }

  void _handleDateChipTap(DateTime date, bool isSelected) {
    setState(() {
      _selectedDate = isSelected ? null : date;
    });
  }

  Future<void> _pickYear() async {
    final startYear = 2020;
    final endYear = DateTime.now().year;
    final years = List.generate(endYear - startYear + 1, (i) => startYear + i);
    
    final selectedYear = await showDialog<int>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Select Year"),
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
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (_error != null) {
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
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Error: $_error'),
              ElevatedButton(
                onPressed: _fetchReports,
                child: Text(AppLocalizations.of(context)!.ok),
              ),
            ],
          ),
        ),
      );
    }

    final sortedDates = _getDatesInYear();
    final displayedReports = _getDisplayedReports();
    final locale = Localizations.localeOf(context).toString();

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
      body: RefreshIndicator(
        onRefresh: _fetchReports,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Year selector
            Card(
              child: ListTile(
                title: Text('${AppLocalizations.of(context)!.yes}: $_selectedYear'),
                trailing: Icon(Icons.calendar_today),
                onTap: _pickYear,
              ),
            ),
            SizedBox(height: 16),

            // Date chips
            if (sortedDates.isNotEmpty)
              Container(
                height: 50,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: sortedDates.length,
                  itemBuilder: (context, index) {
                    final date = sortedDates[index];
                    final isSelected = _selectedDate != null &&
                        date.month == _selectedDate!.month &&
                        date.day == _selectedDate!.day;
                    final monthName = DateFormat.MMM(locale).format(date);
                    final day = date.day.toString();

                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChip(
                        selected: isSelected,
                        label: Text('$monthName $day'),
                        onSelected: (bool selected) {
                          _handleDateChipTap(date, isSelected);
                        },
                      ),
                    );
                  },
                ),
              ),

            SizedBox(height: 16),

            // Reports list
            if (displayedReports.isEmpty)
              Center(
                child: Text(AppLocalizations.of(context)!.noReportsFound),
              )
            else
              ...displayedReports.map((report) => ReportCard(report: report)),
          ],
        ),
      ),
    );
  }
}
