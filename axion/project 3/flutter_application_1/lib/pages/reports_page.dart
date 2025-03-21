import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../models/base_report.dart';
import '../models/report.dart';
import '../services/graphql_queries.dart';
import '../widgets/report_card.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ReportsPage extends StatefulWidget {
  const ReportsPage({Key? key}) : super(key: key);

  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> with SingleTickerProviderStateMixin {
  List<BaseReport> _reports = [];
  List<BaseReport> _filteredReports = [];
  bool _isLoading = true;
  String? _error;
  DateTime? _selectedDate;
  bool _hasInitialized = false;
  bool _isSearchVisible = false;
  late AnimationController _searchAnimationController;
  late Animation<double> _searchAnimation;
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _searchAnimationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _searchAnimation = CurvedAnimation(
      parent: _searchAnimationController,
      curve: Curves.easeInOut,
    );
    _searchController.addListener(_filterReports);
  }

  @override
  void dispose() {
    _searchAnimationController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _toggleSearch() {
    setState(() {
      _isSearchVisible = !_isSearchVisible;
      if (_isSearchVisible) {
        _searchAnimationController.forward();
      } else {
        _searchAnimationController.reverse();
        _searchController.clear();
      }
    });
  }

  void _filterReports() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      if (query.isEmpty) {
        _filteredReports = List.from(_reports);
      } else {
        _filteredReports = _reports.where((report) {
          return report.title.toLowerCase().contains(query);
        }).toList();
      }
      
      // Apply date filter if selected
      if (_selectedDate != null) {
        _filteredReports = _filteredReports.where((report) =>
          report.dateTime.year == _selectedDate!.year &&
          report.dateTime.month == _selectedDate!.month &&
          report.dateTime.day == _selectedDate!.day
        ).toList();
      }
    });
  }

  void _updateDateFilter(DateTime? date) {
    setState(() {
      _selectedDate = date;
      _filterReports(); // Re-apply filters
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_hasInitialized) {
      _fetchReports();
      _hasInitialized = true;
    }
  }

  Future<void> _fetchReports() async {
    if (!mounted) return;
    
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      print('\n=== Fetching Lab Reports ===');
      final client = GraphQLProvider.of(context).value;
      final labsResult = await client.query(
        QueryOptions(
          document: gql(GraphQLQueries.getLabs),
          fetchPolicy: FetchPolicy.noCache,
        ),
      );

      if (!mounted) return;

      if (labsResult.hasException) {
        print('\n❌ Labs Query Failed');
        final error = labsResult.exception!;
        print('Error Type: ${error.runtimeType}');
        
        if (error.linkException != null) {
          print('Link Exception: ${error.linkException}');
          print('Server Response: ${error.linkException?.originalException}');
          print('Status Code: ${error.linkException?.originalStackTrace}');
          print('Message: ${error.graphqlErrors.map((e) => e.message).join(", ")}');
        }
        print('❌ GraphQL Error: $error');
        throw error;
      }

      print('\n✅ Labs Query Successful');
      print('Response Data:');
      print(labsResult.data);

      final labsData = labsResult.data;
      if (labsData == null) {
        throw Exception('No data received from server');
      }

      final labsMap = labsData['Labs'] as Map<String, dynamic>?;
      if (labsMap == null) {
        throw Exception('Invalid response format: missing Labs field');
      }

      final labsList = labsMap['labs'] as List<dynamic>?;
      if (labsList == null) {
        throw Exception('Invalid response format: missing labs list');
      }

      final reports = labsList.map((lab) {
        // Safely extract and validate required fields
        final id = lab['id'] as String?;
        if (id == null) throw Exception('Lab missing required field: id');

        final timestamp = lab['timestamp'] as String?;
        if (timestamp == null) throw Exception('Lab missing required field: timestamp');

        final dateTime = DateTime.tryParse(timestamp);
        if (dateTime == null) throw Exception('Invalid timestamp format: $timestamp');

        return Report(
          id: id,
          dateTime: dateTime,
          code: lab['code'] as String? ?? '',
          display: lab['display'] as String? ?? 'Unknown Test',
          meta: lab['meta'] as Map<String, dynamic>? ?? {},
          observations: [],
        );
      }).toList();

      if (!mounted) return;

      setState(() {
        _reports = reports;
        _filteredReports = reports;
        _isLoading = false;
        _error = null;
      });

      print('\nProcessed ${reports.length} reports successfully');
    } catch (e) {
      if (!mounted) return;
      
      print('\n❌ Error fetching reports: $e');
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final appLocalizations = AppLocalizations.of(context)!;
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final cardColor = isDarkMode ? Colors.grey[850]! : Colors.white;
    final textColor = isDarkMode ? Colors.white : Colors.black87;
    final subtleColor = isDarkMode ? Colors.grey[400] : Colors.grey[600];

    return Scaffold(
      body: _isLoading
          ? Center(child: CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
            ))
          : _error != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('Error: $_error'),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.grey[300],
                        ),
                        onPressed: _fetchReports,
                        child: Text('Retry', 
                          style: TextStyle(color: Colors.grey[800]),
                        ),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  color: Colors.blue,
                  onRefresh: _fetchReports,
                  child: SafeArea(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
                          child: Column(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                                decoration: BoxDecoration(
                                  color: cardColor,
                                  borderRadius: BorderRadius.circular(30),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black.withOpacity(0.05),
                                      blurRadius: 10,
                                      offset: const Offset(0, 2),
                                    ),
                                  ],
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Material(
                                      color: Colors.transparent,
                                      child: IconButton(
                                        icon: Icon(Icons.calendar_today, 
                                          size: 22,
                                          color: subtleColor,
                                        ),
                                        padding: const EdgeInsets.all(12),
                                        onPressed: () async {
                                          final DateTime? picked = await showDatePicker(
                                            context: context,
                                            initialDate: _selectedDate ?? DateTime.now(),
                                            firstDate: DateTime(2000),
                                            lastDate: DateTime.now(),
                                          );
                                          if (picked != null) {
                                            _updateDateFilter(picked);
                                          }
                                        },
                                      ),
                                    ),
                                    Expanded(
                                      child: Text(
                                        appLocalizations.reports,
                                        textAlign: TextAlign.center,
                                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                              color: textColor,
                                              fontWeight: FontWeight.bold,
                                            ),
                                      ),
                                    ),
                                    Material(
                                      color: Colors.transparent,
                                      child: IconButton(
                                        icon: AnimatedIcon(
                                          icon: AnimatedIcons.menu_close,
                                          progress: _searchAnimation,
                                          color: subtleColor,
                                        ),
                                        padding: const EdgeInsets.all(12),
                                        onPressed: _toggleSearch,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              SizeTransition(
                                sizeFactor: _searchAnimation,
                                child: Container(
                                  margin: const EdgeInsets.only(top: 8),
                                  padding: const EdgeInsets.symmetric(horizontal: 16),
                                  decoration: BoxDecoration(
                                    color: cardColor,
                                    borderRadius: BorderRadius.circular(30),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.05),
                                        blurRadius: 10,
                                        offset: const Offset(0, 2),
                                      ),
                                    ],
                                  ),
                                  child: TextField(
                                    controller: _searchController,
                                    decoration: InputDecoration(
                                      hintText: 'Search reports...',
                                      border: InputBorder.none,
                                      hintStyle: TextStyle(color: textColor.withOpacity(0.5)),
                                      prefixIcon: Icon(Icons.search, color: subtleColor),
                                    ),
                                    style: TextStyle(color: textColor),
                                  ),
                                ),
                              ),
                              if (_selectedDate != null)
                                Padding(
                                  padding: const EdgeInsets.only(top: 8),
                                  child: Chip(
                                    label: Text(
                                      'Date: ${_selectedDate!.day}/${_selectedDate!.month}/${_selectedDate!.year}',
                                      style: TextStyle(color: isDarkMode ? Colors.white : Colors.black87),
                                    ),
                                    onDeleted: () => _updateDateFilter(null),
                                    backgroundColor: Colors.grey.withOpacity(0.1),
                                    deleteIconColor: subtleColor,
                                  ),
                                ),
                            ],
                          ),
                        ),
                        Expanded(
                          child: _filteredReports.isEmpty
                              ? Center(
                                  child: Text(
                                    'No reports found',
                                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                          color: textColor.withOpacity(0.6),
                                        ),
                                  ),
                                )
                              : ListView.builder(
                                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 120),
                                  itemCount: _filteredReports.length,
                                  itemBuilder: (context, index) {
                                    return ReportCard(report: _filteredReports[index]);
                                  },
                                ),
                        ),
                      ],
                    ),
                  ),
                ),
    );
  }
}
