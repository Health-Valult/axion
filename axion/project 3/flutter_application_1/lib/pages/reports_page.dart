import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/report.dart';
import 'package:flutter_application_1/pages/report_detail_page.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';


class ReportsPage extends StatefulWidget {
  const ReportsPage({super.key});

  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> {
  // ---------------------------------------------------------------------------
  // State fields
  // ---------------------------------------------------------------------------
  int _selectedYear = 2024;
  DateTime? _selectedDate; // null => show all for the year

  // ---------------------------------------------------------------------------
  // Example data
  // ---------------------------------------------------------------------------
  final List<Report> _allReports = [
    Report(
      id: 'r1',
      dateTime: DateTime(2024, 11, 14, 13, 30),
      status: 'Verified',
      title: 'CBC',
      placeholderImageUrl:
          'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
      details: 'Detailed CBC report from Nov 14, 13:30.',
    ),
    Report(
      id: 'r2',
      dateTime: DateTime(2024, 11, 18, 13, 35),
      status: 'Verified',
      title: 'CBC',
      placeholderImageUrl:
          'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
      details: 'Detailed CBC report from Nov 18, 13:35.',
    ),
    Report(
      id: 'r3',
      dateTime: DateTime(2024, 11, 23, 13, 44),
      status: 'Verified',
      title: 'CBC',
      placeholderImageUrl:
          'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
      details: 'Detailed CBC report from Nov 23, 13:44.',
    ),
  ];

  // ---------------------------------------------------------------------------
  // Build method
  // ---------------------------------------------------------------------------
  @override
  Widget build(BuildContext context) {
     final loc = AppLocalizations.of(context)!;
    final sortedDates = getDatesInYear();
    final displayedReports = getDisplayedReports();

    return Scaffold(
      
      appBar: AppBar(
        backgroundColor:Theme.of(context).cardColor,
        title: Text(loc.myReports),
        centerTitle: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(12.0), // Adjust the radius as needed
          ),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 120),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // -----------------------------------------------------------------
              // Top row: YEAR + SELECT DATE
              // -----------------------------------------------------------------
              Container(
                padding: const EdgeInsets.symmetric(vertical: 8),
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Theme.of(context).cardColor,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Year pill
                    InkWell(
                      onTap: _pickYear,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        margin: const EdgeInsets.only(left: 8),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          '$_selectedYear',
                          
                        ),
                      ),
                    ),
                    // "Select Date" pill with optional clear icon
                    InkWell(
                      onTap: _pickDate,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        margin: const EdgeInsets.only(right: 8),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              _selectedDate == null
                                  ? loc.selectDate
                                  : '${_selectedDate!.month.toString().padLeft(2, '0')}/'
                                    '${_selectedDate!.day.toString().padLeft(2, '0')}',
                              
                            ),

                            // Show a small 'clear' icon only if a date is selected
                            if (_selectedDate != null)
                              GestureDetector(
                                onTap: () {
                                  // Clear the date filter
                                  setState(() => _selectedDate = null);
                                },
                                child: Padding(
                                  padding: const EdgeInsets.only(left: 8),
                                  child: Icon(
                                    Icons.close,
                                    size: 16,
                                    
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // -----------------------------------------------------------------
              // If no reports for this year
              // -----------------------------------------------------------------
               if (sortedDates.isEmpty)
                Text(loc.noReportsForYear)
              else
                Text(
                  loc.recentReports,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),

              // -----------------------------------------------------------------
              // Horizontal scroll of date chips
              // -----------------------------------------------------------------
              if (sortedDates.isNotEmpty)
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: sortedDates.map((date) {
                      final isSelected = (_selectedDate != null &&
                          date.month == _selectedDate!.month &&
                          date.day == _selectedDate!.day);

                      // e.g. "Nov 14"
                      final monthNames = [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                      ];
                      final monthName = monthNames[date.month - 1];
                      final day = date.day.toString();

                      return GestureDetector(
                        onTap: () => _handleDateChipTap(date, isSelected),
                        child: Container(
                          margin: const EdgeInsets.symmetric(
                              horizontal: 6, vertical: 8),
                          padding: const EdgeInsets.symmetric(
                              vertical: 8, horizontal: 12),
                          decoration: BoxDecoration(
                            color: isSelected ? Colors.deepOrange : Theme.of(context).cardColor,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text('$monthName $day'),
                        ),
                      );
                    }).toList(),
                  ),
                ),

              const SizedBox(height: 16),

              // -----------------------------------------------------------------
              // If user selected a date but there's no reports
              // -----------------------------------------------------------------
              if (displayedReports.isEmpty && sortedDates.isNotEmpty)
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(loc.noReportsForDate),
                  ),
                ),

              // -----------------------------------------------------------------
              // Render the actual reports
              // -----------------------------------------------------------------
              ...displayedReports.map(
                (r) => _buildReportCard(context, r),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ---------------------------------------------------------------------------
  // Helper: Return all the dates (day-level) for a given year
  // ---------------------------------------------------------------------------
  List<DateTime> getDatesInYear() {
    final yearReports =
        _allReports.where((r) => r.dateTime.year == _selectedYear);
    final uniqueDates = <DateTime>{};
    for (final r in yearReports) {
      uniqueDates.add(DateTime(r.dateTime.year, r.dateTime.month, r.dateTime.day));
    }
    final sortedDates = uniqueDates.toList()..sort((a, b) => a.compareTo(b));
    return sortedDates;
  }

  // ---------------------------------------------------------------------------
  // Helper: Return the filtered list of reports
  // ---------------------------------------------------------------------------
  List<Report> getDisplayedReports() {
    // All reports for the selected year
    final yearReports =
        _allReports.where((r) => r.dateTime.year == _selectedYear).toList();

    if (_selectedDate == null) {
      return yearReports; // no date filter
    }
    // Return only those matching the chosen date
    return yearReports.where((r) {
      return (r.dateTime.month == _selectedDate!.month &&
          r.dateTime.day == _selectedDate!.day);
    }).toList();
  }

  // ---------------------------------------------------------------------------
  // No reports popup
  // ---------------------------------------------------------------------------
  void _showNoReportsPopup() {
    final loc = AppLocalizations.of(context)!;

    showDialog(
      context: context,
      builder: (_) {
        return AlertDialog(
          backgroundColor: Theme.of(context).cardColor,
          title: Text(loc.noReportsFound), // Localized title
          content: Text(loc.noReportsForDate), // Localized content
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text(loc.ok), // Localized OK button
            ),
          ],
        );
      },
    );
  }


