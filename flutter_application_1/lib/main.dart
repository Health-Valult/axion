import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/pages/login/login_screen.dart';
import 'package:flutter_application_1/loginSide/pages/signup/signup_pageview.dart';
import 'package:flutter_application_1/loginSide/pages/splash/splash_screen.dart';
import 'package:flutter_application_1/pages/main_page.dart';
import 'package:flutter_application_1/services/notification_service.dart';
import 'package:flutter_application_1/services/graphql_config.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_application_1/services/permission_service.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

bool isLoggedIn = false;

/// Load theme
Future<ThemeMode> loadThemeMode() async {
  final prefs = await SharedPreferences.getInstance();
  final saved = prefs.getString('theme_mode') ?? 'dark';
  if (saved == 'light') return ThemeMode.light;
  if (saved == 'dark') return ThemeMode.dark;
  return ThemeMode.system;
}

/// Load locale
Future<String> loadLocaleCode() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('locale') ?? 'en';
}

/// Save theme
Future<void> saveThemeMode(ThemeMode mode) async {
  final prefs = await SharedPreferences.getInstance();
  final modeString = mode.name;
  await prefs.setString('theme_mode', modeString);
}

/// Save locale
Future<void> saveLocale(String localeCode) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('locale', localeCode);
}

final GoRouter _router = GoRouter(
  refreshListenable: MyApp.localeNotifier, // ✅ Key Fix
  redirect: (context, state) {
    final loggingIn = state.matchedLocation == '/' ||
        state.matchedLocation == '/login' ||
        state.matchedLocation == '/signup';
    if (!isLoggedIn && !loggingIn) return '/login';
    if (isLoggedIn &&
        (state.matchedLocation == '/login' ||
         state.matchedLocation == '/signup')) return '/home';
    return null;
  },
  routes: <RouteBase>[
    GoRoute(path: '/', builder: (context, state) => const SplashScreen()),
    GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
    GoRoute(path: '/signup', builder: (context, state) => const SignupPageView()),
    GoRoute(path: '/home', builder: (context, state) => const MainPage()),
  ],
);

class SecureStorageService {
  final _storage = const FlutterSecureStorage();

  Future<void> init() async {
    await _storage.readAll();
  }
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await NotificationService.initialize();
  await PermissionService.requestAllPermissions();

  final secureStorage = SecureStorageService();
  await secureStorage.init();

  final client = GraphQLConfig.initializeClient();



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
    scaffoldBackgroundColor: const Color.fromARGB(255, 255, 255, 255),
    appBarTheme: const AppBarTheme(
      backgroundColor: Color.fromARGB(255, 255, 255, 255),
      foregroundColor: Colors.black,
    ),
    cardColor: const Color.fromARGB(240, 240, 240, 240),
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
        return GraphQLProvider(
          client: GraphQLConfig.initializeClient(),
          child: MaterialApp.router(
            debugShowCheckedModeBanner: false,
            title: 'Axion App',
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: themeMode,
            locale: locale,
            supportedLocales: const [
              Locale('en'),
              Locale('si'),
              Locale('ta'),
            ],
            localizationsDelegates: const [
              AppLocalizations.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            routerConfig: _router,
          ),
        );
      },
    );
  }
}

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
