import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

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
      color: theme.scaffoldBackgroundColor,
      height: 50,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _navBarItem(context, icon: Icons.medication_outlined, index: 1),
          _navBarItem(context, icon: Icons.bar_chart,   index: 2),
          _navBarItem(context, icon: CupertinoIcons.home,        index: 0),
          _navBarItem(context, icon: Icons.link,     index: 4),
          _navBarItem(context, icon: Icons.account_circle_outlined,      index: 3),
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

    final Color unselectedColor = isDarkMode ? Colors.grey : const Color.fromARGB(255, 101, 101, 101);

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
