// lib/pages/report_detail_page.dart
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../models/base_report.dart';
import '../models/cbc_report.dart';
import '../models/serum_chloride_report.dart';
import '../models/serum_sodium_report.dart';
import '../models/hba1c_report.dart';
import '../models/serum_potassium_report.dart';
import '../models/lipid_profile_report.dart';
import '../models/liver_function_test_report.dart';
import '../models/thyroid_function_test_report.dart';
import '../models/crp_report.dart';
import '../models/serum_creatinine_report.dart';

class ReportDetailPage extends StatelessWidget {
  final BaseReport report;
  const ReportDetailPage({Key? key, required this.report}) : super(key: key);

  Widget _buildPatientInfo(BaseReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Patient Name: ${report.patientName}"),
        Text("Referred By: ${report.referredBy}"),
        Text("Age / Sex: ${report.ageSex}"),
        Text(
          "Date: ${report.dateTime.month.toString().padLeft(2, '0')}/${report.dateTime.day.toString().padLeft(2, '0')}/${report.dateTime.year}",
        ),
        Text("Investigations: ${report.investigations}"),
        Text("Daily Case Number: ${report.dailyCaseNumber}"),
        Text("Patient ID: ${report.patientID}"),
      ],
    );
  }

  Widget _buildTableCell(String text) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text(text, style: const TextStyle(fontSize: 14)),
    );
  }

  Widget _buildSerumChlorideContent(SerumChlorideReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Chloride"),
              _buildTableCell(report.chlorideValue),
              _buildTableCell(report.unit),
              _buildTableCell(report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildSerumSodiumContent(SerumSodiumReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Sodium"),
              _buildTableCell(report.sodiumValue),
              _buildTableCell(report.unit),
              _buildTableCell(report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildHBA1cContent(HBA1cReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("HbA1c"),
              _buildTableCell(report.hba1cValue),
              _buildTableCell(report.unit),
              _buildTableCell(report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildSerumPotassiumContent(SerumPotassiumReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Potassium"),
              _buildTableCell(report.potassiumValue),
              _buildTableCell(report.unit),
              _buildTableCell(report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildLipidProfileContent(LipidProfileReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("LIPID PROFILE",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("Total Cholesterol"),
              _buildTableCell(report.totalCholesterol),
              _buildTableCell("mg/dl"),
              _buildTableCell("125 - 200"),
            ]),
            TableRow(children: [
              _buildTableCell("Triglycerides"),
              _buildTableCell(report.triglycerides),
              _buildTableCell("mg/dl"),
              _buildTableCell("25 - 200"),
            ]),
            TableRow(children: [
              _buildTableCell("HDL Cholesterol"),
              _buildTableCell(report.hdl),
              _buildTableCell("mg/dl"),
              _buildTableCell("35 - 80"),
            ]),
            TableRow(children: [
              _buildTableCell("LDL Cholesterol"),
              _buildTableCell(report.ldl),
              _buildTableCell("mg/dl"),
              _buildTableCell("85 - 130"),
            ]),
            TableRow(children: [
              _buildTableCell("VLDL Cholesterol"),
              _buildTableCell(report.vldl),
              _buildTableCell("mg/dl"),
              _buildTableCell("5 - 40"),
            ]),
            TableRow(children: [
              _buildTableCell("LDL/HDL Ratio"),
              _buildTableCell(report.ldlHdlRatio),
              _buildTableCell(""),
              _buildTableCell("1.5 - 3.5"),
            ]),
            TableRow(children: [
              _buildTableCell("Total Cholesterol/HDL Ratio"),
              _buildTableCell(report.totalCholesterolHdlRatio),
              _buildTableCell(""),
              _buildTableCell("3.5 - 5"),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildLiverFunctionTestContent(LiverFunctionTestReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("LIVER FUNCTION TEST (LFT)",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Bilirubin Total"),
              _buildTableCell(report.bilirubinTotal),
              _buildTableCell("mg/dl"),
              _buildTableCell(""),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Bilirubin Direct"),
              _buildTableCell(report.bilirubinDirect),
              _buildTableCell("mg/dl"),
              _buildTableCell("0 - 0.3"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Bilirubin Indirect"),
              _buildTableCell(report.bilirubinIndirect),
              _buildTableCell("mg/dl"),
              _buildTableCell("0.2 - 1"),
            ]),
            TableRow(children: [
              _buildTableCell("SGPT (ALT)"),
              _buildTableCell(report.sgpt),
              _buildTableCell("U/I"),
              _buildTableCell("0.2 - 1"),
            ]),
            TableRow(children: [
              _buildTableCell("SGOT (AST)"),
              _buildTableCell(report.sgot),
              _buildTableCell("U/I"),
              _buildTableCell(""),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Alkaline Phosphatase"),
              _buildTableCell(report.alkalinePhosphatase),
              _buildTableCell("U/I"),
              _buildTableCell(""),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Protein"),
              _buildTableCell(report.serumProtein),
              _buildTableCell("g/dl"),
              _buildTableCell(""),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Albumin"),
              _buildTableCell(report.serumAlbumin),
              _buildTableCell("g/dl"),
              _buildTableCell(""),
            ]),
            TableRow(children: [
              _buildTableCell("Globulin"),
              _buildTableCell(report.globulin),
              _buildTableCell("g/dl"),
              _buildTableCell("1.8 - 3.6"),
            ]),
            TableRow(children: [
              _buildTableCell("A/G Ratio"),
              _buildTableCell(report.agRatio),
              _buildTableCell(""),
              _buildTableCell("1.1 - 2.1"),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildThyroidFunctionTestContent(ThyroidFunctionTestReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("THYROID FUNCTION TEST (TFT)",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Triiodothyronine (T3)"),
              _buildTableCell(report.t3),
              _buildTableCell("ng/mL"),
              _buildTableCell("0.69 - 2.15"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Thyroxine (T4)"),
              _buildTableCell(report.t4),
              _buildTableCell("ng/mL"),
              _buildTableCell("52 - 127"),
            ]),
            TableRow(children: [
              _buildTableCell("TSH"),
              _buildTableCell(report.tsh),
              _buildTableCell("µIU/mL"),
              _buildTableCell("0.3 - 4.5"),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildCRPContent(CRPReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("SEROLOGY & IMMUNOLOGY",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("C-Reactive Protein, CRP (Quantitative)"),
              _buildTableCell(report.crpQuantitative),
              _buildTableCell("mg/L"),
              _buildTableCell("< 6 mg/L"),
            ]),
            TableRow(children: [
              _buildTableCell("C-Reactive Protein, CRP (Qualitative)"),
              _buildTableCell(report.crpQualitative),
              _buildTableCell(""),
              _buildTableCell(""),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildSerumCreatinineContent(SerumCreatinineReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Colors.grey),
          children: [
            TableRow(children: [
              _buildTableCell("TEST"),
              _buildTableCell("VALUE"),
              _buildTableCell("UNIT"),
              _buildTableCell("REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell("Serum Creatinine"),
              _buildTableCell(report.creatinineValue),
              _buildTableCell(report.unit),
              _buildTableCell(report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist",
              textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildReportContent() {
    if (report is CBCReport) {
      final cbc = report as CBCReport;
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildPatientInfo(cbc),
          const SizedBox(height: 16),
          Center(
            child: Text("COMPLETE BLOOD COUNT (CBC)",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(height: 16),
          Table(
            border: TableBorder.all(color: Colors.grey),
            children: [
              TableRow(children: [
                _buildTableCell("TEST"),
                _buildTableCell("VALUE"),
                _buildTableCell("UNIT"),
                _buildTableCell("REFERENCE"),
              ]),
              ...cbc.testResults.map((test) => TableRow(children: [
                    _buildTableCell(test.testName),
                    _buildTableCell(test.value),
                    _buildTableCell(test.unit),
                    _buildTableCell(test.reference),
                  ])).toList(),
            ],
          ),
          const SizedBox(height: 16),
          Center(
            child: Text("Dr._______________\nMBBS, MD Pathologist",
                textAlign: TextAlign.center),
          ),
        ],
      );
    } else if (report is SerumChlorideReport) {
      return _buildSerumChlorideContent(report as SerumChlorideReport);
    } else if (report is SerumSodiumReport) {
      return _buildSerumSodiumContent(report as SerumSodiumReport);
    } else if (report is HBA1cReport) {
      return _buildHBA1cContent(report as HBA1cReport);
    } else if (report is SerumPotassiumReport) {
      return _buildSerumPotassiumContent(report as SerumPotassiumReport);
    } else if (report is LipidProfileReport) {
      return _buildLipidProfileContent(report as LipidProfileReport);
    } else if (report is LiverFunctionTestReport) {
      return _buildLiverFunctionTestContent(report as LiverFunctionTestReport);
    } else if (report is ThyroidFunctionTestReport) {
      return _buildThyroidFunctionTestContent(report as ThyroidFunctionTestReport);
    } else if (report is CRPReport) {
      return _buildCRPContent(report as CRPReport);
    } else if (report is SerumCreatinineReport) {
      return _buildSerumCreatinineContent(report as SerumCreatinineReport);
    } else {
      return const Center(child: Text("Unsupported report type"));
    }
  }

  Future<void> _downloadReport(BuildContext context) async {
    final box = Hive.box<BaseReport>('downloadedReports');
    if (box.containsKey(report.id)) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Report already downloaded')));
    } else {
      await box.put(report.id, report);
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Report downloaded successfully')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(report.title),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: _buildReportContent(),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _downloadReport(context),
        label: const Text('Download'),
        icon: const Icon(Icons.download),
      ),
    );
  }
}
