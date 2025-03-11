import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:go_router/go_router.dart';

class SignupStep3 extends StatefulWidget {
  final SignupData signupData;

  const SignupStep3({
    Key? key,
    required this.signupData,
  }) : super(key: key);

  @override
  _SignupStep3State createState() => _SignupStep3State();
}

class _SignupStep3State extends State<SignupStep3>
    with AutomaticKeepAliveClientMixin {
  final List<TextEditingController> _otpControllers =
      List.generate(6, (index) => TextEditingController());
  final List<FocusNode> _focusNodes =
      List.generate(6, (index) => FocusNode());
  final _apiService = ApiService();
  bool _isLoading = false;
  String? _error;

  @override
  void dispose() {
    for (var controller in _otpControllers) {
      controller.dispose();
    }
    for (var node in _focusNodes) {
      node.dispose();
    }
    super.dispose();
  }

  @override
  bool get wantKeepAlive => true;

  Future<void> _resendOTP() async {
    try {
      setState(() => _isLoading = true);
      
      // Call resend OTP API with email
      final result = await _apiService.sendOTP(
        widget.signupData.email!,
        otpType: 'email'
      );
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(result['success'] ? 'OTP resent successfully' : result['error'])),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to resend OTP')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  Future<void> _validateAndSubmitOTP() async {
    final otp = _otpControllers.map((c) => c.text).join();
    if (otp.length != 6) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all OTP boxes')),
      );
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // First validate the OTP with email
      final otpValidation = await _apiService.validateOTP(
        widget.signupData.email!,
        otp,
        otpType: 'email'
      );

      if (!otpValidation['success']) {
        setState(() {
          _error = otpValidation['error'] ?? 'Invalid OTP';
        });
        return;
      }

      // If OTP is valid, proceed with signup
      final result = await _apiService.signupUser({
        'nic': widget.signupData.nic,
        'password': widget.signupData.password,
        'firstName': widget.signupData.firstName,
        'lastName': widget.signupData.lastName,
        'email': widget.signupData.email,
        'phoneNumber': widget.signupData.telephone,
        'address': widget.signupData.address,
        'otp': otp,
      });

      if (mounted) {
        if (result['success']) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Signup successful!')),
          );
          // Delay to allow the SnackBar to show before navigating
          Future.delayed(const Duration(seconds: 1), () {
            if (mounted) {
              context.go('/login');
            }
          });
        } else {
          setState(() {
            _error = result['error'];
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(_error ?? 'Signup failed')),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(_error!)),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'We have sent an OTP to your registered email address. Please enter it below.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 14, color: Colors.white),
            ),
            const SizedBox(height: 20),
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
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                6,
                (index) => Container(
                  width: 50,
                  margin: const EdgeInsets.symmetric(horizontal: 5),
                  child: TextField(
                    controller: _otpControllers[index],
                    focusNode: _focusNodes[index],
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    maxLength: 1,
                    enabled: !_isLoading,
                    decoration: InputDecoration(
                      counterText: '',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    onChanged: (value) {
                      if (value.length == 1 && index < 5) {
                        FocusScope.of(context)
                            .requestFocus(_focusNodes[index + 1]);
                      } else if (value.isEmpty && index > 0) {
                        FocusScope.of(context)
                            .requestFocus(_focusNodes[index - 1]);
                      }
                    },
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            GestureDetector(
              onTap: _isLoading ? null : _resendOTP,
              child: Text(
                'Resend OTP',
                style: TextStyle(
                  color: _isLoading ? Colors.grey : Colors.red,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 40),
            CustomButton(
              text: 'Verify & Sign Up',
              onPressed: _isLoading ? null : _validateAndSubmitOTP,
              isLoading: _isLoading,
            ),
          ],
        ),
      ),
    );
  }
}
