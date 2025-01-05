import 'package:flutter/material.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/custom_button.dart';
import '../widgets/progress_bar.dart';

class SignupPageView extends StatefulWidget {
  const SignupPageView({Key? key}) : super(key: key);

  @override
  State<SignupPageView> createState() => _SignupPageViewState();
}

class _SignupPageViewState extends State<SignupPageView> {
  final PageController _pageController = PageController();
  final _formKeys = List.generate(3, (index) => GlobalKey<FormState>());

  int _currentPage = 0;

  void _nextPage() {
    // Only proceed if current form is valid
    if (_formKeys[_currentPage].currentState?.validate() ?? false) {
      if (_currentPage < 2) {
        setState(() => _currentPage++);
        _pageController.animateToPage(
          _currentPage,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Signup Complete!')),
        );
      }
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      setState(() => _currentPage--);
      _pageController.animateToPage(
        _currentPage,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    // Conditional title so that Step 3 shows a different title
    final pageTitle = _currentPage == 2 ? 'Enter Verification Code' : 'Sign up';

    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        leading: _currentPage > 0
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: _previousPage,
              )
            : null,
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 60),
            Text(
              pageTitle,
              style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ProgressBar(currentStep: _currentPage + 1),
            const SizedBox(height: 40),
            Expanded(
              child: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                onPageChanged: (index) {
                  setState(() {
                    _currentPage = index;
                  });
                },
                children: [
                  _buildSignupStep1(),
                  _buildSignupStep2(),
                  _buildSignupStep3(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// Step 1: Basic Details
  Widget _buildSignupStep1() {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKeys[0],
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomTextField(
                hintText: 'First Name',
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'First Name cannot be empty';
                  }
                  // Letters-only validation (allowing spaces if you want)
                  if (!RegExp(r'^[a-zA-Z]+(?: [a-zA-Z]+)*$').hasMatch(value)) {
                    return 'Please enter letters only';
                  }
                  return null;
                },
              ),
              CustomTextField(
                hintText: 'Last Name',
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Last Name cannot be empty';
                  }
                  // Letters-only validation (allowing spaces if you want)
                  if (!RegExp(r'^[a-zA-Z]+(?: [a-zA-Z]+)*$').hasMatch(value)) {
                    return 'Please enter letters only';
                  }
                  return null;
                },
              ),
              CustomTextField(
                hintText: 'Email',
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
              CustomButton(text: 'Next', onPressed: _nextPage),
              const SizedBox(height: 20),

              // --- FIX #1: Row for alignment + red "Login" text ---
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Already have an account? ',
                    style: TextStyle(color: Colors.white),
                  ),
                  GestureDetector(
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Navigate to Login Page Placeholder'),
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
              // ----------------------------------------------------
            ],
          ),
        ),
      ),
    );
  }

  /// Step 2: Additional Details
  Widget _buildSignupStep2() {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKeys[1],
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomTextField(
                hintText: 'Telephone',
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Telephone cannot be empty';
                  }
                  // Numbers-only validation
                  if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
                    return 'Telephone can only contain digits';
                  }
                  return null;
                },
              ),
              CustomTextField(
                hintText: 'NIC',
                keyboardType: TextInputType.number,
                validator: (value) =>
                    value?.isEmpty ?? true ? 'NIC cannot be empty' : null,
              ),
              CustomTextField(
                hintText: 'Date of Birth (DD/MM/YYYY)',
                keyboardType: TextInputType.datetime,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Date of Birth cannot be empty';
                  }
                  // Basic regex for DD/MM/YYYY
                  if (!RegExp(r'^\d{2}/\d{2}/\d{4}$').hasMatch(value)) {
                    return 'Date of Birth must be in DD/MM/YYYY format';
                  }

                  // Additional check to see if it's a valid date
                  final parts = value.split('/');
                  final day = int.tryParse(parts[0]);
                  final month = int.tryParse(parts[1]);
                  final year = int.tryParse(parts[2]);

                  if (day == null || month == null || year == null) {
                    return 'Invalid date format';
                  }

                  // Very simplistic checks — you can enhance further
                  if (month < 1 || month > 12) {
                    return 'Invalid month';
                  }
                  if (day < 1 || day > 31) {
                    return 'Invalid day';
                  }

                  // Optional: Check February days, leap years, etc.
                  // For now, a minimal check
                  return null;
                },
              ),
              const SizedBox(height: 40),
              CustomButton(text: 'Next', onPressed: _nextPage),
              const SizedBox(height: 20),

              // --- Same alignment fix + red "Login" text ---
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Already have an account? ',
                    style: TextStyle(color: Colors.white),
                  ),
                  GestureDetector(
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Navigate to Login Page Placeholder'),
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
              // ----------------------------------------------
            ],
          ),
        ),
      ),
    );
  }

  /// Step 3: OTP Verification
  Widget _buildSignupStep3() {
    // Create controllers for each OTP field
    final List<TextEditingController> _otpControllers =
        List.generate(6, (index) => TextEditingController());
    final List<FocusNode> _focusNodes =
        List.generate(6, (index) => FocusNode());

    void _validateAndSubmitOTP() {
      bool isAllFilled =
          _otpControllers.every((controller) => controller.text.isNotEmpty);

      if (isAllFilled) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('OTP Verified! Signup Complete!')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please fill all OTP boxes')),
        );
      }
    }

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'We have sent an OTP to your registered phone number. Please enter it below.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 14),
            ),
            const SizedBox(height: 20),
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
                    decoration: InputDecoration(
                      counterText: '',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    onChanged: (value) {
                      if (value.length == 1 && index < 5) {
                        FocusScope.of(context).requestFocus(_focusNodes[index + 1]);
                      } else if (value.isEmpty && index > 0) {
                        FocusScope.of(context).requestFocus(_focusNodes[index - 1]);
                      }
                    },
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            // --- Keep “Resend OTP” clickable + red ---
            GestureDetector(
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Resending OTP...')),
                );
              },
              child: const Text(
                'Resend OTP',
                style: TextStyle(
                  color: Colors.red,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            // -----------------------------------------
            const SizedBox(height: 40),
            CustomButton(
              text: 'Finish',
              onPressed: _validateAndSubmitOTP,
            ),
          ],
        ),
      ),
    );
  }
}
