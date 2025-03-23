// lib/pages/report_detail_page.dart
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:intl/intl.dart'; 
import '../models/base_report.dart';
import '../services/graphql_queries.dart';

class ReportDetailPage extends StatefulWidget {
  final BaseReport report;
  const ReportDetailPage({Key? key, required this.report}) : super(key: key);

  @override
  State<ReportDetailPage> createState() => _ReportDetailPageState();
}

class _ReportDetailPageState extends State<ReportDetailPage> {
  bool _isLoading = true;
  String? _error;
  bool _hasInitialized = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_hasInitialized) {
      _fetchObservations();
      _hasInitialized = true;
    }
  }

  Future<void> _fetchObservations() async {
    if (!mounted) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      print('\n=== Fetching Observations for Lab ${widget.report.id} ===');
      final client = GraphQLProvider.of(context).value;
      final result = await client.query(
        QueryOptions(
          document: gql(GraphQLQueries.getObservationStack),
          variables: {'LabID': widget.report.id},
          fetchPolicy: FetchPolicy.noCache,
        ),
      );

      if (!mounted) return;

      if (result.hasException) {
        print('\n❌ Observations Query Failed');
        print('Error: ${result.exception}');
        throw result.exception!;
      }

      print('\n✅ Observations Query Successful');

      final data = result.data;
      if (data == null) {
        throw Exception('No data received from server');
      }

      final stackData = data['observationStack'] as Map<String, dynamic>?;
      if (stackData == null) {
        throw Exception('Invalid response format: missing observationStack field');
      }

      final observationsList = stackData['Observations'] as List<dynamic>?;
      if (observationsList == null) {
        throw Exception('Invalid response format: missing Observations list');
      }

      final observations = observationsList.map((obs) {
        // Validate required fields
        final id = obs['id'] as String?;
        if (id == null) throw Exception('Observation missing required field: id');

        final code = obs['code'] as String?;
        if (code == null) throw Exception('Observation missing required field: code');

        return {
          'id': id,
          'patientID': obs['patientID'] as String? ?? '',
          'labID': obs['labID'] as String? ?? '',
          'code': code,
          'display': obs['display'] as String? ?? 'Unknown Observation',
          'unit': obs['unit'] as String? ?? '',
          'value': obs['value'],
          'timestamp': obs['timestamp'] as String? ?? DateTime.now().toIso8601String(),
          'meta': obs['meta'] as Map<String, dynamic>? ?? {},
        };
      }).toList();

      if (!mounted) return;

      setState(() {
        widget.report.observations = observations;
        _isLoading = false;
        _error = null;
      });

      print('\nProcessed ${observations.length} observations successfully');
    } catch (e) {
      if (!mounted) return;

      print('\n❌ Error loading observations: $e');
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }


  Widget _buildHeader(BuildContext context) {
    final observations = widget.report.observations;
    String issuedDate = "";
    String issuedLab = "";
    if (observations != null && observations.isNotEmpty) {
      final firstObs = observations[0];
      final timestampStr = firstObs['timestamp'] as String? ?? "";
      if (timestampStr.isNotEmpty) {
        try {
          final dt = DateTime.parse(timestampStr);
          issuedDate = DateFormat('MM/dd/yyyy HH:mm').format(dt);
        } catch (e) {
          issuedDate = timestampStr;
        }
      }
      issuedLab = firstObs['meta']?['source']?.toString() ?? "";
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          widget.report.title.toUpperCase(),
          style: Theme.of(context)
              .textTheme
              .titleLarge
              ?.copyWith(fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        if (issuedDate.isNotEmpty)
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              "Issued Date: $issuedDate",
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
        if (issuedLab.isNotEmpty)
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              "Issued Laboratory: $issuedLab",
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
      ],
    );
  }


  Widget _buildReportCard(BuildContext context) {
    final meta = widget.report.meta ?? {};
    return Card(
      elevation: 2,
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildPatientInfo(context),
            const SizedBox(height: 16),
            _buildObservationsDataTable(context),
            const SizedBox(height: 16),
            if (meta['comments'] != null)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Comments:",
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    meta['comments'],
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildPatientInfo(BuildContext context) {
    final meta = widget.report.meta ?? {};
    final textTheme = Theme.of(context).textTheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (meta['patientName'] != null)
          Text("Patient Name: ${meta['patientName']}",
              style: textTheme.bodyLarge),
        if (meta['patientId'] != null)
          Text("Patient ID: ${meta['patientId']}", style: textTheme.bodyLarge),
        if (meta['referredBy'] != null)
          Text("Referred By: ${meta['referredBy']}",
              style: textTheme.bodyLarge),
        if (meta['ageSex'] != null)
          Text("Age / Sex: ${meta['ageSex']}", style: textTheme.bodyLarge),
        if (meta['investigations'] != null)
          Text("Investigations: ${meta['investigations']}",
              style: textTheme.bodyLarge),
        if (meta['dailyCaseNumber'] != null)
          Text("Daily Case Number: ${meta['dailyCaseNumber']}",
              style: textTheme.bodyLarge),
      ],
    );
  }

  Widget _buildObservationsDataTable(BuildContext context) {
    if (_isLoading) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Error loading observations: $_error',
                textAlign: TextAlign.center,
                style: Theme.of(context)
                    .textTheme
                    .bodyMedium
                    ?.copyWith(color: Colors.red),
              ),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: _fetchObservations,
                icon: const Icon(Icons.refresh),
                label: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    final observations = widget.report.observations ?? [];
    if (observations.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(
            "No observations available for this report",
            style: Theme.of(context).textTheme.bodyMedium,
            textAlign: TextAlign.center,
          ),
        ),
      );
    }

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.all(16.0),
      child: DataTable(
        columns: const [
          DataColumn(label: Text("Test")),
          DataColumn(label: Text("Value")),
          DataColumn(label: Text("Unit")),
        ],
        rows: observations.map((obs) {
          return DataRow(
            cells: [
              DataCell(Text(obs['display'] ?? '')),
              DataCell(Text(obs['value']?.toString() ?? '')),
              DataCell(Text(obs['unit']?.toString() ?? '')),
            ],
          );
        }).toList(),
      ),
    );
  }

  Widget _buildGenericReportContent(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildHeader(context),
        const SizedBox(height: 16),
        _buildReportCard(context),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.report.title),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchObservations,
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
