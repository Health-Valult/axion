// lib/pages/report_detail_page.dart
import 'package:flutter/material.dart';
import '../models/base_report.dart';

class ReportDetailPage extends StatelessWidget {
  final BaseReport report;
  const ReportDetailPage({Key? key, required this.report}) : super(key: key);

  Widget _buildPatientInfo(BuildContext context) {
    final meta = report.meta ?? {};
    final textTheme = Theme.of(context).textTheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (meta['patientName'] != null)
          Text("Patient Name: ${meta['patientName']}", style: textTheme.bodyLarge),
        if (meta['referredBy'] != null)
          Text("Referred By: ${meta['referredBy']}", style: textTheme.bodyLarge),
        if (meta['ageSex'] != null)
          Text("Age / Sex: ${meta['ageSex']}", style: textTheme.bodyLarge),
        Text(
          "Date: ${report.dateTime.month.toString().padLeft(2, '0')}/${report.dateTime.day.toString().padLeft(2, '0')}/${report.dateTime.year}",
          style: textTheme.bodyLarge,
        ),
        if (meta['investigations'] != null)
          Text("Investigations: ${meta['investigations']}", style: textTheme.bodyLarge),
        if (meta['dailyCaseNumber'] != null)
          Text("Daily Case Number: ${meta['dailyCaseNumber']}", style: textTheme.bodyLarge),
        if (meta['patientId'] != null)
          Text("Patient ID: ${meta['patientId']}", style: textTheme.bodyLarge),
      ],
    );
  }

  Widget _buildTableCell(BuildContext context, String text) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text(
        text,
        style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontSize: 14),
      ),
    );
  }

  Widget _buildObservationsTable(BuildContext context) {
    final observations = report.observations ?? [];
    if (observations.isEmpty) {
      return Text(
        "No observations available",
        style: Theme.of(context).textTheme.bodyMedium,
      );
    }

    return Table(
      border: TableBorder.all(color: Theme.of(context).dividerColor),
      children: [
        TableRow(
          children: [
            _buildTableCell(context, "TEST"),
            _buildTableCell(context, "VALUE"),
            _buildTableCell(context, "UNIT"),
            _buildTableCell(context, "REFERENCE"),
          ],
        ),
        ...observations.map((obs) {
          return TableRow(
            children: [
              _buildTableCell(context, obs['testName'] ?? ''),
              _buildTableCell(context, obs['value']?.toString() ?? ''),
              _buildTableCell(context, obs['unit']?.toString() ?? ''),
              _buildTableCell(context, obs['reference']?.toString() ?? ''),
            ],
          );
        }).toList(),
      ],
    );
  }

  Widget _buildGenericReportContent(BuildContext context) {
    final meta = report.meta ?? {};

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context),
        const SizedBox(height: 16),
        Center(
          child: Text(
            report.title.toUpperCase(),
            style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(height: 16),
        _buildObservationsTable(context),
        const SizedBox(height: 16),
        if (meta['comments'] != null) ...[
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              "Comments: ${meta['comments']}",
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
          const SizedBox(height: 16),
        ],
        Center(
          child: Text(
            meta['doctorSignature'] ?? "Dr._______________\nMBBS, MD Pathologist",
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(report.title),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {
              // TODO: Implement share functionality
            },
          ),
          IconButton(
            icon: const Icon(Icons.print),
            onPressed: () {
              // TODO: Implement print functionality
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: _buildGenericReportContent(context),
      ),
    );
  }
}
