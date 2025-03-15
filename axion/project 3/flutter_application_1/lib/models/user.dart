class User {
  final String email;
  final String firstName;
  final String lastName;
  final String telephone;
  final int dateOfBirth;

  User({
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.telephone,
    required this.dateOfBirth,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      email: json['Email'] as String,
      firstName: json['FirstName'] as String,
      lastName: json['LastName'] as String,
      telephone: json['Telephone'] as String,
      dateOfBirth: json['DateOfBirth'] as int,
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
