import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_1/loginSide/components/button.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.brightness == Brightness.dark ? Colors.white : Colors.black;
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 30.0),
                  child: Hero(
                    tag: 'logo',
                    child: SvgPicture.asset(
                      "assets/img/Logo.svg",
                      width: 200,
                      height: 200,
                      semanticsLabel: l10n.splashScreenLogo,
                    ),
                  ),
                ),
                Text(
                  l10n.appName,
                  style: GoogleFonts.montserrat(
                    textStyle: TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 25,
                      color: textColor,
                    ),
                  ),
                ),
              ],
            ),
            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 30.0),
                  child: LoginButton(
                    onPressed: (context) => context.push("/login"),
                  ),
                ),
                SizedBox(
                  width: 350,
                  height: 60,
                  child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12.0),
                      ),
                      side: BorderSide(color: textColor.withOpacity(0.5)),
                    ),
                    onPressed: () => context.push('/signup'),
                    child: Text(
                      l10n.signupButton,
                      style: GoogleFonts.montserrat(
                        textStyle: TextStyle(
                          color: textColor.withOpacity(0.5),
                          fontSize: 20,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
