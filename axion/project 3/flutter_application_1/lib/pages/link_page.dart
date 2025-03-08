import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:flutter_application_1/models/link.dart';
// ignore: depend_on_referenced_packages
import 'package:share_plus/share_plus.dart';

class LinkPage extends StatefulWidget {
  const LinkPage({super.key});

  @override
  State<LinkPage> createState() => _LinkPageState();
}

class _LinkPageState extends State<LinkPage> {
  final _apiService = ApiService();
  List<Link>? _links;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadLinks();
  }

  Future<void> _loadLinks() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });

      // Only load links, no editing functionality
      final links = await _apiService.getLinks();
      if (links.isEmpty) {
        setState(() {
          _error = 'No active links available';
          _isLoading = false;
        });
        return;
      }
      
      setState(() {
        _links = links;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _shareLink(Link link) async {
    await Share.share('${link.title}\n${link.url}', subject: link.title);
  }

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: Text(localizations.appTitle),
          centerTitle: true,
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(
          title: Text(localizations.appTitle),
          centerTitle: true,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Error: $_error'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _loadLinks,
                child: Text(localizations.retry),
              ),
            ],
          ),
        ),
      );
    }

    if (_links == null || _links!.isEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: Text(localizations.appTitle),
          centerTitle: true,
        ),
        body: Center(
          child: Text(localizations.noLinksAvailable),
        ),
      );
    }

    final activeLink = _links!.first; // Use the first link or implement link selection

    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Flexible(
              child: Text(
                localizations.appTitle,
                textAlign: TextAlign.center,
                softWrap: true,
                maxLines: 2,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: RefreshIndicator(
        onRefresh: _loadLinks,
        child: LayoutBuilder(
          builder: (context, constraints) {
            final availableHeight = constraints.maxHeight - 170;
            return SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 30),
              child: SizedBox(
                height: availableHeight > 0 ? availableHeight : constraints.maxHeight,
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        activeLink.title,
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
                            data: activeLink.url,
                            version: QrVersions.auto,
                            size: 200.0,
                            backgroundColor: Colors.white,
                            semanticsLabel: activeLink.title,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        activeLink.description ?? '',
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 30),
                      ElevatedButton.icon(
                        onPressed: () => _shareLink(activeLink),
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
      ),
    );
  }
}
