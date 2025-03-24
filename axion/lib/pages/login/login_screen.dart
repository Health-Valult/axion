import 'package:axion/components/button.dart';
import 'package:axion/components/text_fieald.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginScreen extends StatefulWidget {
  

  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _loginForm = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                left: 0.0,
                top: 0.0,
                right: 0.0,
                bottom: 60.0,
              ),
              child: Column(
                children: [

                  Padding(
                    padding: const EdgeInsets.only(
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 50.0
                      ),
                    child: Hero(
                      tag: 'logo',
                      child: SvgPicture.asset(
                        "assets/img/Logo.svg",
                        width: 100,
                        height: 100,
                        semanticsLabel: 'Red dash paths',
                      ),
                    ),
                  ),

                  Text(
                    "Welcome Back",
                    style: GoogleFonts.montserrat(
                      textStyle: TextStyle(
                          fontSize: 40,
                          fontWeight:FontWeight.bold,
                          color: Color.fromARGB(255, 255, 255, 255)
                      ),)
                  ),
              
                ],
              ),
            ),
            
            Form(
              key: _loginForm,
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 30.0
                    ),
                    child: LoginTextFieald(
                      
                      label: "NIC",
                      validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter some text';
                                  }
                                  if (!(value.toString().length==10||value.toString().length==12)){
                                    print(value.toString());
                                    return 'NIC is to short';
                                  }
                                  return null;
                                },
                      ),
                  ),
              
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 40.0
                    ),
                    child: LoginTextFieald(
                      label: "Password",
                      validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter some text';
                                  }
                                  if (value.toString().length<8){
                                    print(value.toString());
                                    return 'Password is to short';
                                  }
                                  return null;
                                },
                      ),
                  ),
              
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 40.0
                    ),
                    child: LoginButton(
                      onPressed: (context)=>{
                        if(_loginForm.currentState!.validate()){
                          context.go('/home')
                        }
                      },
                    ),
                  ),
              
                  SizedBox(
                    width: 100,
                    height: 100,
                    child: ElevatedButton(
                      onPressed: (){},
                      style: ButtonStyle(
                        backgroundColor: WidgetStatePropertyAll(Color.fromRGBO(21, 23, 28, 1)),
                        foregroundColor: WidgetStatePropertyAll(Color.fromRGBO(21, 23, 28, 1))
                      ), 
                      child: SvgPicture.asset(
                        "assets/img/biometricAuth.svg"
                      )),
                  )
                  
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

