class SignupData {
  String NIC;
  String FirstName;
  String LastName;
  String Email;
  String Telephone;
  int DateOfBirth;
  String Password;

  SignupData({
    this.NIC = '',
    this.FirstName = '',
    this.LastName = '',
    this.Email = '',
    this.Telephone = '',
    this.DateOfBirth = 0,
    this.Password = '',
  });

  Map<String, dynamic> toJson() {
    return {
      'NIC': NIC,
      'FirstName': FirstName,
      'LastName': LastName,
      'Email': Email,
      'Telephone': Telephone,
      'DateOfBirth': DateOfBirth,
      'Password': Password,
    };
  }
}
