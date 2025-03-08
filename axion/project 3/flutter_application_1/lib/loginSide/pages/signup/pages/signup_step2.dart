import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart'; // <-- New import

class SignupStep2 extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final VoidCallback onNext;
  final SignupData signupData;

  const SignupStep2({
    Key? key,
    required this.formKey,
    required this.onNext,
    required this.signupData,
  }) : super(key: key);

  @override
  _SignupStep2State createState() => _SignupStep2State();
}

class _SignupStep2State extends State<SignupStep2>
    with AutomaticKeepAliveClientMixin {
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _addressController = TextEditingController();
  final _nicController = TextEditingController();
  final _dobController = TextEditingController(); // <-- New controller for DOB

  // New date mask formatter for Date of Birth (MM/DD/YYYY)
  final dateMaskFormatter = MaskTextInputFormatter(
    mask: '##/##/####',
    filter: {"#": RegExp(r'[0-9]')},
    type: MaskAutoCompletionType.lazy,
  );

  final _apiService = ApiService();
  bool _showPassword = false;
  bool _showConfirmPassword = false;
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    // Initialize controllers with existing data
    _passwordController.text = widget.signupData.password;
    _confirmPasswordController.text = widget.signupData.password;
    _phoneController.text = widget.signupData.telephone ?? '';
    _addressController.text = widget.signupData.address ?? '';
    _nicController.text = widget.signupData.nic ?? '';
    _dobController.text = widget.signupData.dateOfBirth ?? ''; // <-- Initialize DOB if available
  }

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _phoneController.dispose();
    _addressController.dispose();
    _nicController.dispose();
    _dobController.dispose(); // <-- Dispose DOB controller
    super.dispose();
  }

  Future<void> _validateAndSaveData() async {
    if (!widget.formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // Send OTP to the phone number
      final response = await _apiService.sendOTP(_phoneController.text.trim());
      
      if (response['success'] == true) {
        widget.signupData.password = _passwordController.text;
        widget.signupData.telephone = _phoneController.text.trim();
        widget.signupData.address = _addressController.text.trim();
        widget.signupData.nic = _nicController.text.trim();
        widget.signupData.dateOfBirth = _dobController.text.trim(); // <-- Save DOB value
        widget.onNext();
      } else {
        setState(() {
          _error = response['error'] ?? 'Failed to send OTP';
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
              // New Date of Birth Field with automatic slash insertion
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
                  // You can add further validation if needed
                  return null;
                },
              ),
              CustomTextField(
                controller: _nicController,
                hintText: 'NIC Number',
                enabled: !_isLoading,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'NIC number is required';
                  }
                  // Add NIC validation pattern if needed
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
              CustomTextField(
                controller: _confirmPasswordController,
                hintText: 'Confirm Password',
                enabled: !_isLoading,
                obscureText: !_showConfirmPassword,
                suffixIcon: IconButton(
                  icon: Icon(
                    _showConfirmPassword ? Icons.visibility : Icons.visibility_off,
                  ),
                  onPressed: () {
                    setState(() {
                      _showConfirmPassword = !_showConfirmPassword;
                    });
                  },
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please confirm your password';
                  }
                  if (value != _passwordController.text) {
                    return 'Passwords do not match';
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
                  if (!RegExp(r'^\+?[\d\s-]{10,}$').hasMatch(value)) {
                    return 'Enter a valid phone number';
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _addressController,
                hintText: 'Address',
                enabled: !_isLoading,
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Address is required';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 40),
              CustomButton(
                text: 'Next',
                onPressed: _isLoading ? null : _validateAndSaveData,
                isLoading: _isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
