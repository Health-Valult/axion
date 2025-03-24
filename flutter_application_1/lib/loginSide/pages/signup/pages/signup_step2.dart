import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:flutter_application_1/loginSide/widgets/terms_conditions_dialog.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SignupStep2 extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final VoidCallback onNext;
  final SignupData signupData;
  final bool step1DataSaved;

  const SignupStep2({
    Key? key,
    required this.formKey,
    required this.onNext,
    required this.signupData,
    required this.step1DataSaved,
  }) : super(key: key);

  @override
  _SignupStep2State createState() => _SignupStep2State();
}

class _SignupStep2State extends State<SignupStep2>
    with AutomaticKeepAliveClientMixin {
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _nicController = TextEditingController();
  final _dobController = TextEditingController();

  final dateMaskFormatter = MaskTextInputFormatter(
    mask: '##/##/####',
    filter: {"#": RegExp(r'[0-9]')},
    type: MaskAutoCompletionType.lazy,
  );

  final _apiService = ApiService();
  bool _showPassword = false;
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _passwordController.text = widget.signupData.Password;
    _phoneController.text = widget.signupData.Telephone;
    _nicController.text = widget.signupData.NIC;
    _dobController.text = widget.signupData.DateOfBirth > 0
        ? _formatDate(widget.signupData.DateOfBirth)
        : '';
  }

  String _formatDate(int date) {
    String dateStr = date.toString();
    if (dateStr.length != 8) return '';
    return '${dateStr.substring(2, 4)}/${dateStr.substring(4, 6)}/${dateStr.substring(0, 2)}${dateStr.substring(6)}';
  }

  int _parseDateToInt(String date) {
    final parts = date.split('/');
    if (parts.length != 3) return 0;
    return int.parse('${parts[2]}${parts[0]}${parts[1]}');
  }

  @override
  void dispose() {
    _passwordController.dispose();
    _phoneController.dispose();
    _nicController.dispose();
    _dobController.dispose();
    super.dispose();
  }

  Future<void> _validateAndSendData() async {
    final l10n = AppLocalizations.of(context)!;

    if (!widget.formKey.currentState!.validate()) {
      return;
    }

    if (!widget.step1DataSaved) {
      setState(() {
        _error = l10n.signupStep1Incomplete;
      });
      return;
    }

    widget.signupData.Password = _passwordController.text;
    widget.signupData.Telephone = _phoneController.text.trim();
    widget.signupData.NIC = _nicController.text.trim();
    widget.signupData.DateOfBirth = _parseDateToInt(_dobController.text.trim());

    final bool? accepted = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) => const TermsAndConditionsDialog(),
    );

    if (accepted != true) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final otpResponse = await _apiService.sendOTP(
        widget.signupData.Email,
        otpType: 'email',
      );

      if (otpResponse['success'] == true) {
        if (mounted) widget.onNext();
      } else {
        final error = otpResponse['error'] ?? l10n.otpSendFailed;
        setState(() {
          _error = error;
        });
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
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
              Padding(
                padding: const EdgeInsets.only(bottom: 50.0),
                child: SvgPicture.asset(
                  "assets/img/step_two.svg",
                  width: 200,
                  height: 200,
                  semanticsLabel: l10n.signupStepTwoImage,
                ),
              ),
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
                    l10n.signupStepTwoTagline,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              if (_error != null)
                Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.red.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.error_outline, color: Colors.red),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          _error!,
                          style: const TextStyle(color: Colors.red),
                        ),
                      ),
                    ],
                  ),
                ),
              CustomTextField(
                controller: _nicController,
                hintText: l10n.nic,
                enabled: !_isLoading,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n.nicRequired;
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _dobController,
                hintText: l10n.dobHint,
                enabled: !_isLoading,
                keyboardType: TextInputType.number,
                inputFormatters: [dateMaskFormatter],
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n.dobRequired;
                  }
                  if (!RegExp(r'^\d{2}/\d{2}/\d{4}$').hasMatch(value)) {
                    return l10n.dobInvalidFormat;
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _phoneController,
                hintText: l10n.phone,
                enabled: !_isLoading,
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n.phoneRequired;
                  }
                  if (!RegExp(r'^\d{10}$').hasMatch(value.replaceAll(RegExp(r'[^\d]'), ''))) {
                    return l10n.phoneInvalid;
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _passwordController,
                hintText: l10n.passwordLabel,
                enabled: !_isLoading,
                obscureText: !_showPassword,
                suffixIcon: IconButton(
                  icon: Icon(
                    _showPassword ? Icons.visibility : Icons.visibility_off,
                  ),
                  onPressed: () {
                    setState(() {
                      _showPassword = !_showPassword;
                    });
                  },
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return l10n.passwordValidationEmpty;
                  }
                  if (value.length < 8) {
                    return l10n.passwordValidationLength;
                  }
                  if (RegExp(r'[A-Z]').allMatches(value).length < 2) {
                    return l10n.passwordValidationMinUpper; // new key: "At least 2 uppercase letters required."
                  }
                  if (!RegExp(r'[a-z]').hasMatch(value)) {
                    return l10n.passwordValidationLower;
                  }
                  if (RegExp(r'\d').allMatches(value).length < 3) {
                    return l10n.passwordValidationDigits; // new key: "At least 3 numbers required."
                  }
                  if (!RegExp(r'[!@#\$&*~]').hasMatch(value)) {
                    return l10n.passwordValidationSpecial;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              CustomButton(
                onPressed: _isLoading ? null : _validateAndSendData,
                text: l10n.next,
                isLoading: _isLoading,
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
