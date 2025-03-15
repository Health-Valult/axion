import 'package:flutter/material.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_button.dart';
import 'package:flutter_application_1/loginSide/widgets/custom_text_field.dart';
import 'package:flutter_application_1/models/signup_data.dart';

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

  @override
  void initState() {
    super.initState();
    // Initialize controllers with existing data
    _firstNameController.text = widget.signupData.FirstName;
    _lastNameController.text = widget.signupData.LastName;
    _emailController.text = widget.signupData.Email;
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  void _validateAndProceed() {
    final formState = widget.formKey.currentState;
    if (formState == null) {
      print('Form state is null in SignupStep1');
      return;
    }

    if (formState.validate()) {
      // Save data to signupData model
      widget.signupData.FirstName = _firstNameController.text.trim();
      widget.signupData.LastName = _lastNameController.text.trim();
      widget.signupData.Email = _emailController.text.trim();

      // Debug print to verify data is saved
      print('Step 1 Data Saved:');
      print('First Name: ${widget.signupData.FirstName}');
      print('Last Name: ${widget.signupData.LastName}');
      print('Email: ${widget.signupData.Email}');

      formState.save();
      widget.onNext();
    } else {
      print('Validation failed in SignupStep1');
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
              CustomTextField(
                controller: _firstNameController,
                hintText: 'First Name',
                onSaved: (value) {
                  if (value != null) {
                    widget.signupData.FirstName = value.trim();
                  }
                },
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
                onSaved: (value) {
                  if (value != null) {
                    widget.signupData.LastName = value.trim();
                  }
                },
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
                keyboardType: TextInputType.emailAddress,
                onSaved: (value) {
                  if (value != null) {
                    widget.signupData.Email = value.trim();
                  }
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Email is required';
                  }
                  if (!RegExp(r'^[^@]+@[^@]+\.[^@]+$').hasMatch(value)) {
                    return 'Please enter a valid email';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              CustomButton(
                onPressed: _validateAndProceed,
                text: 'Next',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
