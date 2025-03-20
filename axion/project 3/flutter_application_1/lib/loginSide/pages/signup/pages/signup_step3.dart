import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:go_router/go_router.dart';

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
          _error = response['error'] ?? 'Failed to resend OTP';
        });
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('OTP resent successfully')),
          );
        }
      }
    } catch (e) {
      setState(() {
        _error = 'Failed to resend OTP';
      });
    } finally {
      setState(() {
        _isResending = false;
      });
    }
  }

  Future<void> _verifyOTP() async {
    if (!widget.formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      print('\n=== Verifying OTP ===');
      final response = await _apiService.verifyOTP(
        widget.signupData.Email,
        _otpController.text.trim(),
      );

      if (response['success'] == true) {
        print('✅ OTP Verified Successfully');
        
        // Create account after OTP verification
        print('\n=== Creating Account ===');
        final signupResponse = await _apiService.signupUser(widget.signupData.toJson());
        
        if (signupResponse['success'] == true) {
          print('✅ Account Created Successfully');
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Signup successful!')),
            );
            context.go('/login');
          }
        } else {
          print('❌ Account Creation Failed');
          final error = signupResponse['error'] ?? 'Failed to create account';
          print('Error: $error');
          setState(() {
            _error = error;
          });
        }
      } else {
        print('❌ OTP Verification Failed');
        setState(() {
          _error = response['error'] ?? 'Invalid OTP';
        });
      }
    } catch (e) {
      print('❌ API Call Error');
      print('Error: ${e.toString()}');
      setState(() {
        _error = e.toString();
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
      print('===========================\n');
    }
  }

  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: widget.formKey,
          child: Column(
            children: [
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
              const Text(
                'Please enter the verification code sent to your email',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 24),
              CustomTextField(
                controller: _otpController,
                hintText: 'Enter OTP',
                enabled: !_isLoading,
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'OTP is required';
                  }
                  if (!RegExp(r'^\d{6}$').hasMatch(value)) {
                    return 'Please enter a valid 6-digit OTP';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              CustomButton(
                onPressed: _isLoading ? null : _verifyOTP,
                text: 'Verify',
                isLoading: _isLoading,
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: _isResending ? null : _resendOTP,
                child: Text(
                  _isResending ? 'Resending...' : 'Resend OTP',
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
