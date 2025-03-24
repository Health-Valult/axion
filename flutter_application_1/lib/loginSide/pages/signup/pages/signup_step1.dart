import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SignupStep1 extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final VoidCallback onNext;
  final SignupData signupData;

  const SignupStep1({
    Key? key,
    required this.formKey,
    required this.onNext,
    required this.signupData,
  }) : super(key: key);

  @override
  _SignupStep1State createState() => _SignupStep1State();
}

class _SignupStep1State extends State<SignupStep1>
    with AutomaticKeepAliveClientMixin {
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _emailController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _firstNameController.text = widget.signupData.FirstName;
    _lastNameController.text = widget.signupData.LastName;
    _emailController.text = widget.signupData.Email;
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  void _validateAndProceed() {
    final formState = widget.formKey.currentState;
    if (formState == null) {
      print('Form state is null in SignupStep1');
      return;
    }

    if (formState.validate()) {
      widget.signupData.FirstName = _firstNameController.text.trim();
      widget.signupData.LastName = _lastNameController.text.trim();
      widget.signupData.Email = _emailController.text.trim();

      formState.save();
      widget.onNext();
    } else {
      print('Validation failed in SignupStep1');
    }
  }

  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final l10n = AppLocalizations.of(context)!;
    final defaultStyle = Theme.of(context).textTheme.bodyMedium?.copyWith(fontSize: 16) ??
        const TextStyle(fontSize: 16);
    return SingleChildScrollView(
      physics: const ClampingScrollPhysics(),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: widget.formKey,
          child: Column(
            children: [
              // Image for Signup Step 1 (200x200)
              Padding(
                padding: const EdgeInsets.only(bottom: 50.0),
                child: SvgPicture.asset(
                  "assets/img/step_one.svg",
                  width: 200,
                  height: 200,
                  semanticsLabel: l10n.signupStepOneImage,
                ),
              ),
              // Gradient text
              Padding(
                padding: const EdgeInsets.only(bottom: 30.0),
                child: ShaderMask(
                  shaderCallback: (Rect bounds) {
                    return const LinearGradient(
                      colors: [
                        Color.fromARGB(255, 255, 136, 34),
                        Color.fromARGB(255, 251, 48, 48),
                        Color.fromARGB(255, 255, 177, 41)
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ).createShader(bounds);
                  },
                  child: Text(
                    l10n.signupStepOneTagline,
                    style: GoogleFonts.montserrat(
                      textStyle: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
              // Input fields
              CustomTextField(
                controller: _firstNameController,
                hintText: l10n.firstName,
                onSaved: (value) {
                  if (value != null) {
                    widget.signupData.FirstName = value.trim();
                  }
                },
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n.firstNameRequired;
                  }
                  if (!RegExp(r'^[a-zA-Z]+(?: [a-zA-Z]+)*$').hasMatch(value)) {
                    return l10n.nameValidation;
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _lastNameController,
                hintText: l10n.lastName,
                onSaved: (value) {
                  if (value != null) {
                    widget.signupData.LastName = value.trim();
                  }
                },
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n.lastNameRequired;
                  }
                  if (!RegExp(r'^[a-zA-Z]+(?: [a-zA-Z]+)*$').hasMatch(value)) {
                    return l10n.nameValidation;
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _emailController,
                hintText: l10n.emailLabel,
                keyboardType: TextInputType.emailAddress,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return l10n.emailValidationEmpty;
                  }
                  if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
                    return l10n.emailValidationInvalid;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              CustomButton(
                onPressed: _validateAndProceed,
                text: l10n.next,
              ),
              const SizedBox(height: 16),
              RichText(
                text: TextSpan(
                  style: defaultStyle,
                  children: [
                    TextSpan(text: l10n.alreadyHaveAccount),
                    TextSpan(
                      text: l10n.loginButton,
                      style: const TextStyle(color: Colors.red),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          context.push('/login');
                        },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
