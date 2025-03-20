import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart'; 
import 'package:flutter_application_1/loginSide/widgets/terms_conditions_dialog.dart';

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

    // Debug print to verify Step 1 data
    print('Step2 Init - Step 1 data saved: ${widget.step1DataSaved}');
    print('First Name: ${widget.signupData.FirstName}');
    print('Last Name: ${widget.signupData.LastName}');
    print('Email: ${widget.signupData.Email}');
  }

  @override
  void didUpdateWidget(SignupStep2 oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Debug print when widget updates
    print('Step2 Updated - Step 1 data saved: ${widget.step1DataSaved}');
    print('First Name: ${widget.signupData.FirstName}');
    print('Last Name: ${widget.signupData.LastName}');
    print('Email: ${widget.signupData.Email}');
  }

  String _formatDate(int date) {
    String dateStr = date.toString();
    if (dateStr.length != 8) return '';
    return '${dateStr.substring(2, 4)}/${dateStr.substring(4, 6)}/${dateStr.substring(0, 2)}${dateStr.substring(6)}';
  }

  int _parseDateToInt(String date) {
    // Convert from MM/DD/YYYY to YYYYMMDD
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
    if (!widget.formKey.currentState!.validate()) {
      return;
    }

    if (!widget.step1DataSaved) {
      setState(() {
        _error = 'Please complete Step 1 first';
      });
      return;
    }

    // Update signup data before validation
    widget.signupData.Password = _passwordController.text;
    widget.signupData.Telephone = _phoneController.text.trim();
    widget.signupData.NIC = _nicController.text.trim();
    widget.signupData.DateOfBirth = _parseDateToInt(_dobController.text.trim());

    // Debug print to verify all data before showing terms
    print('\n=== Signup Data Before Terms ===');
    print('First Name: ${widget.signupData.FirstName}');
    print('Last Name: ${widget.signupData.LastName}');
    print('Email: ${widget.signupData.Email}');
    print('NIC: ${widget.signupData.NIC}');
    print('Phone: ${widget.signupData.Telephone}');
    print('DOB: ${widget.signupData.DateOfBirth}');
    print('Password: ${widget.signupData.Password}');
    print('===========================\n');

    final bool? accepted = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) => const TermsAndConditionsDialog(),
    );

    if (accepted != true) {
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // Send OTP before moving to next step
      print('\n=== Sending OTP ===');
      final otpResponse = await _apiService.sendOTP(
        widget.signupData.Email,
        otpType: 'email',
      );
      
      if (otpResponse['success'] == true) {
        print('✅ OTP Sent Successfully');
        if (mounted) {
          widget.onNext(); // Navigate to OTP page
        }
      } else {
        print('❌ OTP Send Failed');
        final error = otpResponse['error'] ?? 'Failed to send OTP';
        print('Error: $error');
        setState(() {
          _error = error;
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
                hintText: 'NIC Number',
                enabled: !_isLoading,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'NIC number is required';
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _dobController,
                hintText: 'Date of Birth (MM/DD/YYYY)',
                enabled: !_isLoading,
                keyboardType: TextInputType.number,
                inputFormatters: [dateMaskFormatter],
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Date of Birth is required';
                  }
                  if (!RegExp(r'^\d{2}/\d{2}/\d{4}$').hasMatch(value)) {
                    return 'Please enter a valid date (MM/DD/YYYY)';
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _phoneController,
                hintText: 'Phone Number',
                enabled: !_isLoading,
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Phone number is required';
                  }
                  if (!RegExp(r'^\d{10}$').hasMatch(value.replaceAll(RegExp(r'[^\d]'), ''))) {
                    return 'Please enter a valid 10-digit phone number';
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _passwordController,
                hintText: 'Password',
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
                    return 'Password is required';
                  }
                  if (value.length < 8) {
                    return 'Password must be at least 8 characters';
                  }
                  if (!RegExp(r'[A-Z]').hasMatch(value)) {
                    return 'Password must contain at least one uppercase letter';
                  }
                  if (!RegExp(r'[a-z]').hasMatch(value)) {
                    return 'Password must contain at least one lowercase letter';
                  }
                  if (!RegExp(r'[0-9]').hasMatch(value)) {
                    return 'Password must contain at least one number';
                  }
                  if (!RegExp(r'[!@#\$&*~]').hasMatch(value)) {
                    return 'Password must contain at least one special character';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              CustomButton(
                onPressed: _isLoading ? null : _validateAndSendData,
                text: 'Next',
                isLoading: _isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
