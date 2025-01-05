import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import '../widgets/progress_bar.dart';

class SignupStep3 extends StatefulWidget {
  const SignupStep3({Key? key}) : super(key: key);

  @override
  State<SignupStep3> createState() => _SignupStep3State();
}

class _SignupStep3State extends State<SignupStep3> {
  final List<TextEditingController> _otpControllers =
      List.generate(6, (index) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (index) => FocusNode());

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

  void _handleKeyPress(String value, int index) {
    if (value.isNotEmpty) {
      if (index < 5) {
        FocusScope.of(context).requestFocus(_focusNodes[index + 1]);
      } else {
        _focusNodes[index].unfocus();
      }
    } else if (value.isEmpty && index > 0) {
      FocusScope.of(context).requestFocus(_focusNodes[index - 1]);
    }
  }

  bool _validateOTP() {
    return _otpControllers.every((controller) => controller.text.isNotEmpty);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false, // Prevent content shift when keyboard appears
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'Enter Verification Code',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 20),
                const ProgressBar(currentStep: 3),
                const SizedBox(height: 40),
                const Text(
                  'You have been sent a verification via SMS.\nPlease enter it below:',
                  textAlign: TextAlign.center,
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
                          filled: true,
                          fillColor: Colors.black26,
                          counterText: '',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: const BorderSide(color: Colors.white),
                          ),
                        ),
                        onChanged: (value) => _handleKeyPress(value, index),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                GestureDetector(
                  onTap: () {
                    // Logic for resending OTP
                  },
                  child: const Text(
                    'Resend OTP',
                    style: TextStyle(
                      color: Colors.green,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 40),
                CustomButton(
                  text: 'Signup',
                  onPressed: () {
                    if (_validateOTP()) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Signup Complete!')),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Please fill all OTP boxes')),
                      );
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
