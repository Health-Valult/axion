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
import '../models/esr_wintrobe_report.dart';
import '../models/esr_westergren_report.dart';
import '../models/urine_routine_report.dart';

class ReportDetailPage extends StatelessWidget {
  final BaseReport report;
  const ReportDetailPage({Key? key, required this.report}) : super(key: key);

  Widget _buildPatientInfo(BuildContext context, BaseReport report) {
    final textTheme = Theme.of(context).textTheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Patient Name: ${report.patientName}", style: textTheme.bodyLarge),
        Text("Referred By: ${report.referredBy}", style: textTheme.bodyLarge),
        Text("Age / Sex: ${report.ageSex}", style: textTheme.bodyLarge),
        Text(
          "Date: ${report.dateTime.month.toString().padLeft(2, '0')}/${report.dateTime.day.toString().padLeft(2, '0')}/${report.dateTime.year}",
          style: textTheme.bodyLarge,
        ),
        Text("Investigations: ${report.investigations}", style: textTheme.bodyLarge),
        Text("Daily Case Number: ${report.dailyCaseNumber}", style: textTheme.bodyLarge),
        Text("Patient ID: ${report.patientID}", style: textTheme.bodyLarge),
      ],
    );
  }

  Widget _buildTableCell(BuildContext context, String text) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text(text, style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontSize: 14)),
    );
  }

  // CBC Report Builder
  Widget _buildCBCContent(BuildContext context, CBCReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text(
            "COMPLETE BLOOD COUNT (CBC)",
            style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            ...report.testResults.map((test) => TableRow(children: [
                  _buildTableCell(context, test.testName),
                  _buildTableCell(context, test.value),
                  _buildTableCell(context, test.unit),
                  _buildTableCell(context, test.reference),
                ])).toList(),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildSerumChlorideContent(BuildContext context, SerumChlorideReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Chloride"),
              _buildTableCell(context, report.chlorideValue),
              _buildTableCell(context, report.unit),
              _buildTableCell(context, report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildSerumSodiumContent(BuildContext context, SerumSodiumReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Sodium"),
              _buildTableCell(context, report.sodiumValue),
              _buildTableCell(context, report.unit),
              _buildTableCell(context, report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildHBA1cContent(BuildContext context, HBA1cReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "HbA1c"),
              _buildTableCell(context, report.hba1cValue),
              _buildTableCell(context, report.unit),
              _buildTableCell(context, report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildSerumPotassiumContent(BuildContext context, SerumPotassiumReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Potassium"),
              _buildTableCell(context, report.potassiumValue),
              _buildTableCell(context, report.unit),
              _buildTableCell(context, report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildLipidProfileContent(BuildContext context, LipidProfileReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("LIPID PROFILE",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Total Cholesterol"),
              _buildTableCell(context, report.totalCholesterol),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, "125 - 200"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Triglycerides"),
              _buildTableCell(context, report.triglycerides),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, "25 - 200"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "HDL Cholesterol"),
              _buildTableCell(context, report.hdl),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, "35 - 80"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "LDL Cholesterol"),
              _buildTableCell(context, report.ldl),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, "85 - 130"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "VLDL Cholesterol"),
              _buildTableCell(context, report.vldl),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, "5 - 40"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "LDL/HDL Ratio"),
              _buildTableCell(context, report.ldlHdlRatio),
              _buildTableCell(context, ""),
              _buildTableCell(context, "1.5 - 3.5"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Total Cholesterol/HDL Ratio"),
              _buildTableCell(context, report.totalCholesterolHdlRatio),
              _buildTableCell(context, ""),
              _buildTableCell(context, "3.5 - 5"),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildLiverFunctionTestContent(BuildContext context, LiverFunctionTestReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("LIVER FUNCTION TEST (LFT)",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Bilirubin Total"),
              _buildTableCell(context, report.bilirubinTotal),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, ""),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Bilirubin Direct"),
              _buildTableCell(context, report.bilirubinDirect),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, "0 - 0.3"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Bilirubin Indirect"),
              _buildTableCell(context, report.bilirubinIndirect),
              _buildTableCell(context, "mg/dl"),
              _buildTableCell(context, "0.2 - 1"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "SGPT (ALT)"),
              _buildTableCell(context, report.sgpt),
              _buildTableCell(context, "U/I"),
              _buildTableCell(context, "0.2 - 1"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "SGOT (AST)"),
              _buildTableCell(context, report.sgot),
              _buildTableCell(context, "U/I"),
              _buildTableCell(context, ""),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Alkaline Phosphatase"),
              _buildTableCell(context, report.alkalinePhosphatase),
              _buildTableCell(context, "U/I"),
              _buildTableCell(context, ""),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Protein"),
              _buildTableCell(context, report.serumProtein),
              _buildTableCell(context, "g/dl"),
              _buildTableCell(context, ""),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Albumin"),
              _buildTableCell(context, report.serumAlbumin),
              _buildTableCell(context, "g/dl"),
              _buildTableCell(context, ""),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Globulin"),
              _buildTableCell(context, report.globulin),
              _buildTableCell(context, "g/dl"),
              _buildTableCell(context, "1.8 - 3.6"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "A/G Ratio"),
              _buildTableCell(context, report.agRatio),
              _buildTableCell(context, ""),
              _buildTableCell(context, "1.1 - 2.1"),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildThyroidFunctionTestContent(BuildContext context, ThyroidFunctionTestReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("THYROID FUNCTION TEST (TFT)",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Triiodothyronine (T3)"),
              _buildTableCell(context, report.t3),
              _buildTableCell(context, "ng/mL"),
              _buildTableCell(context, "0.69 - 2.15"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Thyroxine (T4)"),
              _buildTableCell(context, report.t4),
              _buildTableCell(context, "ng/mL"),
              _buildTableCell(context, "52 - 127"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "TSH"),
              _buildTableCell(context, report.tsh),
              _buildTableCell(context, "µIU/mL"),
              _buildTableCell(context, "0.3 - 4.5"),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildCRPContent(BuildContext context, CRPReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("SEROLOGY & IMMUNOLOGY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "C-Reactive Protein, CRP (Quantitative)"),
              _buildTableCell(context, report.crpQuantitative),
              _buildTableCell(context, "mg/L"),
              _buildTableCell(context, "< 6 mg/L"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "C-Reactive Protein, CRP (Qualitative)"),
              _buildTableCell(context, report.crpQualitative),
              _buildTableCell(context, ""),
              _buildTableCell(context, ""),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }

  Widget _buildSerumCreatinineContent(BuildContext context, SerumCreatinineReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("BIOCHEMISTRY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "Serum Creatinine"),
              _buildTableCell(context, report.creatinineValue),
              _buildTableCell(context, report.unit),
              _buildTableCell(context, report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }
  
  // New builders for the three new report types:
  Widget _buildESRWintrobeContent(BuildContext context, ESRWintrobeReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("HAEMATOLOGY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "ESR (Wintrobe)"),
              _buildTableCell(context, report.esrValue),
              _buildTableCell(context, report.unit),
              _buildTableCell(context, report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }
  
  Widget _buildESRWestergrenContent(BuildContext context, ESRWestergrenReport report) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context, report),
        const SizedBox(height: 16),
        Center(
          child: Text("HAEMATOLOGY",
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 16),
        Table(
          border: TableBorder.all(color: Theme.of(context).dividerColor),
          children: [
            TableRow(children: [
              _buildTableCell(context, "TEST"),
              _buildTableCell(context, "VALUE"),
              _buildTableCell(context, "UNIT"),
              _buildTableCell(context, "REFERENCE"),
            ]),
            TableRow(children: [
              _buildTableCell(context, "ESR (Westergren)"),
              _buildTableCell(context, report.esrValue),
              _buildTableCell(context, report.unit),
              _buildTableCell(context, report.reference),
            ]),
          ],
        ),
        const SizedBox(height: 16),
        Center(
          child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
        ),
      ],
    );
  }
  
  Widget _buildUrineRoutineContent(BuildContext context, UrineRoutineReport report) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildPatientInfo(context, report),
          const SizedBox(height: 16),
          Center(
            child: Text("CLINICAL PATHOLOGY",
                style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
          ),
          const SizedBox(height: 16),
          Text("Physical Examination", style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
          Table(
            border: TableBorder.all(color: Theme.of(context).dividerColor),
            children: [
              TableRow(children: [
                _buildTableCell(context, "Quantity"),
                _buildTableCell(context, report.physicalQuantity),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Colour"),
                _buildTableCell(context, report.physicalColour),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Transparency"),
                _buildTableCell(context, report.physicalTransparency),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Specific Gravity"),
                _buildTableCell(context, report.specificGravity),
              ]),
              TableRow(children: [
                _buildTableCell(context, "pH"),
                _buildTableCell(context, report.pH),
              ]),
            ],
          ),
          const SizedBox(height: 16),
          Text("Chemical Examination", style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
          Table(
            border: TableBorder.all(color: Theme.of(context).dividerColor),
            children: [
              TableRow(children: [
                _buildTableCell(context, "Protein/Albumin"),
                _buildTableCell(context, report.chemicalProtein),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Sugar/Glucose"),
                _buildTableCell(context, report.chemicalSugar),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Ketone Bodies"),
                _buildTableCell(context, report.chemicalKetoneBodies),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Bilirubin"),
                _buildTableCell(context, report.chemicalBilirubin),
              ]),
            ],
          ),
          const SizedBox(height: 16),
          Text("Microscopic Examination", style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
          Table(
            border: TableBorder.all(color: Theme.of(context).dividerColor),
            children: [
              TableRow(children: [
                _buildTableCell(context, "R.B.C."),
                _buildTableCell(context, report.microscopicRBC),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Pus Cells"),
                _buildTableCell(context, report.microscopicPusCells),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Epithelial Cells"),
                _buildTableCell(context, report.microscopicEpithelialCells),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Casts"),
                _buildTableCell(context, report.microscopicCasts),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Crystals"),
                _buildTableCell(context, report.microscopicCrystals),
              ]),
              TableRow(children: [
                _buildTableCell(context, "Bacteria"),
                _buildTableCell(context, report.microscopicBacteria),
              ]),
            ],
          ),
          const SizedBox(height: 16),
          Center(
            child: Text("Dr._______________\nMBBS, MD Pathologist", textAlign: TextAlign.center),
          ),
        ],
      ),
    );
  }

  Widget _buildReportContent(BuildContext context) {
    if (report is CBCReport) {
      return _buildCBCContent(context, report as CBCReport);
    } else if (report is SerumChlorideReport) {
      return _buildSerumChlorideContent(context, report as SerumChlorideReport);
    } else if (report is SerumSodiumReport) {
      return _buildSerumSodiumContent(context, report as SerumSodiumReport);
    } else if (report is HBA1cReport) {
      return _buildHBA1cContent(context, report as HBA1cReport);
    } else if (report is SerumPotassiumReport) {
      return _buildSerumPotassiumContent(context, report as SerumPotassiumReport);
    } else if (report is LipidProfileReport) {
      return _buildLipidProfileContent(context, report as LipidProfileReport);
    } else if (report is LiverFunctionTestReport) {
      return _buildLiverFunctionTestContent(context, report as LiverFunctionTestReport);
    } else if (report is ThyroidFunctionTestReport) {
      return _buildThyroidFunctionTestContent(context, report as ThyroidFunctionTestReport);
    } else if (report is CRPReport) {
      return _buildCRPContent(context, report as CRPReport);
    } else if (report is SerumCreatinineReport) {
      return _buildSerumCreatinineContent(context, report as SerumCreatinineReport);
    } else if (report is ESRWintrobeReport) {
      return _buildESRWintrobeContent(context, report as ESRWintrobeReport);
    } else if (report is ESRWestergrenReport) {
      return _buildESRWestergrenContent(context, report as ESRWestergrenReport);
    } else if (report is UrineRoutineReport) {
      return _buildUrineRoutineContent(context, report as UrineRoutineReport);
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
        child: _buildReportContent(context),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _downloadReport(context),
        label: const Text('Download'),
        icon: const Icon(Icons.download),
      ),
    );
  }
}
