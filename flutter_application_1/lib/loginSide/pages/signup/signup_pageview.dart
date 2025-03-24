import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/pages/signup/pages/signup_step1.dart';
import 'package:flutter_application_1/loginSide/pages/signup/pages/signup_step2.dart';
import 'package:flutter_application_1/loginSide/pages/signup/pages/signup_step3.dart';
import 'package:flutter_application_1/models/signup_data.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

class SignupPageView extends StatefulWidget {
  const SignupPageView({Key? key}) : super(key: key);

  @override
  State<SignupPageView> createState() => _SignupPageViewState();
}

class _SignupPageViewState extends State<SignupPageView> {
  final PageController _pageController = PageController();
  final _formKeys = List.generate(3, (index) => GlobalKey<FormState>());
  final _signupData = SignupData();

  int _currentPage = 0;
  bool _step1DataSaved = false;

  @override
  void initState() {
    super.initState();
    print('Initial SignupData state:');
    print('First Name: ${_signupData.FirstName}');
    print('Last Name: ${_signupData.LastName}');
    print('Email: ${_signupData.Email}');
  }

  void _onStep1Complete() {
    _step1DataSaved = true;
    _nextPage();
  }

  void _nextPage() {
    final currentFormKey = _formKeys[_currentPage];
    if (currentFormKey.currentState == null) {
      print('Form state is null for step ${_currentPage + 1}');
      return;
    }

    if (!currentFormKey.currentState!.validate()) {
      print('Validation failed for step ${_currentPage + 1}');
      return;
    }

    currentFormKey.currentState!.save();

    print('Current SignupData state after step ${_currentPage + 1}:');
    print('First Name: ${_signupData.FirstName}');
    print('Last Name: ${_signupData.LastName}');
    print('Email: ${_signupData.Email}');
    print('NIC: ${_signupData.NIC}');
    print('Phone: ${_signupData.Telephone}');
    print('DOB: ${_signupData.DateOfBirth}');

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
    // For step 3, render the title with the provided gradient; for steps 1 and 2, no title is displayed.
    Widget titleWidget = Container();
    if (_currentPage == 2) {
      titleWidget = ShaderMask(
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
          'Enter Verification Code',
          style: GoogleFonts.montserrat(
            textStyle: const TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      );
    }

    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Theme.of(context).iconTheme.color),
          onPressed: _previousPage,
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Column(
          children: [
            if (_currentPage == 2)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20.0),
                child: titleWidget,
              ),
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
                    onNext: _onStep1Complete,
                    signupData: _signupData,
                  ),
                  SignupStep2(
                    formKey: _formKeys[1],
                    onNext: _nextPage,
                    signupData: _signupData,
                    step1DataSaved: _step1DataSaved,
                  ),
                  SignupStep3(
                    formKey: _formKeys[2],
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
