import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/pages/login/login_screen.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:flutter_application_1/services/api_service.dart';
import 'package:flutter_application_1/services/connectivity_service.dart';

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
  final _apiService = ApiService();
  final _connectivityService = ConnectivityService();
  String? _error;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    // Initialize controllers with existing data
    _firstNameController.text = widget.signupData.firstName;
    _lastNameController.text = widget.signupData.lastName;
    _emailController.text = widget.signupData.email;
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
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
      // Check internet connectivity first
      final hasInternet = await _connectivityService.checkInternetConnection();
      if (!hasInternet) {
        setState(() {
          _error = 'No internet connection. Please check your network and try again.';
          _isLoading = false;
        });
        return;
      }

      // Validate email with API
      final response = await _apiService.validateEmail(_emailController.text.trim());
      
      if (response['success'] == true) {
        widget.signupData.firstName = _firstNameController.text.trim();
        widget.signupData.lastName = _lastNameController.text.trim();
        widget.signupData.email = _emailController.text.trim();
        widget.onNext();
      } else {
        setState(() {
          _error = response['error'] ?? 'Email validation failed';
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Network error occurred. Please try again.';
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
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.error.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.error_outline,
                          color: Theme.of(context).colorScheme.error,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            _error!,
                            style: TextStyle(
                              color: Theme.of(context).colorScheme.error,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              CustomTextField(
                controller: _firstNameController,
                hintText: 'First Name',
                enabled: !_isLoading,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'First Name cannot be empty';
                  }
                  if (!RegExp(r'^[a-zA-Z]+(?: [a-zA-Z]+)*$').hasMatch(value)) {
                    return 'Please enter letters only';
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _lastNameController,
                hintText: 'Last Name',
                enabled: !_isLoading,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Last Name cannot be empty';
                  }
                  if (!RegExp(r'^[a-zA-Z]+(?: [a-zA-Z]+)*$').hasMatch(value)) {
                    return 'Please enter letters only';
                  }
                  return null;
                },
              ),
              CustomTextField(
                controller: _emailController,
                hintText: 'Email',
                enabled: !_isLoading,
                keyboardType: TextInputType.emailAddress,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Email cannot be empty';
                  }
                  final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
                  if (!emailRegex.hasMatch(value)) {
                    return 'Enter a valid email address';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 40),
              CustomButton(
                text: 'Next',
                onPressed: _isLoading ? null : () {
                  _validateAndSaveData();
                },
                isLoading: _isLoading,
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Already have an account? ',
                    style: TextStyle(color: Colors.white),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const LoginScreen(),
                        ),
                      );
                    },
                    child: const Text(
                      'Login',
                      style: TextStyle(
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
