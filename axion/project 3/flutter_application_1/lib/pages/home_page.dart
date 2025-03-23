import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/user.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:flutter_application_1/services/graphql_queries.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/pages/notifications_page.dart';
import 'package:flutter_application_1/pages/medical_notifications_page.dart';
import 'package:flutter_application_1/services/notification_service.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_application_1/services/env_config.dart';
import 'package:intl/intl.dart'; // Added for date formatting

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
  List<Map<String, dynamic>>? _medicalRecords;

  bool _isMedicationExpanded = false;
  bool _isAllergiesExpanded = false;
  bool _isImmunizationsExpanded = false;
  final Set<int> _expandedMedicationItems = {};
  final Set<int> _expandedAllergyItems = {};
  final Set<int> _expandedImmunizationItems = {};
  bool _hasPendingNotifications = false;

  @override
  void initState() {
    super.initState();
    _loadData();
    _loadNotifications();
  }

  // Helper function to format date strings
  String _formatDate(String? dateStr) {
    if (dateStr == null || dateStr.isEmpty) return 'Unknown';
    try {
      final dateTime = DateTime.parse(dateStr);
      return DateFormat('MMM dd, yyyy, h:mm a').format(dateTime);
    } catch (e) {
      return dateStr;
    }
  }

  Future<void> _loadNotifications() async {
    try {
      final notifications = await NotificationService.getNotifications();
      if (mounted) {
        setState(() {
          _hasPendingNotifications = notifications.isNotEmpty;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _hasPendingNotifications = false;
        });
      }
    }
  }



  Future<void> _handleRefresh() async {
    await _loadData();
    await _loadNotifications();
  }

  Future<void> _loadData() async {
    if (!mounted) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // Load profile first and wait for it to complete
      final profile = await _apiService.getUserProfile();
      if (!mounted) return;
      
      setState(() {
        _userProfile = profile;
      });

      final client = GraphQLProvider.of(context).value;

      // Use the combined query for health data
      final healthDataResult = await client.query(QueryOptions(
        document: gql(GraphQLQueries.getAllHealthData),
        fetchPolicy: FetchPolicy.noCache,
        errorPolicy: ErrorPolicy.all,
      ));

      List<Map<String, dynamic>> medications = [];
      List<Map<String, dynamic>> allergies = [];
      List<Map<String, dynamic>> immunizations = [];

      if (healthDataResult.data?['medications']?['medications'] != null) {
        medications = (healthDataResult.data!['medications']['medications'] as List)
            .map((m) => {
                  'title': m['display'] ?? 'Unknown',
                  'detail': '''Dosage: ${m['dosage'] ?? 'No dosage'}
                  Route: ${m['route'] ?? 'Unknown route'}
                  Prescriber: ${m['prescriber'] ?? 'Unknown prescriber'}
                  Code: ${m['code'] ?? 'No code'}
                  Prescribed: ${_formatDate(m['meta']?['created'])}
                  Source: ${m['meta']?['source'] ?? 'Unknown'}''',
                  'type': 'medication'
                })
            .toList();
      }

      if (healthDataResult.data?['allergys']?['allergyIntolerances'] != null) {
        allergies = (healthDataResult.data!['allergys']['allergyIntolerances'] as List)
            .map((a) => {
                  'title': a['display'] ?? 'Unknown',
                  'detail': '''Severity: ${a['severity'] ?? 'Unknown'}
                  Category: ${a['category'] ?? 'Unknown'}
                  Criticality: ${a['criticality'] ?? 'Unknown'}
                  Status: ${a['verificationStatus'] ?? 'Unknown'}
                  Source: ${a['source'] ?? 'Unknown'}
                  Created: ${_formatDate(a['meta']?['created'])}
                  Updated: ${_formatDate(a['meta']?['updated'])}
                  System: ${a['meta']?['source'] ?? 'Unknown'}''',
                  'type': 'allergy'
                })
            .toList();
      }

      if (healthDataResult.data?['immunization']?['immunizations'] != null) {
        immunizations = (healthDataResult.data!['immunization']['immunizations'] as List)
            .map((i) => {
                  'title': i['display'] ?? 'Unknown',
                  'detail': '''Dosage: ${i['dosage'] ?? 'Unknown'}
                  Unit: ${i['unit'] ?? 'Unknown'}
                  Site: ${i['site'] ?? 'Unknown'}
                  Date: ${_formatDate(i['timestamp'])}
                  Code: ${i['code'] ?? 'No code'}
                  Created: ${_formatDate(i['meta']?['created'])}
                  Source: ${i['meta']?['source'] ?? 'Unknown'}''',
                  'type': 'immunization'
                })
            .toList();
      }

      if (!mounted) return;

      setState(() {
        _medicalRecords = [...medications, ...allergies, ...immunizations];
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final reminders = MedicalNotificationsPage.reminders;
    final earliestReminder =
        reminders.isNotEmpty ? Map<String, String>.from(reminders.first) : null;

    if (_isLoading) {
      return const Scaffold(
        body: SafeArea(child: Center(child: CircularProgressIndicator())),
      );
    }

    if (_error != null) {
      return Scaffold(
        body: SafeArea(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('${loc.errorPrefix}$_error'),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _loadData,
                  child: Text(loc.retry),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final medicationList = _medicalRecords
            ?.where((record) => record['type'] == 'medication')
            .map((m) => <String, String>{
                  'title': m['title']?.toString() ?? loc.noTitle,
                  'detail': m['detail']?.toString() ?? loc.noDetail
                })
            .toList() ??
        [];

    final allergiesList = _medicalRecords
            ?.where((record) => record['type'] == 'allergy')
            .map((a) => <String, String>{
                  'title': a['title']?.toString() ?? loc.noTitle,
                  'detail': a['detail']?.toString() ?? loc.noDetail
                })
            .toList() ??
        [];

    final immunizationsList = _medicalRecords
            ?.where((record) => record['type'] == 'immunization')
            .map((i) => <String, String>{
                  'title': i['title']?.toString() ?? loc.noTitle,
                  'detail': i['detail']?.toString() ?? loc.noDetail
                })
            .toList() ??
        [];

    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
          color: Colors.blue,
          onRefresh: _handleRefresh,
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 120),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: '${loc.welcome} ',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: Theme.of(context).brightness == Brightness.light
                                  ? Colors.black
                                  : Colors.white,
                            ),
                          ),
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
                                _userProfile?.firstName ?? '',
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
                    IconButton(
                      icon: Stack(
                        clipBehavior: Clip.none,
                        children: [
                          const Icon(Icons.notifications_none),
                          if (_hasPendingNotifications)
                            const Positioned(
                              right: -1,
                              top: -1,
                              child: Icon(
                                Icons.brightness_1,
                                size: 10,
                                color: Colors.red,
                              ),
                            ),
                        ],
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (_) => const NotificationsPage()),
                        ).then((_) => _loadNotifications());
                      },
                    ),
                  ],
                ),
                
                const SizedBox(height: 16),
                _buildSectionCapsule(
                  context: context,
                  title: loc.medication,
                  items: medicationList,
                  iconData: Icons.medical_services,
                  isSectionExpanded: _isMedicationExpanded,
                  onSectionToggle: () =>
                      setState(() => _isMedicationExpanded = !_isMedicationExpanded),
                  expandedItems: _expandedMedicationItems,
                ),
                const SizedBox(height: 16),
                _buildSectionCapsule(
                  context: context,
                  title: loc.allergies,
                  items: allergiesList,
                  iconData: Icons.warning,
                  isSectionExpanded: _isAllergiesExpanded,
                  onSectionToggle: () =>
                      setState(() => _isAllergiesExpanded = !_isAllergiesExpanded),
                  expandedItems: _expandedAllergyItems,
                ),
                const SizedBox(height: 16),
                _buildSectionCapsule(
                  context: context,
                  title: loc.immunizations,
                  items: immunizationsList,
                  iconData: Icons.vaccines,
                  isSectionExpanded: _isImmunizationsExpanded,
                  onSectionToggle: () =>
                      setState(() => _isImmunizationsExpanded = !_isImmunizationsExpanded),
                  expandedItems: _expandedImmunizationItems,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionCapsule({
    required BuildContext context,
    required String title,
    required List<Map<String, String>> items,
    required IconData iconData,
    required bool isSectionExpanded,
    required VoidCallback onSectionToggle,
    required Set<int> expandedItems,
  }) {
    final loc = AppLocalizations.of(context)!;
    const int defaultCount = 3;
    final bool hasMore = items.length > defaultCount;
    final displayedItems = isSectionExpanded ? items : items.take(defaultCount).toList();

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              if (hasMore)
                Row(
                  children: [
                    if (!isSectionExpanded)
                      Padding(
                        padding: const EdgeInsets.only(right: 8.0),
                        child: Text(
                          loc.moreCount(items.length - defaultCount),
                          style: const TextStyle(fontSize: 14, color: Colors.blueGrey),
                        ),
                      ),
                    GestureDetector(
                      onTap: onSectionToggle,
                      child: Icon(
                        isSectionExpanded ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                        size: 24,
                        color: Colors.blueGrey,
                      ),
                    ),
                  ],
                ),
            ],
          ),
          const SizedBox(height: 16),
          AnimatedSize(
            alignment: Alignment.topLeft,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut,
            child: Column(
              children: List.generate(displayedItems.length, (index) {
                final itemMap = displayedItems[index];
                final itemTitle = itemMap['title'] ?? loc.noTitle;
                final itemDetail = itemMap['detail'] ?? loc.noDetail;
                return _buildItemWithDetails(
                  iconData: iconData,
                  itemTitle: itemTitle,
                  itemDetail: itemDetail,
                  isExpanded: expandedItems.contains(index),
                  onItemTap: () {
                    setState(() {
                      if (expandedItems.contains(index)) {
                        expandedItems.remove(index);
                      } else {
                        expandedItems.add(index);
                      }
                    });
                  },
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildItemWithDetails({
    required IconData iconData,
    required String itemTitle,
    required String itemDetail,
    required bool isExpanded,
    required VoidCallback onItemTap,
  }) {
    return AnimatedSize(
      alignment: Alignment.topLeft,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: Icon(iconData, color: Colors.cyan),
            title: Text(itemTitle, style: const TextStyle(fontSize: 16)),
            trailing: Icon(
              isExpanded ? Icons.expand_less : Icons.expand_more,
              color: Colors.blueGrey,
            ),
            onTap: onItemTap,
          ),
          if (isExpanded)
            Padding(
              padding: const EdgeInsets.only(left: 16, right: 16, bottom: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(itemDetail, style: const TextStyle(fontSize: 14, color: Colors.blueGrey)),
                  const SizedBox(height: 8),
                  const Divider(),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
