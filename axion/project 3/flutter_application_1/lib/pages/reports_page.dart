// lib/pages/reports_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/models/report_parser.dart';
import 'package:flutter_application_1/pages/downloaded_reports_page.dart';
import 'package:flutter_application_1/widgets/report_card.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:intl/intl.dart';

class ReportsPage extends StatefulWidget {
  const ReportsPage({Key? key}) : super(key: key);
  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> {
  int _selectedYear = 2024;
  DateTime? _selectedDate;
  
  // 13 sample JSON reports
  final List<Map<String, dynamic>> jsonReports = [
    // CBC Report
    {
      "id": "r1",
      "reportType": "cbc",
      "dateTime": "2024-10-14T13:40:00",
      "title": "CBC Report 1",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image1.jpg",
      "patientName": "John Doe",
      "referredBy": "Dr. Smith",
      "ageSex": "30/M",
      "investigations": "Blood Test",
      "dailyCaseNumber": "12345",
      "patientID": "P001",
      "testResults": [
        {"testName": "Hemoglobin", "value": "14", "unit": "g/dl", "reference": "12 - 15"},
        {"testName": "Total Leukocyte Count", "value": "8000", "unit": "cumm", "reference": "4800 - 10800"},
      ],
    },
    // Serum Chloride Report
    {
      "id": "r2",
      "reportType": "serumChloride",
      "dateTime": "2024-11-15T10:20:00",
      "title": "Serum Chloride Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image2.jpg",
      "patientName": "Jane Smith",
      "referredBy": "Dr. Adams",
      "ageSex": "25/F",
      "investigations": "Electrolyte Panel",
      "dailyCaseNumber": "12346",
      "patientID": "P002",
      "chlorideValue": "102",
      "unit": "mmol/l",
      "reference": "98 - 107",
    },
    // Serum Sodium Report
    {
      "id": "r3",
      "reportType": "serumSodium",
      "dateTime": "2024-11-16T11:00:00",
      "title": "Serum Sodium Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image3.jpg",
      "patientName": "Alice Brown",
      "referredBy": "Dr. Clark",
      "ageSex": "40/F",
      "investigations": "Electrolyte Panel",
      "dailyCaseNumber": "12347",
      "patientID": "P003",
      "sodiumValue": "140",
      "unit": "mmol/L",
      "reference": "136 - 146",
    },
    // HBA1c Report
    {
      "id": "r4",
      "reportType": "hba1c",
      "dateTime": "2024-11-17T09:15:00",
      "title": "HbA1c Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image4.jpg",
      "patientName": "Bob Lee",
      "referredBy": "Dr. Johnson",
      "ageSex": "55/M",
      "investigations": "Blood Sugar",
      "dailyCaseNumber": "12348",
      "patientID": "P004",
      "hba1cValue": "6.5",
      "unit": "%",
      "reference": "4.0 - 6.0",
    },
    // Serum Potassium Report
    {
      "id": "r5",
      "reportType": "serumPotassium",
      "dateTime": "2024-11-18T14:45:00",
      "title": "Serum Potassium Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image5.jpg",
      "patientName": "Charlie Green",
      "referredBy": "Dr. Williams",
      "ageSex": "35/M",
      "investigations": "Electrolyte Panel",
      "dailyCaseNumber": "12349",
      "patientID": "P005",
      "potassiumValue": "4.2",
      "unit": "mmol/L",
      "reference": "3.5 - 5.1",
    },
    // Lipid Profile Report
    {
      "id": "r6",
      "reportType": "lipidProfile",
      "dateTime": "2024-11-19T08:30:00",
      "title": "Lipid Profile Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image6.jpg",
      "patientName": "Diana Prince",
      "referredBy": "Dr. Wayne",
      "ageSex": "28/F",
      "investigations": "Cholesterol Test",
      "dailyCaseNumber": "12350",
      "patientID": "P006",
      "totalCholesterol": "180",
      "triglycerides": "150",
      "hdl": "50",
      "ldl": "100",
      "vldl": "30",
      "ldlHdlRatio": "2",
      "totalCholesterolHdlRatio": "3.6",
    },
    // Liver Function Test Report
    {
      "id": "r7",
      "reportType": "liverFunctionTest",
      "dateTime": "2024-11-20T12:00:00",
      "title": "Liver Function Test Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image7.jpg",
      "patientName": "Edward Norton",
      "referredBy": "Dr. Banner",
      "ageSex": "45/M",
      "investigations": "Liver Panel",
      "dailyCaseNumber": "12351",
      "patientID": "P007",
      "bilirubinTotal": "1.0",
      "bilirubinDirect": "0.2",
      "bilirubinIndirect": "0.8",
      "sgpt": "30",
      "sgot": "28",
      "alkalinePhosphatase": "100",
      "serumProtein": "7",
      "serumAlbumin": "4",
      "globulin": "3",
      "agRatio": "1.33",
    },
    // Thyroid Function Test Report
    {
      "id": "r8",
      "reportType": "thyroidFunctionTest",
      "dateTime": "2024-11-21T10:10:00",
      "title": "Thyroid Function Test Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image8.jpg",
      "patientName": "Fiona Apple",
      "referredBy": "Dr. Cox",
      "ageSex": "32/F",
      "investigations": "Thyroid Panel",
      "dailyCaseNumber": "12352",
      "patientID": "P008",
      "t3": "1.5",
      "t4": "90",
      "tsh": "2.5",
    },
    // CRP Report
    {
      "id": "r9",
      "reportType": "crp",
      "dateTime": "2024-11-22T15:30:00",
      "title": "CRP Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image9.jpg",
      "patientName": "George Michael",
      "referredBy": "Dr. Brown",
      "ageSex": "50/M",
      "investigations": "Inflammation Marker",
      "dailyCaseNumber": "12353",
      "patientID": "P009",
      "crpQuantitative": "5",
      "crpQualitative": "Positive",
    },
    // Serum Creatinine Report
    {
      "id": "r10",
      "reportType": "serumCreatinine",
      "dateTime": "2024-11-23T11:50:00",
      "title": "Serum Creatinine Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image10.jpg",
      "patientName": "Hannah Montana",
      "referredBy": "Dr. Carter",
      "ageSex": "22/F",
      "investigations": "Kidney Function",
      "dailyCaseNumber": "12354",
      "patientID": "P010",
      "creatinineValue": "0.9",
      "unit": "mg/dl",
      "reference": "0.6 - 1.2",
    },
    // ESR Wintrobe Report (New)
    {
      "id": "r11",
      "reportType": "esrWintrobe",
      "dateTime": "2024-11-24T10:00:00",
      "title": "ESR (Wintrobe) Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image11.jpg",
      "patientName": "Ivan Ivanov",
      "referredBy": "Dr. Petrova",
      "ageSex": "40/M",
      "investigations": "Haematology",
      "dailyCaseNumber": "12355",
      "patientID": "P011",
      "esrValue": "15",
      "unit": "mm for 1st hour",
      "reference": "0 - 20",
    },
    // ESR Westergren Report (New)
    {
      "id": "r12",
      "reportType": "esrWestergren",
      "dateTime": "2024-11-25T11:00:00",
      "title": "ESR (Westergren) Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image12.jpg",
      "patientName": "Olga Petrova",
      "referredBy": "Dr. Ivanov",
      "ageSex": "35/F",
      "investigations": "Haematology",
      "dailyCaseNumber": "12356",
      "patientID": "P012",
      "esrValue": "8",
      "unit": "mm for 1st hour",
      "reference": "0 - 10",
    },
    // Urine Routine Report (New)
    {
      "id": "r13",
      "reportType": "urineRoutine",
      "dateTime": "2024-11-26T08:45:00",
      "title": "Urine Routine Report",
      "status": "Verified",
      "placeholderImageUrl": "https://example.com/image13.jpg",
      "patientName": "Vladimir Kuznetsov",
      "referredBy": "Dr. Sidorov",
      "ageSex": "50/M",
      "investigations": "Urine Examination",
      "dailyCaseNumber": "12357",
      "patientID": "P013",
      "physicalQuantity": "50 ml",
      "physicalColour": "Pale Yellow",
      "physicalTransparency": "Clear",
      "specificGravity": "1.010",
      "pH": "6",
      "chemicalProtein": "Absent",
      "chemicalSugar": "Absent",
      "chemicalKetoneBodies": "Absent",
      "chemicalBilirubin": "Absent",
      "microscopicRBC": "Absent",
      "microscopicPusCells": "Absent",
      "microscopicEpithelialCells": "Absent",
      "microscopicCasts": "Absent",
      "microscopicCrystals": "Absent",
      "microscopicBacteria": "Absent",
    },
  ];
  
  late List<BaseReport> allReports;
  
  @override
  void initState() {
    super.initState();
    allReports = jsonReports.map((json) => parseReportFromJson(json)).toList();
  }
  
  List<DateTime> _getDatesInYear() {
    final yearReports = allReports.where((r) => r.dateTime.year == _selectedYear);
    final uniqueDates = <DateTime>{};
    for (final r in yearReports) {
      uniqueDates.add(DateTime(r.dateTime.year, r.dateTime.month, r.dateTime.day));
    }
    final sortedDates = uniqueDates.toList()..sort((a, b) => a.compareTo(b));
    return sortedDates;
  }
  
  List<BaseReport> _getDisplayedReports() {
    final yearReports = allReports.where((r) => r.dateTime.year == _selectedYear).toList();
    if (_selectedDate == null) return yearReports;
    return yearReports.where((r) =>
      r.dateTime.month == _selectedDate!.month &&
      r.dateTime.day == _selectedDate!.day
    ).toList();
  }
  
  void _handleDateChipTap(DateTime date, bool isSelected) {
    setState(() {
      _selectedDate = isSelected ? null : date;
    });
  }
  
  Future<void> _pickYear() async {
    final startYear = 2020;
    final endYear = 2030;
    final years = List.generate(endYear - startYear + 1, (i) => startYear + i);
    // Use the current theme's cardColor for modal background.
    final cardColor = Theme.of(context).cardColor;
    final textColor = Theme.of(context).brightness == Brightness.dark ? Colors.white : Colors.black;
    
    await showModalBottomSheet(
      context: context,
      backgroundColor: cardColor,
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
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: textColor),
                ),
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
        // Use the dark theme for the date picker if desired, or you could use Theme.of(context) for consistency.
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
  
  @override
  Widget build(BuildContext context) {
    // Define card color and text color based on the current theme.
    final cardColor = Theme.of(context).cardColor;
    final textColor = Theme.of(context).brightness == Brightness.dark ? Colors.white : Colors.black;
    
    final sortedDates = _getDatesInYear();
    final displayedReports = _getDisplayedReports();
    
    // Use the current locale for month abbreviations
    final locale = Localizations.localeOf(context).toString();
    
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.myReports),
        centerTitle: true,
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
                  color: cardColor,
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
                          color: cardColor,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          '$_selectedYear',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: textColor),
                        ),
                      ),
                    ),
                    // "Select Date" pill with optional clear icon
                    InkWell(
                      onTap: _pickDate,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        margin: const EdgeInsets.only(right: 8),
                        decoration: BoxDecoration(
                          color: cardColor,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              _selectedDate == null
                                  ? AppLocalizations.of(context)!.selectDate
                                  : DateFormat('MM/dd').format(_selectedDate!),
                              style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: textColor),
                            ),
                            if (_selectedDate != null)
                              GestureDetector(
                                onTap: () {
                                  setState(() => _selectedDate = null);
                                },
                                child: Padding(
                                  padding: const EdgeInsets.only(left: 8),
                                  child: Icon(Icons.close, size: 16, color: textColor),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              // Display sorted dates as horizontal chips
              if (sortedDates.isNotEmpty)
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: sortedDates.map((date) {
                      final isSelected = _selectedDate != null &&
                          date.month == _selectedDate!.month &&
                          date.day == _selectedDate!.day;
                      // Use DateFormat.MMM with the current locale for localized month names.
                      final monthName = DateFormat.MMM(locale).format(date);
                      final day = date.day.toString();
                      return GestureDetector(
                        onTap: () => _handleDateChipTap(date, isSelected),
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 6, vertical: 8),
                          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                          decoration: BoxDecoration(
                            color: isSelected ? Colors.deepOrange : cardColor,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            '$monthName $day',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: textColor),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              const SizedBox(height: 16),
              // If no reports found for selected date
              if (displayedReports.isEmpty && sortedDates.isNotEmpty)
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(
                      AppLocalizations.of(context)!.noReportsForDate,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: textColor),
                    ),
                  ),
                ),
              // List of ReportCards
              ...displayedReports.map((r) => ReportCard(report: r)),
            ],
          ),
        ),
      ),
    );
  }
}
