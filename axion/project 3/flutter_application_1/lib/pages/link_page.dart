import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
// Import the generated localization file.
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LinkPage extends StatelessWidget {
  const LinkPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Access the localized strings.
    final localizations = AppLocalizations.of(context)!;
    final qrData = 'https://youtu.be/ZK1pNGmNBEc?si=cZpt49r5udf7sNhb';

    return Scaffold(
      appBar: AppBar(
        // Wrap the title in a Row with Flexible so it can wrap onto multiple lines.
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Flexible(
              child: Text(
                localizations.appTitle,
                textAlign: TextAlign.center,
                softWrap: true,
                maxLines: 2,
                // Optionally adjust the style if needed.
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          // Reserve 170 pixels at the bottom.
          final availableHeight = constraints.maxHeight - 170;
          return SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 30),
            child: SizedBox(
              height:
                  availableHeight > 0 ? availableHeight : constraints.maxHeight,
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      localizations.scanToConnect,
                      style: Theme.of(context)
                          .textTheme
                          .headlineSmall
                          ?.copyWith(fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    Card(
                      elevation: 4,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: QrImageView(
                          data: qrData,
                          version: QrVersions.auto,
                          size: 200.0,
                          backgroundColor: Colors.white,
                          semanticsLabel:
                              "QR Code to connect with your doctor", // Optionally localize this as well.
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      localizations.instructionText,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 30),
                    ElevatedButton.icon(
                      onPressed: () {
                        // TODO: Implement share or further action functionality if needed.
                      },
                      icon: const Icon(Icons.share),
                      label: Text(localizations.shareButton),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 24,
                          vertical: 12,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
