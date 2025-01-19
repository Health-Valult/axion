import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

class LinkPage extends StatelessWidget {
  const LinkPage({super.key});

  @override
  Widget build(BuildContext context) {
    // In a real app, you’d get a user ID from your auth system, or generate
    // a unique link that references the user’s data. For demo, we’ll just hard-code:
    final userId = 'user123';
    final qrData = 'https://myapp.com/share?userId=$userId';

    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Link'),
        backgroundColor: Colors.black,
      ),
      body: Center(
        // child: QrImage(
        //   data: qrData,
        //   version: QrVersions.auto,
        //   size: 200.0,
        //   backgroundColor: Colors.white, // QR code is black by default
        // ),
      ),
    );
  }
}
