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
                        '''1. Acceptance of Terms

By accessing and using our medical application, you agree to be bound by these Terms and Conditions.

2. User Registration and Account Security

2.1. You must provide accurate and complete information during registration.
2.2. You are responsible for maintaining the confidentiality of your account credentials.
2.3. You must immediately notify us of any unauthorized use of your account.

3. Medical Information and Disclaimer

3.1. The application provides general medical information and is not a substitute for professional medical advice.
3.2. Always consult qualified healthcare professionals for medical decisions.
3.3. Emergency situations require immediate professional medical attention.

4. Privacy and Data Protection

4.1. We collect and process your personal and medical information as described in our Privacy Policy.
4.2. Your data is protected using industry-standard security measures.
4.3. We may share anonymized data for research and improvement purposes.

5. User Responsibilities

5.1. You agree to provide accurate medical information.
5.2. You will not misuse or attempt to compromise the system's security.
5.3. You will not share your account access with others.

6. Service Availability and Updates

6.1. We strive to maintain continuous service availability but cannot guarantee uninterrupted access.
6.2. We may update or modify the service features periodically.
6.3. We reserve the right to suspend or terminate accounts violating these terms.

7. Intellectual Property

7.1. All content and features are protected by copyright and other intellectual property laws.
7.2. You may not copy, modify, or distribute our content without permission.

8. Limitation of Liability

8.1. We are not liable for any damages arising from your use of the service.
8.2. We do not guarantee the accuracy of all medical information provided.

9. Changes to Terms

9.1. We may modify these terms at any time with notice to users.
9.2. Continued use after changes constitutes acceptance of new terms.

10. Governing Law

These terms are governed by local laws and regulations regarding medical services and data protection.''',
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
