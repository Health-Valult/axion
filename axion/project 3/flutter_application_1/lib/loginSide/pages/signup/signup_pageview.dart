import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/pages/signup/pages/signup_step1.dart';
import 'package:flutter_application_1/loginSide/pages/signup/pages/signup_step2.dart';
import 'package:flutter_application_1/loginSide/pages/signup/pages/signup_step3.dart';
import 'package:flutter_application_1/loginSide/widgets/progress_bar.dart';
import 'package:flutter_application_1/models/signup_data.dart';

class SignupPageView extends StatefulWidget {
  const SignupPageView({Key? key}) : super(key: key);

  @override
  State<SignupPageView> createState() => _SignupPageViewState();
}

class _SignupPageViewState extends State<SignupPageView> {
  final PageController _pageController = PageController();
  final _formKeys = List.generate(2, (index) => GlobalKey<FormState>());
  final _signupData = SignupData();

  int _currentPage = 0;

  void _nextPage() {
    if (_currentPage < _formKeys.length &&
        !(_formKeys[_currentPage].currentState?.validate() ?? false)) {
      return;
    }

    if (_currentPage < 2) {
      setState(() => _currentPage++);
      _pageController.animateToPage(
        _currentPage,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
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
    } else {
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final pageTitle = _currentPage == 2 ? 'Enter Verification Code' : 'Sign up';

    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: _previousPage,
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 60),
            Text(
              pageTitle,
              style: const TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
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
                  SignupStep1(
                    formKey: _formKeys[0],
                    onNext: _nextPage,
                    signupData: _signupData,
                  ),
                  SignupStep2(
                    formKey: _formKeys[1],
                    onNext: _nextPage,
                    signupData: _signupData,
                  ),
                  SignupStep3(
                    signupData: _signupData,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
