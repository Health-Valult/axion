import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/base_report.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_application_1/pages/main_page.dart';
import 'package:hive_flutter/hive_flutter.dart';
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

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();

  // Register adapters for all report types.
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

  // Open the box with the correct type.
  await Hive.openBox<BaseReport>('downloadedReports');

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  static ValueNotifier<ThemeMode> themeNotifier =
      ValueNotifier(ThemeMode.dark);
  static ValueNotifier<Locale> localeNotifier =
      ValueNotifier(const Locale('en'));

  const MyApp({super.key});

  static void setLocale(Locale locale) {
    localeNotifier.value = locale;
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
      builder: (_, themeMode, locale, __) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Flutter Application',
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
          locale: locale,
          themeMode: themeMode,
          theme: lightTheme,
          darkTheme: darkTheme,
          home: const MainPage(),
        );
      },
    );
  }
}

/// Helper for managing two ValueNotifiers simultaneously.
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
