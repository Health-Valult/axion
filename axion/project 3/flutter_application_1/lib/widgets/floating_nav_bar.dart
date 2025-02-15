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
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(29),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _navBarItem(icon: Icons.receipt_long, index: 1),
          _navBarItem(icon: Icons.bar_chart,  index: 2),
          _navBarItem(icon: Icons.home,  index: 0),
          _navBarItem(icon: Icons.qr_code,  index: 4),
          _navBarItem(icon: Icons.person, index: 3),
        ],
      ),
    );
  }

  Widget _navBarItem({
    required IconData icon,
    required int index,
  }) {
    final bool isSelected = (currentIndex == index);

    return GestureDetector(
      onTap: () => onItemSelected(index),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: isSelected ? Colors.blue : Colors.grey, size: 32,),
          const SizedBox(height: 0),
          
        ],
      ),
    );
  }
}
