import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:flutter_application_1/pages/medical_notifications_page.dart';
import 'package:flutter_application_1/pages/notifications_page.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

/// A simple cache to hold data until the app is closed.
class DataCache {
  static String? userName;
  static List<Map<String, String>>? medicationList;
  static List<Map<String, String>>? allergiesList;
}

/// A service class that simulates endpoints to fetch user data from a backend.
/// Replace the MockClient with the real http.Client when your backend is ready.
class DatabaseService {
  // Change this URL to your actual backend URL when available.
  static const String baseUrl = 'https://api.example.com';

  // Create a static instance of MockClient.
  static final http.Client client = MockClient((http.Request request) async {
    final String url = request.url.toString();
    // Simulate a network delay.
    await Future.delayed(const Duration(milliseconds: 500));

    if (url == '$baseUrl/user') {
      // Simulated response for user endpoint.
      return http.Response('{"name": "Rivindu"}', 200);
    } else if (url == '$baseUrl/medications') {
      // Simulated response for medications endpoint.
      return http.Response(
        json.encode([
          {
            "title": "Amoxicillin 500 mg",
            "detail": "Used to treat bacterial infections. Typically taken twice a day."
          },
          {
            "title": "Metformin 500 mg",
            "detail": "Helps control blood sugar levels. Commonly used for type 2 diabetes."
          },
          {
            "title": "Atorvastatin 20 mg",
            "detail": "Used to lower cholesterol levels. Take once daily, often at bedtime."
          },
          {
            "title": "Amlodipine 5 mg",
            "detail": "Calcium channel blocker for high blood pressure. Usually once a day."
          },
          {
            "title": "Ibuprofen 200 mg",
            "detail": "Non-steroidal anti-inflammatory. Take as needed for pain or inflammation."
          },
        ]),
        200,
      );
    } else if (url == '$baseUrl/allergies') {
      // Simulated response for allergies endpoint.
      return http.Response(
        json.encode([
          {
            "title": "Lactose Intolerance",
            "detail": "Difficulty digesting lactose, found in dairy products."
          },
          {
            "title": "Pollen Allergy",
            "detail": "Seasonal allergen causing sneezing, itchy eyes, runny nose."
          },
          {
            "title": "Peanut Allergy",
            "detail": "Severe reactions possible. Carry epinephrine if recommended."
          },
          {
            "title": "Tomato Allergy",
            "detail": "Avoid tomatoes and tomato-based products. Watch out for sauces."
          },
          {
            "title": "Tomato Allergy",
            "detail": "Avoid tomatoes and tomato-based products. Watch out for sauces."
          },
        ]),
        200,
      );
    }
    // For any unknown endpoint, return a 404.
    return http.Response('Not Found', 404);
  });

