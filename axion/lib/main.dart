import 'package:axion/pages/home/home_screen.dart';
import 'package:axion/pages/login/login_screen.dart';
import 'package:axion/pages/signup/signup_screen.dart';
import 'package:axion/pages/splash/splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';


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
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => HomeScreen(),
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
        
      ),
      darkTheme: ThemeData(
        scaffoldBackgroundColor: Color.fromARGB(255, 21, 23, 28),
        textTheme: TextTheme(

          labelMedium: GoogleFonts.montserrat(
            textStyle: TextStyle(
              color: Color.fromRGBO(255, 255, 255, 0.5),
              fontSize: 20
            )
          ),
          labelSmall: GoogleFonts.montserrat(
            textStyle: TextStyle(
              color: Color.fromRGBO(255, 255, 255, 1),
              fontSize: 20
            )
          ),

        )
      ),
      themeMode: ThemeMode.dark,
      routerConfig: _router,
    );
  }
}