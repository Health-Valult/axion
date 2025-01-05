import 'package:flutter/material.dart';

class FloatingNavBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onItemSelected;

  const FloatingNavBar({
    super.key,
    required this.currentIndex,
    required this.onItemSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      width: MediaQuery.of(context).size.width * 0.9,
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A1A),
        borderRadius: BorderRadius.circular(30),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _navBarItem(icon: Icons.home, label: 'Home', index: 0),
          _navBarItem(icon: Icons.receipt_long, label: 'Reports', index: 1),
          _navBarItem(icon: Icons.bar_chart, label: 'Stats', index: 2),
          _navBarItem(icon: Icons.person, label: 'Profile', index: 3),
        ],
      ),
    );
  }

  Widget _navBarItem({
  required IconData icon,
  required String label,
  required int index,
}) {
  final bool isSelected = (currentIndex == index);
  return GestureDetector(
    onTap: () => onItemSelected(index),
    behavior: HitTestBehavior.translucent, // Ensures taps are registered in the extended area
    child: Container(
      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0), // Added padding for better clickability
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: isSelected ? Colors.blue : Colors.grey),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: isSelected ? Colors.blue : Colors.grey,
            ),
          ),
        ],
      ),
    ),
  );
}
}
