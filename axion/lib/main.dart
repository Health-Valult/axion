import 'package:axion/pages/login/loginScreen.dart';
import 'package:axion/pages/signup/signupScreen.dart';
import 'package:axion/pages/splash/splashScreen.dart';
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
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => SignupScreen(),
      )
    ]
);

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return  MaterialApp.router(
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
        textTheme: TextTheme(
          displayLarge: TextStyle(),
          displayMedium: TextStyle(),
          displaySmall: TextStyle(),
          
        )
      ),
      darkTheme: ThemeData(
        scaffoldBackgroundColor: Color.fromARGB(255, 21, 23, 28),
      ),
      themeMode: ThemeMode.dark,
      routerConfig: _router,
    );
  }
}