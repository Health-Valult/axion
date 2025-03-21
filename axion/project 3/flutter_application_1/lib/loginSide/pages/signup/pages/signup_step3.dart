import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_svg/svg.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SignupStep3 extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final SignupData signupData;

  const SignupStep3({
    Key? key,
    required this.formKey,
    required this.signupData,
  }) : super(key: key);

  @override
  _SignupStep3State createState() => _SignupStep3State();
}

class _SignupStep3State extends State<SignupStep3>
    with AutomaticKeepAliveClientMixin {
  final _otpController = TextEditingController();
  final _apiService = ApiService();
  bool _isLoading = false;
  String? _error;
  bool _isResending = false;

  @override
  void dispose() {
    _otpController.dispose();
    super.dispose();
  }

  Future<void> _resendOTP() async {
    final l10n = AppLocalizations.of(context)!;

    setState(() {
      _isResending = true;
      _error = null;
    });

    try {
      final response = await _apiService.sendOTP(
        widget.signupData.Email,
        otpType: 'email',
      );

      if (response['success'] != true) {
        setState(() {
          _error = response['error'] ?? l10n.resendOtpFailed;
        });
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(l10n.otpResent)),
          );
        }
      }
    } catch (e) {
      setState(() {
        _error = l10n.resendOtpFailed;
      });
    } finally {
      setState(() {
        _isResending = false;
      });
    }
  }

  Future<void> _verifyOTP() async {
    final l10n = AppLocalizations.of(context)!;

    if (!widget.formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final response = await _apiService.verifyOTP(
        widget.signupData.Email,
        _otpController.text.trim(),
      );

      if (response['success'] == true) {
        final signupResponse = await _apiService.signupUser(widget.signupData.toJson());

        if (signupResponse['success'] == true) {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(l10n.signupSuccess)),
            );
            context.go('/login');
          }
        } else {
          final error = signupResponse['error'] ?? l10n.signupFailed;
          setState(() {
            _error = error;
          });
        }
      } else {
        setState(() {
          _error = response['error'] ?? l10n.invalidOtp;
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

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: widget.formKey,
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(bottom: 50.0),
                child: SvgPicture.asset(
                  "assets/img/step_three.svg",
                  width: 200,
                  height: 200,
                  semanticsLabel: l10n.signupStepThreeImage,
                ),
              ),
              if (_error != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 16.0),
                  child: Text(
                    _error!,
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.error,
                      fontSize: 14,
                    ),
                  ),
                ),
              Text(
                l10n.enterOtpHint,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 24),
              CustomTextField(
                controller: _otpController,
                hintText: l10n.enterOtp,
                enabled: !_isLoading,
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n.otpRequired;
                  }
                  if (!RegExp(r'^\d{6}$').hasMatch(value)) {
                    return l10n.invalidOtpFormat;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              CustomButton(
                onPressed: _isLoading ? null : _verifyOTP,
                text: l10n.verify,
                isLoading: _isLoading,
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: _isResending ? null : _resendOTP,
                child: Text(
                  _isResending ? l10n.resending : l10n.resendOtp,
                  style: TextStyle(
                    color: Theme.of(context).primaryColor,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
