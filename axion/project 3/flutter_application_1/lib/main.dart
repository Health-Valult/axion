import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/pages/login/login_screen.dart';
import 'package:flutter_application_1/loginSide/pages/signup/signup_pageview.dart';
import 'package:flutter_application_1/loginSide/pages/splash/splash_screen.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_application_1/pages/main_page.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/models/report.dart';
import 'package:flutter_application_1/models/cbc_report.dart';
import 'package:flutter_application_1/models/serum_chloride_report.dart';
import 'package:flutter_application_1/models/serum_sodium_report.dart';
import 'package:flutter_application_1/models/hba1c_report.dart';
import 'package:flutter_application_1/models/serum_potassium_report.dart';
import 'package:flutter_application_1/models/lipid_profile_report.dart';
import 'package:flutter_application_1/models/liver_function_test_report.dart';
import 'package:flutter_application_1/models/thyroid_function_test_report.dart';
import 'package:flutter_application_1/models/crp_report.dart';
import 'package:flutter_application_1/models/serum_creatinine_report.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Global authentication flag (for demo purposes).
bool isLoggedIn = false;

/// Load the saved theme mode from SharedPreferences.
Future<ThemeMode> loadThemeMode() async {
  final prefs = await SharedPreferences.getInstance();
  final saved = prefs.getString('theme_mode') ?? 'dark';
  if (saved == 'light') return ThemeMode.light;
  if (saved == 'dark') return ThemeMode.dark;
  return ThemeMode.system;
}

/// Load the saved locale code from SharedPreferences.
Future<String> loadLocaleCode() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('locale') ?? 'en';
}

/// Save the theme mode to SharedPreferences.
Future<void> saveThemeMode(ThemeMode mode) async {
  final prefs = await SharedPreferences.getInstance();
  String modeString;
  switch (mode) {
    case ThemeMode.dark:
      modeString = 'dark';
      break;
    case ThemeMode.light:
      modeString = 'light';
      break;
    default:
      modeString = 'system';
      break;
  }
  await prefs.setString('theme_mode', modeString);
}

/// Save the locale code to SharedPreferences.
Future<void> saveLocale(String localeCode) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('locale', localeCode);
}

/// GoRouter configuration with redirection based on authentication.
final GoRouter _router = GoRouter(
  redirect: (context, state) {
    // Allow access to splash, login, and signup pages.
    final loggingIn = state.matchedLocation == '/' ||
        state.matchedLocation == '/login' ||
        state.matchedLocation == '/signup';
    if (!isLoggedIn && !loggingIn) return '/login';
    if (isLoggedIn && (state.matchedLocation == '/login' || state.matchedLocation == '/signup')) return '/home';
    return null;
  },
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/signup',
      builder: (context, state) => const SignupPageView(),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const MainPage(), // MainPage includes your nav bar and other features.
    ),
  ],
);

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Hive and register adapters.
  await Hive.initFlutter();
  Hive.registerAdapter(ReportAdapter());
  Hive.registerAdapter(CBCReportAdapter());
  Hive.registerAdapter(SerumChlorideReportAdapter());
  Hive.registerAdapter(SerumSodiumReportAdapter());
  Hive.registerAdapter(HBA1cReportAdapter());
  Hive.registerAdapter(SerumPotassiumReportAdapter());
  Hive.registerAdapter(LipidProfileReportAdapter());
  Hive.registerAdapter(LiverFunctionTestReportAdapter());
  Hive.registerAdapter(ThyroidFunctionTestReportAdapter());
  Hive.registerAdapter(CRPReportAdapter());
  Hive.registerAdapter(SerumCreatinineReportAdapter());
  // Open the box once.
  await Hive.openBox<BaseReport>('downloadedReports');

  // Load persistent settings.
  final themeMode = await loadThemeMode();
  final localeCode = await loadLocaleCode();

  MyApp.themeNotifier.value = themeMode;
  MyApp.localeNotifier.value = Locale(localeCode);

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  static ValueNotifier<ThemeMode> themeNotifier = ValueNotifier(ThemeMode.dark);
  static ValueNotifier<Locale> localeNotifier = ValueNotifier(const Locale('en'));

  static void setLocale(Locale locale) {
    localeNotifier.value = locale;
    saveLocale(locale.languageCode);
  }

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // Use your original dark and light themes.
  final ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    primarySwatch: Colors.deepOrange,
    scaffoldBackgroundColor: const Color.fromARGB(255, 21, 23, 28),
    appBarTheme: const AppBarTheme(
      backgroundColor: Color.fromARGB(255, 21, 23, 28),
    ),
    cardColor: const Color.fromARGB(255, 13, 14, 18),
    textTheme: ThemeData.dark().textTheme.apply(
          bodyColor: Colors.white,
          displayColor: Colors.white,
        ),
  );

  final ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    primarySwatch: Colors.deepOrange,
    scaffoldBackgroundColor: const Color.fromARGB(255, 189, 189, 189),
    appBarTheme: const AppBarTheme(
      backgroundColor: Color.fromARGB(255, 189, 189, 189),
      foregroundColor: Colors.black,
    ),
    cardColor: const Color.fromARGB(255, 255, 255, 255),
    textTheme: ThemeData.light().textTheme.apply(
          bodyColor: Colors.black,
          displayColor: Colors.black,
        ),
  );

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder2<ThemeMode, Locale>(
      first: MyApp.themeNotifier,
      second: MyApp.localeNotifier,
      builder: (context, themeMode, locale, _) {
        return MaterialApp.router(
          debugShowCheckedModeBanner: false,
          title: 'Axion App',
          theme: lightTheme,
          darkTheme: darkTheme,
          themeMode: themeMode,
          routerConfig: _router,
          supportedLocales: const [Locale('en'), Locale('si'), Locale('ta')],
          localizationsDelegates: const [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          locale: locale,
        );
      },
    );
  }
}

/// Helper widget to combine two ValueNotifiers.
class ValueListenableBuilder2<A, B> extends StatelessWidget {
  final ValueNotifier<A> first;
  final ValueNotifier<B> second;
  final Widget Function(BuildContext, A, B, Widget?) builder;

  const ValueListenableBuilder2({
    required this.first,
    required this.second,
    required this.builder,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<A>(
      valueListenable: first,
      builder: (context, firstValue, _) {
        return ValueListenableBuilder<B>(
          valueListenable: second,
          builder: (context, secondValue, __) {
            return builder(context, firstValue, secondValue, null);
          },
        );
      },
    );
  }
}
