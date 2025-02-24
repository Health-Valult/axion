import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/report.dart';
import 'package:flutter_application_1/widgets/report_card.dart';
import 'package:flutter_application_1/pages/downloaded_reports_page.dart';

class ReportsPage extends StatefulWidget {
  const ReportsPage({super.key});

  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> {
  // State fields
  int _selectedYear = 2024;
  DateTime? _selectedDate; // null => show all for the year

  // Example data
  final List<Report> _allReports = [
    Report(
      id: 'r1',
      dateTime: DateTime(2024, 11, 14, 13, 30),
      status: 'Verified',
      title: 'CBC Report 1',
      placeholderImageUrl:
          'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
      details: 'Detailed CBC report from Nov 14, 13:30.',
    ),
    Report(
      id: 'r2',
      dateTime: DateTime(2024, 11, 18, 13, 35),
      status: 'Verified',
      title: 'CBC Report 2',
      placeholderImageUrl:
          'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
      details: 'Detailed CBC report from Nov 18, 13:35.',
    ),
    Report(
      id: 'r3',
      dateTime: DateTime(2024, 11, 23, 13, 44),
      status: 'Verified',
      title: 'CBC Report 3',
      placeholderImageUrl:
          'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
      details: 'Detailed CBC report from Nov 23, 13:44.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final sortedDates = _getDatesInYear();
    final displayedReports = _getDisplayedReports();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF1A1A1A),
        title: const Text('My Reports'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.download_outlined),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const DownloadedReportsPage(),
                ),
              );
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 120),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top row: YEAR + SELECT DATE
              Container(
                padding: const EdgeInsets.symmetric(vertical: 8),
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: const Color(0xFF1A1A1A),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Year pill
                    InkWell(
                      onTap: _pickYear,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        margin: const EdgeInsets.only(left: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF1A1A1A),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text('$_selectedYear', style: const TextStyle(color: Colors.white)),
                      ),
                    ),
                    // "Select Date" pill with optional clear icon
                    InkWell(
                      onTap: _pickDate,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        margin: const EdgeInsets.only(right: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF1A1A1A),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              _selectedDate == null
                                  ? 'Select Date'
                                  : '${_selectedDate!.month.toString().padLeft(2, '0')}/${_selectedDate!.day.toString().padLeft(2, '0')}',
                              style: const TextStyle(color: Colors.white),
                            ),
                            if (_selectedDate != null)
                              GestureDetector(
                                onTap: () {
                                  setState(() => _selectedDate = null);
                                },
                                child: const Padding(
                                  padding: EdgeInsets.only(left: 8),
                                  child: Icon(Icons.close, size: 16, color: Colors.white),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              // Display sorted dates if available
              if (sortedDates.isNotEmpty)
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: sortedDates.map((date) {
                      final isSelected = (_selectedDate != null &&
                          date.month == _selectedDate!.month &&
                          date.day == _selectedDate!.day);
                      final monthNames = [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                      ];
                      final monthName = monthNames[date.month - 1];
                      final day = date.day.toString();
                      return GestureDetector(
                        onTap: () => _handleDateChipTap(date, isSelected),
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 6, vertical: 8),
                          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                          decoration: BoxDecoration(
                            color: isSelected ? Colors.deepOrange : const Color(0xFF1A1A1A),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text('$monthName $day', style: const TextStyle(color: Colors.white)),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              const SizedBox(height: 16),
              // If no reports found for a selected date
              if (displayedReports.isEmpty && sortedDates.isNotEmpty)
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1A1A1A),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Center(child: Text('No reports for selected date', style: TextStyle(color: Colors.white))),
                ),
              // List of ReportCards
              ...displayedReports.map((r) => ReportCard(report: r)),
            ],
          ),
        ),
      ),
    );
  }

  List<DateTime> _getDatesInYear() {
    final yearReports = _allReports.where((r) => r.dateTime.year == _selectedYear);
    final uniqueDates = <DateTime>{};
    for (final r in yearReports) {
      uniqueDates.add(DateTime(r.dateTime.year, r.dateTime.month, r.dateTime.day));
    }
    final sortedDates = uniqueDates.toList()..sort((a, b) => a.compareTo(b));
    return sortedDates;
  }

  List<Report> _getDisplayedReports() {
    final yearReports = _allReports.where((r) => r.dateTime.year == _selectedYear).toList();
    if (_selectedDate == null) {
      return yearReports;
    }
    return yearReports.where((r) {
      return (r.dateTime.month == _selectedDate!.month &&
          r.dateTime.day == _selectedDate!.day);
    }).toList();
  }

  void _handleDateChipTap(DateTime date, bool isSelected) {
    setState(() {
      if (isSelected) {
        _selectedDate = null;
      } else {
        _selectedDate = date;
      }
    });
  }

  Future<void> _pickYear() async {
    final startYear = 2020;
    final endYear = 2030;
    final years = List.generate(endYear - startYear + 1, (i) => startYear + i);
    await showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1A1A1A),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) {
        return SizedBox(
          height: 300,
          child: ListView.builder(
            itemCount: years.length,
            itemBuilder: (ctx, index) {
              final year = years[index];
              return ListTile(
                title: Text(year.toString(), style: const TextStyle(color: Colors.white)),
                onTap: () {
                  setState(() {
                    _selectedYear = year;
                    _selectedDate = null;
                  });
                  Navigator.pop(context);
                },
              );
            },
          ),
        );
      },
    );
  }

  Future<void> _pickDate() async {
    final initDate = _selectedDate ?? DateTime(_selectedYear, 1, 1);
    final firstDate = DateTime(_selectedYear, 1, 1);
    final lastDate = DateTime(_selectedYear, 12, 31);
    final pickedDate = await showDatePicker(
      context: context,
      initialDate: initDate,
      firstDate: firstDate,
      lastDate: lastDate,
      builder: (ctx, child) {
        return Theme(
          data: ThemeData.dark(),
          child: child ?? const SizedBox(),
        );
      },
    );
    if (pickedDate != null) {
      setState(() {
        _selectedDate = pickedDate;
      });
    }
  }
}
