class User {
  final String nic;
  final String email;
  final String firstName;
  final String lastName;
  final String telephone;
  final int dateOfBirth;

  User({
    required this.nic,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.telephone,
    required this.dateOfBirth,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    try {
      return User(
        nic: json['NIC'] as String,
        email: json['Email'] as String,
        firstName: json['FirstName'] as String,
        lastName: json['LastName'] as String,
        telephone: json['Telephone'] as String,
        dateOfBirth: json['DateOfBirth'] as int,
      );
    } catch (e) {
      print('Error parsing User from JSON: $e');
      print('Received JSON: ${json.toString()}');
      rethrow;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'NIC': nic,
      'Email': email,
      'FirstName': firstName,
      'LastName': lastName,
      'Telephone': telephone,
      'DateOfBirth': dateOfBirth,
    };
  }

  @override
  String toString() {
    return 'User(nic: $nic, email: $email, firstName: $firstName, lastName: $lastName, telephone: $telephone, dateOfBirth: $dateOfBirth)';
  }
}
