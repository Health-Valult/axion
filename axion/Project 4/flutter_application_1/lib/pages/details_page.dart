import 'package:flutter/material.dart';

class DetailsPage extends StatelessWidget {
  final String title;
  final List<String> items;

  const DetailsPage({
    super.key,
    required this.title,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        backgroundColor: Colors.black,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(vertical: 8),
        itemCount: items.length,
        itemBuilder: (_, index) {
          return ListTile(
            title: Text(items[index]),
          );
        },
      ),
    );
  }
}
