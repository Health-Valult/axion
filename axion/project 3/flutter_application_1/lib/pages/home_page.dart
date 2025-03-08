import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/notification.dart';
import 'package:flutter_application_1/models/user.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/pages/medical_notifications_page.dart';
import 'package:flutter_application_1/pages/notifications_page.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_application_1/services/graphql_queries.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ApiService _apiService = ApiService();
  bool _isLoading = false;
  String? _error;
  User? _userProfile;
  List<dynamic>? _medicalRecords;
  List<AppNotification>? _notifications;
  bool _isRefreshing = false;

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });
    
    // Refetch both queries
    final client = GraphQLProvider.of(context).value;
    await Future.wait([
      client.query(QueryOptions(
        document: gql(GraphQLQueries.getMedications),
        fetchPolicy: FetchPolicy.networkOnly,
      )),
      client.query(QueryOptions(
        document: gql(GraphQLQueries.getAllergies),
        fetchPolicy: FetchPolicy.networkOnly,
      )),
    ]);

    if (mounted) {
      setState(() {
        _isRefreshing = false;
      });
    }
  }

  Widget _buildErrorWidget(String message, VoidCallback onRetry) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(message),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: onRetry,
            child: Text(AppLocalizations.of(context)!.retry),
          ),
        ],
      ),
    );
  }

  Future<void> _loadData() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });

      final profile = await _apiService.getUserProfile();
      final medications = await _apiService.getMedications();
      final allergies = await _apiService.getAllergies();
      final notifications = await _apiService.getNotifications();

      setState(() {
        _userProfile = profile;
        _medicalRecords = [...medications, ...allergies];
        _notifications = notifications;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        body: SafeArea(
          child: Center(child: CircularProgressIndicator()),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        body: SafeArea(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Error: $_error'),
                ElevatedButton(
                  onPressed: _loadData,
                  child: Text('Retry'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final loc = AppLocalizations.of(context)!;
    final notifications = _notifications ?? [];
    final earliestNotification = notifications.isNotEmpty ? notifications.first : null;

    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
        actions: [
          if (_isRefreshing)
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2),
              ),
            ),
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const NotificationsPage(),
                    ),
                  ).then((_) => _loadData());
                },
              ),
              if (_notifications != null && _notifications!.isNotEmpty)
                Positioned(
                  right: 8,
                  top: 8,
                  child: Container(
                    width: 12,
                    height: 12,
                    decoration: const BoxDecoration(
                      color: Colors.red,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
            ],
          ),
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _isRefreshing ? null : _handleRefresh,
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            if (_userProfile != null) ...[
              RichText(
                text: TextSpan(
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  children: [
                    TextSpan(text: '${loc.welcome} '), // Add a space after welcome
                    WidgetSpan(
                      alignment: PlaceholderAlignment.baseline,
                      baseline: TextBaseline.alphabetic,
                      child: ShaderMask(
                        shaderCallback: (Rect bounds) {
                          return const LinearGradient(
                            colors: [
                              Colors.deepOrange,
                              Colors.orange,
                              Color.fromARGB(255, 248, 171, 55)
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ).createShader(bounds);
                        },
                        child: Text(
                          "${_userProfile!.firstName} ${_userProfile!.lastName}",
                          style: const TextStyle(
                            fontSize: 24,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
            ],
            
            if (earliestNotification != null) ...[
              GestureDetector(
                onTap: () {
                  Navigator.push(context, MaterialPageRoute(builder: (_) => const MedicalNotificationsPage()));
                },
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.schedule, color: Colors.orange),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              earliestNotification.title,
                              style: const TextStyle(fontSize: 16, color: Colors.orange, fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              earliestNotification.description,
                              style: const TextStyle(fontSize: 14),
                            ),
                            const SizedBox(height: 4),
                            Text(loc.tapToSeeFullList, style: const TextStyle(color: Colors.blueGrey)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Medical Records Section
            if (_medicalRecords != null && _medicalRecords!.isNotEmpty) ...[
              Text(
                loc.medicalRecords,
                style: Theme.of(context).textTheme.titleLarge,
              ),
              ListView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: _medicalRecords!.length,
                itemBuilder: (context, index) {
                  final record = _medicalRecords![index];
                  return Card(
                    child: ListTile(
                      title: Text(record['title'] ?? ''),
                      subtitle: Text(record['date'] ?? ''),
                      trailing: const Icon(Icons.arrow_forward_ios),
                      onTap: () {
                        // Navigate to record details
                      },
                    ),
                  );
                },
              ),
              const SizedBox(height: 16),
            ],

            // Medications Section
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      loc.medications,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 16),
                    Query(
                      options: QueryOptions(
                        document: gql(GraphQLQueries.getMedications),
                        fetchPolicy: FetchPolicy.networkOnly,
                      ),
                      builder: (QueryResult result, {fetchMore, refetch}) {
                        if (result.hasException) {
                          return _buildErrorWidget(
                            result.exception?.graphqlErrors.first.message ?? 
                            'Error loading medications',
                            () => refetch?.call(),
                          );
                        }

                        if (result.isLoading) {
                          return const Center(child: CircularProgressIndicator());
                        }

                        final medications = result.data?['medications'] as List?;
                        if (medications == null || medications.isEmpty) {
                          return Center(
                            child: Text(loc.noMedications),
                          );
                        }

                        return ListView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: medications.length,
                          itemBuilder: (context, index) {
                            final medication = medications[index];
                            return ListTile(
                              title: Text(medication['name']),
                              subtitle: Text(
                                '${medication['dosage']} - ${medication['frequency']}',
                              ),
                              trailing: Text(
                                medication['instructions'] ?? '',
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            );
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Allergies Section
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      loc.allergies,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 16),
                    Query(
                      options: QueryOptions(
                        document: gql(GraphQLQueries.getAllergies),
                        fetchPolicy: FetchPolicy.networkOnly,
                      ),
                      builder: (QueryResult result, {fetchMore, refetch}) {
                        if (result.hasException) {
                          return _buildErrorWidget(
                            result.exception?.graphqlErrors.first.message ?? 
                            'Error loading allergies',
                            () => refetch?.call(),
                          );
                        }

                        if (result.isLoading) {
                          return const Center(child: CircularProgressIndicator());
                        }

                        final allergies = result.data?['allergies'] as List?;
                        if (allergies == null || allergies.isEmpty) {
                          return Center(
                            child: Text(loc.noAllergies),
                          );
                        }

                        return ListView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: allergies.length,
                          itemBuilder: (context, index) {
                            final allergy = allergies[index];
                            return ListTile(
                              title: Text(allergy['name']),
                              subtitle: Text(allergy['reaction'] ?? ''),
                              trailing: Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 4,
                                ),
                                decoration: BoxDecoration(
                                  color: _getSeverityColor(allergy['severity']),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  allergy['severity'],
                                  style: const TextStyle(color: Colors.white),
                                ),
                              ),
                            );
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Notifications Section
            if (_notifications != null && _notifications!.isNotEmpty) ...[
              Text(
                loc.recentNotifications,
                style: Theme.of(context).textTheme.titleLarge,
              ),
              ListView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: _notifications!.length.clamp(0, 3),
                itemBuilder: (context, index) {
                  final notification = _notifications![index];
                  return Card(
                    child: ListTile(
                      leading: const Icon(Icons.notifications),
                      title: Text(notification.title ?? ''),
                      subtitle: Text(notification.description ?? ''),
                      onTap: () {
                        // Navigate to notification details
                      },
                    ),
                  );
                },
              ),
            ],
          ],
        ),
      ),
    );
  }

  Color _getSeverityColor(String severity) {
    switch (severity.toLowerCase()) {
      case 'high':
        return Colors.red;
      case 'medium':
        return Colors.orange;
      case 'low':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }
}
