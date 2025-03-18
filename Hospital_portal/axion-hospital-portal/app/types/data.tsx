interface StaffProfile {
    // General Information
    fullName: string;
    dateOfBirth: string;
    gender: string;
    nationalId: string;
    contactNumber: string;
    email: string;
    department: string;
    employeeId: string;
    medicalRegistrationNumber: string;
    yearsOfExperience: string;
  
    // Work Information
    hospitalName: string;
    address: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    workLocation: string;
    shiftType: string;
  
    // Account Setup Details
    password: string;
    confirmPassword: string;
  }
  