  /// Fetch the user's name.
  static Future<String> getUserName() async {
    final response = await client.get(Uri.parse('$baseUrl/user'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['name'] as String;
    } else {
      throw Exception("Failed to load user name");
    }
  }

  /// Fetch the list of medications.
  static Future<List<Map<String, String>>> getMedications() async {
    final response = await client.get(Uri.parse('$baseUrl/medications'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((med) => Map<String, String>.from(med)).toList();
    } else {
      throw Exception("Failed to load medications");
    }
  }

  /// Fetch the list of allergies.
  static Future<List<Map<String, String>>> getAllergies() async {
    final response = await client.get(Uri.parse('$baseUrl/allergies'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((allergy) => Map<String, String>.from(allergy)).toList();
    } else {
      throw Exception("Failed to load allergies");
    }
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Local state variables start as null.
  String? _userName;
  List<Map<String, String>>? _medicationList;
  List<Map<String, String>>? _allergiesList;

  bool _isMedicationExpanded = false;
  bool _isAllergiesExpanded = false;
  final Set<int> _expandedMedicationItems = {};
  final Set<int> _expandedAllergyItems = {};

  // NEW: This flag will determine if the bell should show a red dot.
  bool _hasPendingNotifications = false;

  @override
  void initState() {
    super.initState();
    _loadData();
    _loadNotifications(); // NEW: Load notifications to update the red dot.
  }

  /// Load data either from the cache or by fetching it.
  Future<void> _loadData() async {
    // If the data is already cached, use it.
    if (DataCache.userName != null &&
        DataCache.medicationList != null &&
        DataCache.allergiesList != null) {
      setState(() {
        _userName = DataCache.userName;
        _medicationList = DataCache.medicationList;
        _allergiesList = DataCache.allergiesList;
      });
    } else {
      // Otherwise, fetch the data and cache it.
      try {
        final fetchedUserName = await DatabaseService.getUserName();
        final fetchedMedications = await DatabaseService.getMedications();
        final fetchedAllergies = await DatabaseService.getAllergies();
        DataCache.userName = fetchedUserName;
        DataCache.medicationList = fetchedMedications;
        DataCache.allergiesList = fetchedAllergies;
        setState(() {
          _userName = fetchedUserName;
          _medicationList = fetchedMedications;
          _allergiesList = fetchedAllergies;
        });
      } catch (e) {
        print("Error fetching data: $e");
        // Optionally handle the error (e.g., show an error message).
      }
    }
  }

  /// NEW: Load notifications from the NotificationService.
  Future<void> _loadNotifications() async {
    try {
      // Using the NotificationService from your notifications page.
      final notifications = await NotificationService.getNotifications();
      setState(() {
        _hasPendingNotifications = notifications.isNotEmpty;
      });
    } catch (e) {
      print("Error loading notifications: $e");
      // In case of error, you might decide to hide the red dot or show it.
      setState(() {
        _hasPendingNotifications = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final reminders = MedicalNotificationsPage.reminders;
    // Ensure the reminder is a Map<String, String>
    final earliestReminder =
        reminders.isNotEmpty ? reminders.first.cast<String, String>() : null;

    // Show a loading indicator if data is still null.
    if (_userName == null || _medicationList == null || _allergiesList == null) {
      return Scaffold(
        body: SafeArea(
          child: Center(child: CircularProgressIndicator()),
        ),
      );
    }

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 120),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Title row with welcome text and notification icon.
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
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
                              _userName!,
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
                  // Modified notification icon with red dot
                  IconButton(
                    icon: Stack(
                      clipBehavior: Clip.none,
                      children: [
                        const Icon(Icons.notifications_none),
                        if (_hasPendingNotifications)
                          // The red dot
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
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const NotificationsPage()))
                          .then((_) {
                        // Optionally reload notifications when returning from the notifications page.
                        _loadNotifications();
                      });
                    },
                  ),
                ],
              ),

              const SizedBox(height: 16),

              if (earliestReminder != null) ...[
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
                                '${earliestReminder["time"]} - ${earliestReminder["title"]}',
                                style: const TextStyle(fontSize: 16, color: Colors.orange, fontWeight: FontWeight.bold),
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

              // Measurements card remains unchanged.
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Theme.of(context).cardColor,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('172/ml',
                        style: TextStyle(fontSize: 16, color: Colors.green, fontWeight: FontWeight.bold)),
                    Text('122/75',
                        style: TextStyle(fontSize: 16, color: Colors.pink, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Medication capsule using cached data.
              _buildSectionCapsule(
                context: context,
                title: loc.medication,
                items: _medicationList!,
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

              // Allergies capsule using cached data.
              _buildSectionCapsule(
                context: context,
                title: loc.allergies,
                items: _allergiesList!,
                iconData: Icons.warning,
                isSectionExpanded: _isAllergiesExpanded,
                onSectionToggle: () {
                  setState(() {
                    _isAllergiesExpanded = !_isAllergiesExpanded;
                  });
                },
                expandedItems: _expandedAllergyItems,
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Builds a collapsible section capsule for medications and allergies.
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
          // Header row with section title and toggle arrow.
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

  // Builds an expandable list tile for an individual item.
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
