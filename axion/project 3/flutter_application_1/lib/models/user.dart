class User {
  final String email;
  final String firstName;
  final String lastName;
  final String telephone;
  final String dateOfBirth; // Stored as a string

  User({
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.telephone,
    required this.dateOfBirth,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    final dynamic dob = json['DateOfBirth'];
    return User(
      email: json['Email'] as String,
      firstName: json['FirstName'] as String,
      lastName: json['LastName'] as String,
      telephone: json['Telephone'] as String,
      dateOfBirth: dob is int ? dob.toString() : dob as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'Email': email,
      'FirstName': firstName,
      'LastName': lastName,
      'Telephone': telephone,
      'DateOfBirth': dateOfBirth,
    };
  }
}
