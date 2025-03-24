import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:intl/intl.dart';
import '../services/graphql_queries.dart';

class LabReportDetailPage extends StatefulWidget {
  final Map<String, dynamic> lab;
  
  const LabReportDetailPage({
    Key? key,
    required this.lab,
  }) : super(key: key);

  @override
  State<LabReportDetailPage> createState() => _LabReportDetailPageState();
}

class _LabReportDetailPageState extends State<LabReportDetailPage> {
  List<Map<String, dynamic>>? _observations;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchObservations();
  }

  Future<void> _fetchObservations() async {
    try {
      print('\n=== Lab Report Debug Info ===');
      print('Lab ID: ${widget.lab['id']}');
      print('Lab Code: ${widget.lab['code']}');
      print('Lab Display: ${widget.lab['display']}');
      print('\n--- Observations Query Debug ---');
      print('Query Variables:');
      print({
        'LabID': widget.lab['id'],
      });

      final client = GraphQLProvider.of(context).value;
      final observationsResult = await client.query(
        QueryOptions(
          document: gql(GraphQLQueries.getObservationStack),
          variables: {
            'LabID': widget.lab['id'],
          },
          fetchPolicy: FetchPolicy.noCache,
        ),
      );

      if (observationsResult.hasException) {
        print('\n❌ Observations Query Failed');
        final error = observationsResult.exception!;
        print('Error Type: ${error.runtimeType}');
        
        if (error.linkException != null) {
          print('Link Exception: ${error.linkException}');
          if (error.linkException is ServerException) {
            final serverError = error.linkException as ServerException;
            print('Server Response: ${serverError.parsedResponse?.response}');
          }
        }
        
        if (error.graphqlErrors.isNotEmpty) {
          print('GraphQL Errors:');
          for (final err in error.graphqlErrors) {
            print('- ${err.message}');
            print('  Location: ${err.locations}');
            print('  Path: ${err.path}');
          }
        }
        
        throw error;
      }

      print('\n✅ Observations Query Successful');
      print('Response Data:');
      print(observationsResult.data);

      if (observationsResult.data == null || 
          observationsResult.data!['observationStack']?['Observations'] == null) {
        throw Exception('No observation data available');
      }

      final observations = (observationsResult.data!['observationStack']['Observations'] as List)
          .map((obs) => {
            'id': obs['id'],
            'patientID': obs['patientID'],
            'labID': obs['labID'],
            'code': obs['code'],
            'display': obs['display'],
            'unit': obs['unit'],
            'value': obs['value'],
            'timestamp': obs['timestamp'],
            'meta': obs['meta'],
          }).toList();

      print('\nProcessed ${observations.length} observations');
      if (observations.isNotEmpty) {
        print('Sample observation:');
        print(observations.first);
      }

      setState(() {
        _observations = observations;
        _isLoading = false;
      });

    } catch (e) {
      print('\n❌ Error fetching observations: $e');
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Widget _buildHeader() {
    final date = DateTime.tryParse(widget.lab['timestamp'] ?? '');
    final dateStr = date != null 
        ? DateFormat('MMMM d, y h:mm a').format(date)
        : 'Unknown Date';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.lab['display'] ?? 'Unknown Test',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Date: $dateStr',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        Text(
          'Source: ${widget.lab['meta']?['source'] ?? 'Unknown Source'}',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        Text(
          'Lab ID: ${widget.lab['id']}',
          style: Theme.of(context).textTheme.titleMedium,
        ),
      ],
    );
  }

  Widget _buildObservationsTable() {
    if (_observations == null || _observations!.isEmpty) {
      return const Center(
        child: Text('No observations available for this report'),
      );
    }

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columns: const [
          DataColumn(label: Text('Test')),
          DataColumn(label: Text('Value')),
          DataColumn(label: Text('Unit')),
          DataColumn(label: Text('Time')),
        ],
        rows: _observations!.map((obs) {
          final date = DateTime.tryParse(obs['timestamp'] ?? '');
          final timeStr = date != null 
              ? DateFormat('h:mm a').format(date)
              : 'Unknown';

          return DataRow(cells: [
            DataCell(Text(obs['display'] ?? 'Unknown')),
            DataCell(Text(obs['value']?.toString() ?? 'N/A')),
            DataCell(Text(obs['unit'] ?? '')),
            DataCell(Text(timeStr)),
          ]);
        }).toList(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lab Report Details'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('Error: $_error'),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _fetchObservations,
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildHeader(),
                      const SizedBox(height: 24),
                      const Text(
                        'Observations',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),
                      _buildObservationsTable(),
                    ],
                  ),
                ),
    );
  }
}
