import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/user.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_application_1/services/graphql_queries.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/pages/notifications_page.dart';
import 'package:flutter_application_1/pages/medical_notifications_page.dart';
import 'package:flutter_application_1/services/notification_service.dart';

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

  // UI state variables
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
    _loadMedicalNotifications();
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
      print("Error loading notifications: $e");
      if (mounted) {
        setState(() {
          _hasPendingNotifications = false;
        });
      }
    }
  }

  Future<void> _loadMedicalNotifications() async {
    try {
      final notifications = await _apiService.getMedicalNotifications();
      if (mounted) {
        // Update the static reminders
        MedicalNotificationsPage.getReminders(notifications);
        setState(() {}); // Trigger rebuild to show new reminders
      }
    } catch (e) {
      print('Error loading medical notifications: $e');
    }
  }

  Future<void> _handleRefresh() async {
    try {
      await _loadData();
      await _loadNotifications();
      await _loadMedicalNotifications();
    } catch (e) {
      print("Error refreshing data: $e");
    }
  }

  Future<void> _loadData() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });

      final profile = await _apiService.getUserProfile();
      setState(() {
        _userProfile = profile;
        _isLoading = false;
      });

      final client = GraphQLProvider.of(context).value;
      try {
        final result = await client.query(QueryOptions(
          document: gql(GraphQLQueries.getPatientData),
          variables: {
            'patient': "1",
          },
        ));

        if (result.hasException) {
          throw result.exception!;
        }

        final data = result.data!;
        setState(() {
          _medicalRecords = [
            ...(data['medications']?['medications'] as List? ?? []).map((m) => {
                  'title': m['display'] ?? 'Unknown Medication',
                  'detail': m['meta']?['lastUpdated'] ?? 'No date',
                  'type': 'medication'
                }).toList(),
            ...(data['allergys']?['allergyIntolerances'] as List? ?? []).map((a) => {
                  'title': a['display'] ?? 'Unknown Allergy',
                  'detail': a['timestamp'] ?? 'No date',
                  'type': 'allergy'
                }).toList(),
            ...(data['immunizations']?['immunizations'] as List? ?? []).map((i) => {
                  'title': i['display'] ?? 'Unknown Immunization',
                  'detail': i['timestamp'] ?? 'No date',
                  'type': 'immunization'
                }).toList(),
          ];
        });
      } catch (e) {
        setState(() {
          _medicalRecords = null;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final reminders = MedicalNotificationsPage.reminders;
    final earliestReminder = reminders.isNotEmpty 
        ? Map<String, String>.from(reminders.first)
        : null;

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
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _loadData,
                  child: const Text('Retry'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    // Split medical records into medications, allergies and immunizations
    final medicationList = _medicalRecords
        ?.where((record) => record['type'] == 'medication')
        .map((m) => <String, String>{
              'title': m['title']?.toString() ?? 'Unknown',
              'detail': m['detail']?.toString() ?? 'No detail'
            })
        .toList() ?? [];

    final allergiesList = _medicalRecords
        ?.where((record) => record['type'] == 'allergy')
        .map((a) => <String, String>{
              'title': a['title']?.toString() ?? 'Unknown',
              'detail': a['detail']?.toString() ?? 'No detail'
            })
        .toList() ?? [];

    final immunizationsList = _medicalRecords
        ?.where((record) => record['type'] == 'immunization')
        .map((i) => <String, String>{
              'title': i['title']?.toString() ?? 'Unknown',
              'detail': i['detail']?.toString() ?? 'No detail'
            })
        .toList() ?? [];

    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
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
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const MedicalNotificationsPage()),
                    );
                  },
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Theme.of(context).cardColor,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: Colors.orange.withOpacity(0.3),
                        width: 1,
                      ),
                    ),
                    child: Row(
                      children: [
                        const Icon(
                          Icons.schedule,
                          color: Colors.orange,
                          size: 28,
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (earliestReminder != null)
                                Text(
                                  '${earliestReminder["time"]} - ${earliestReminder["title"]}',
                                  style: const TextStyle(
                                    fontSize: 16,
                                    color: Colors.orange,
                                    fontWeight: FontWeight.bold,
                                  ),
                                )
                              else
                                const Text(
                                  'No reminders',
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.orange,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              const SizedBox(height: 4),
                              Text(
                                loc.tapToSeeFullList,
                                style: TextStyle(
                                  color: Theme.of(context).colorScheme.onSurface.withOpacity(0.6),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Icon(
                          Icons.chevron_right,
                          color: Colors.orange.withOpacity(0.7),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                _buildSectionCapsule(
                  context: context,
                  title: loc.medication,
                  items: medicationList,
                  iconData: Icons.medical_services,
                  isSectionExpanded: _isMedicationExpanded,
                  onSectionToggle: () {
                    setState(() {
                      _isMedicationExpanded = !_isMedicationExpanded;
                    });
                  },
                  expandedItems: _expandedMedicationItems,
                ),
                const SizedBox(height: 16),
                _buildSectionCapsule(
                  context: context,
                  title: loc.allergies,
                  items: allergiesList,
                  iconData: Icons.warning,
                  isSectionExpanded: _isAllergiesExpanded,
                  onSectionToggle: () {
                    setState(() {
                      _isAllergiesExpanded = !_isAllergiesExpanded;
                    });
                  },
                  expandedItems: _expandedAllergyItems,
                ),
                const SizedBox(height: 16),
                _buildSectionCapsule(
                  context: context,
                  title: 'Immunizations',
                  items: immunizationsList,
                  iconData: Icons.vaccines,
                  isSectionExpanded: _isImmunizationsExpanded,
                  onSectionToggle: () {
                    setState(() {
                      _isImmunizationsExpanded = !_isImmunizationsExpanded;
                    });
                  },
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
                          '+${items.length - defaultCount} more',
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
                final itemTitle = itemMap['title'] ?? 'No Title';
                final itemDetail = itemMap['detail'] ?? 'No Detail';
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
            title: Text(
              itemTitle,
              style: const TextStyle(fontSize: 16),
            ),
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
                  Text(
                    itemDetail,
                    style: const TextStyle(fontSize: 14, color: Colors.blueGrey),
                  ),
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
