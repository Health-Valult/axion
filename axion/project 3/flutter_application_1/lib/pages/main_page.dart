import 'package:flutter/material.dart';
import 'package:flutter_application_1/pages/home_page.dart';
import 'package:flutter_application_1/pages/log_page.dart';
import 'package:flutter_application_1/pages/reports_page.dart';
import 'package:flutter_application_1/pages/link_page.dart';
import 'package:flutter_application_1/pages/profile_page.dart';
import 'package:flutter_application_1/widgets/floating_nav_bar.dart';


class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _currentIndex = 0;

  final List<Widget> _pages = const [
    HomePage(),
    ReportsPage(),
    LogPage(),
    ProfilePage(),
    LinkPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(child: _pages[_currentIndex]),
          Positioned(
            left: 0,
            right: 0,
            bottom:22,
            child: Center(
              child: FloatingNavBar(
                currentIndex: _currentIndex,
                onItemSelected: (index) {
                  setState(() => _currentIndex = index);
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
