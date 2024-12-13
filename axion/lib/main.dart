import 'package:axion/pages/splashScreen/splashScreen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

void main() {
  runApp(const MainApp());
}

final GoRouter _router = GoRouter(

    routes: <RouteBase>[
      GoRoute(
        path: '/',
        builder: (context,state)=>SplashScreen()
      )
    ]
);

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return  MaterialApp.router(
      routerConfig: _router,
    );
  }
}
