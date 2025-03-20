// lib/pages/report_detail_page.dart
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../models/base_report.dart';
import '../models/report.dart';
import '../services/graphql_queries.dart';
import '../services/hive_service.dart';

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
  bool _isDownloaded = false;

  @override
  void initState() {
    super.initState();
    _checkDownloadStatus();
  }

  void _checkDownloadStatus() {
    if (widget.report is Report) {
      _isDownloaded = HiveService.isReportDownloaded(widget.report.id);
      setState(() {});
    }
  }

  Future<void> _toggleDownload() async {
    if (!(widget.report is Report)) return;
    
    final report = widget.report as Report;
    
    if (_isDownloaded) {
      await HiveService.deleteReport(report.id);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Report removed from downloads')),
      );
    } else {
      await HiveService.saveReport(report);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Report saved to downloads')),
      );
    }
    
    _checkDownloadStatus();
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

  Widget _buildPatientInfo(BuildContext context) {
    final meta = widget.report.meta ?? {};
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
          "Date: ${widget.report.dateTime.month.toString().padLeft(2, '0')}/${widget.report.dateTime.day.toString().padLeft(2, '0')}/${widget.report.dateTime.year}",
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
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.red),
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
      child: Table(
        border: TableBorder.all(
          color: Theme.of(context).dividerColor,
          borderRadius: BorderRadius.circular(8),
        ),
        defaultColumnWidth: const IntrinsicColumnWidth(),
        children: [
          TableRow(
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor.withOpacity(0.1),
            ),
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
                _buildTableCell(context, obs['display'] ?? ''),
                _buildTableCell(context, obs['value']?.toString() ?? ''),
                _buildTableCell(context, obs['unit']?.toString() ?? ''),
                _buildTableCell(context, obs['meta']?['reference']?.toString() ?? ''),
              ],
            );
          }).toList(),
        ],
      ),
    );
  }

  Widget _buildGenericReportContent(BuildContext context) {
    final meta = widget.report.meta ?? {};

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPatientInfo(context),
        const SizedBox(height: 24),
        Center(
          child: Text(
            widget.report.title.toUpperCase(),
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 24),
        _buildObservationsTable(context),
        const SizedBox(height: 24),
        if (meta['comments'] != null) ...[
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
            icon: Icon(_isDownloaded ? Icons.download_done : Icons.download_outlined),
            onPressed: _toggleDownload,
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
