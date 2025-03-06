class SignupData {
  String firstName = '';
  String lastName = '';
  String email = '';
  String telephone = '';
  String nic = '';
  String dateOfBirth = '';
  String password = ''; // Added password
  String address = ''; // Added address
  String? profileImage;
  String otp = '';

  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'telephone': telephone,
      'nic': nic,
      'dateOfBirth': dateOfBirth,
      'password': password,
      'address': address,
      if (profileImage != null) 'profileImage': profileImage,
    };
  }
}
