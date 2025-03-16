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
    final theme = Theme.of(context);

    return Container(
      // Use the same background color as the app’s scaffold
      color: theme.scaffoldBackgroundColor,
      height: 60,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _navBarItem(context, icon: Icons.receipt_long, index: 1),
          _navBarItem(context, icon: Icons.bar_chart,   index: 2),
          _navBarItem(context, icon: Icons.home,        index: 0),
          _navBarItem(context, icon: Icons.qr_code,     index: 4),
          _navBarItem(context, icon: Icons.person,      index: 3),
        ],
      ),
    );
  }

  Widget _navBarItem(BuildContext context, {
    required IconData icon,
    required int index,
  }) {
    final bool isSelected = (currentIndex == index);
    final theme = Theme.of(context);
    final bool isDarkMode = theme.brightness == Brightness.dark;

    // Unselected icon color: black in light mode, grey in dark mode
    final Color unselectedColor = isDarkMode ? Colors.grey : const Color.fromARGB(255, 101, 101, 101);

    // Keep the same blue color for selected icons in both modes
    final Color selectedColor = Colors.blue;

    return GestureDetector(
      onTap: () => onItemSelected(index),
      child: Icon(
        icon,
        color: isSelected ? selectedColor : unselectedColor,
        size: 32,
      ),
    );
  }
}
