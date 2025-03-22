import 'package:flutter/material.dart';

class TermsAndConditionsDialog extends StatefulWidget {
  const TermsAndConditionsDialog({Key? key}) : super(key: key);

  @override
  State<TermsAndConditionsDialog> createState() => _TermsAndConditionsDialogState();
}

class _TermsAndConditionsDialogState extends State<TermsAndConditionsDialog> {
  final ScrollController _scrollController = ScrollController();
  bool _hasReachedBottom = false;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      setState(() {
        _hasReachedBottom = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Container(
        width: double.maxFinite,
        constraints: const BoxConstraints(maxHeight: 500),
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Terms and Conditions',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Scrollbar(
                controller: _scrollController,
                child: SingleChildScrollView(
                  controller: _scrollController,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        '''1. Introduction

                      1.1. Welcome to AXION, a platform designed to securely manage and access your medical history.
                      1.2. By creating an account and using the App, you agree to these Terms & Conditions.
                      1.3. If you do not agree, please discontinue using the App immediately.

                      2. Data Collection

                      2.1. We collect the following personal data:
                          - National Identity Card (NIC), full name, date of birth.
                          - Email address and telephone number.
                          - Precise location (if enabled), IP address, Android ID.
                          - Medical history, prescriptions, lab reports, allergies, diagnoses, immunizations (if provided).
                      2.2. Data is collected solely for providing services, enhancing user experience, and ensuring security.

                      3. Data Usage

                      3.1. Service Provision:
                          - Store and manage your medical records securely.
                          - Provide access to past diagnoses, prescriptions, and test results.
                          - Share records with authorized healthcare providers.
                          - Authenticate users and ensure secure access.
                      3.2. Notifications & Alerts:
                          - Send account, security, and medication notifications.
                          - Notify about appointments, test results, and emergencies.
                      3.3. Security & Fraud Prevention:
                          - Detect and prevent unauthorized access or fraud.
                          - Enforce security protocols and comply with legal obligations.
                      3.4. Analytics & Improvements:
                          - Improve app features and performance.
                          - Conduct non-personalized analytics and research.
                          - Personalize health insights and recommendations.

                      4. Data Sharing

                      4.1. We do not sell or rent your data to third parties.
                      4.2. Data may be shared:
                          - With healthcare providers you authorize.
                          - With emergency contacts if you enable that feature.
                          - If required by law or regulation.
                          - With trusted service providers under strict data protection agreements.

                      5. Data Security

                      5.1. All stored and transmitted data is encrypted.
                      5.2. Multi-factor authentication and role-based access are used.
                      5.3. Data is hosted securely on Azure Cloud.
                      5.4. Sessions are managed securely using Redis caching.
                      5.5. Inactive or expired data is automatically deleted after a set period.
                      5.6. Users are responsible for safeguarding login credentials.

                      6. User Rights

                      6.1. You have the right to access and download your medical records.
                      6.2. You may request deletion of your account and data.
                      6.3. You may withdraw consent by deactivating your account.
                      6.4. You can export your data in a structured format.
                      6.5. Contact support to exercise any of these rights.

                      7. Account Termination

                      7.1. You may delete your account at any time.
                      7.2. Personal and medical data will be removed within 30 days of deletion.
                      7.3. Backups may be retained for legal purposes for up to 6 months.
                      7.4. Accounts inactive for 12 months may be deleted after notification.
                      7.5. Accounts involved in fraudulent or illegal activities may be terminated.

                      8. Third-Party Integrations

                      8.1. The app may integrate with external services like cloud storage or health systems.
                      8.2. Their data usage policies will apply if integrations are enabled.
                      8.3. Review third-party privacy policies before linking services.

                      9. Changes to Terms

                      9.1. We may update these terms periodically.
                      9.2. You will be notified via email or app if significant changes occur.
                      9.3. Continued use of the app indicates your acceptance of updated terms.

                      10. Governing Law

                      10.1. These terms are governed by the laws of Sri Lanka.
                      10.2. Disputes shall be resolved through arbitration under applicable local rules.

                      11. Contact

                      11.1. For support or inquiries, contact:
                            - Email: [support@appname.com]
                            - Help Center: [appname.com/help]
                      11.2. By signing up, you consent to the collection and use of your data as described.''',
                        style: TextStyle(fontSize: 14),
                      ),

                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () => Navigator.of(context).pop(false),
                  child: const Text('Decline'),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: _hasReachedBottom 
                    ? () => Navigator.of(context).pop(true)
                    : null,
                  child: const Text('I Agree'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