  // ---------------------------------------------------------------------------
  // Tapping a date chip
  // ---------------------------------------------------------------------------
  void _handleDateChipTap(DateTime date, bool isSelected) {
    setState(() {
      if (isSelected) {
        // If the user taps the same date chip again, clear the filter
        _selectedDate = null;
      } else {
        _selectedDate = date;
        // Check if that date has no reports
        final dayReports = getDisplayedReports();
        if (dayReports.isEmpty) {
          _showNoReportsPopup();
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Tapping the "year" pill
  // ---------------------------------------------------------------------------
  Future<void> _pickYear() async {
    final startYear = 2020;
    final endYear = 2030;
    final years = List.generate(endYear - startYear + 1, (i) => startYear + i);

    await showModalBottomSheet(
      context: context,
      backgroundColor: Theme.of(context).cardColor,
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
                title: Text(
                  year.toString(),
                  
                ),
                onTap: () {
                  setState(() {
                    _selectedYear = year;
                    _selectedDate = null; // clear date filter
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

  // ---------------------------------------------------------------------------
  // Tapping the "Select Date" pill
  // ---------------------------------------------------------------------------
  Future<void> _pickDate() async {
    // If no date is set, default to 1st of the chosen year
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
          data: ThemeData.dark().copyWith(
            colorScheme: const ColorScheme.dark(
              primary: Colors.blue,
              onPrimary: Colors.white,
              surface: Colors.grey,
              onSurface: Colors.white,
            ),
          ),
          child: child ?? const SizedBox(),
        );
      },
    );

    if (pickedDate != null) {
      setState(() {
        _selectedDate = pickedDate;
      });
      // If no reports for that date, show popup
      final dayReports = getDisplayedReports();
      if (dayReports.isEmpty) {
        _showNoReportsPopup();
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Build a single report card
  // ---------------------------------------------------------------------------
  Widget _buildReportCard(BuildContext context, Report report) {
    final hour = report.dateTime.hour.toString().padLeft(2, '0');
    final minute = report.dateTime.minute.toString().padLeft(2, '0');
    final timeString = '$hour:$minute';

    return Card(
      color: Theme.of(context).cardColor,
      margin: const EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 2, // small shadow
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => ReportDetailPage(report: report),
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            children: [
              // Thumbnail image
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  report.placeholderImageUrl,
                  width: 60,
                  height: 60,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 12),

              // Title & status
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      report.title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          report.status,
                          style: const TextStyle(
                            color: Colors.green,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Text(
                          timeString,
                          style: const TextStyle(color: Colors.blueGrey),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
