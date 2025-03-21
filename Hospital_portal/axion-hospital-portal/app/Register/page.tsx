"use client"

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import { Hospital, Upload, ArrowRight, ArrowLeft, Lock as LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Register = () => {  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // General Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationalId: "",
    contactNumber: 0,
    email: "",
    address: "",
    city: "",
    postalCode: "",

    // Work Informations
    hospitalName: "",
    phoneNumber: 0,
    workLocation: "",
    department: "",
    medicalRegistrationNumber: "",
    yearsOfExperience: 0,
    shiftType: "",

    // account setup Details
    password: "",
    confirmPassword: "",
  });

  // Function to validate email
  const validateEmail = (email:any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Function to validate password
  const validatePassword = (password:any) => password.length >= 8;
  // Function to validate phone number (10 digits)
  const validatePhoneNumber = (phoneNumber: string): boolean => /^[0-9]{10}$/.test(phoneNumber);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field is yearsOfExperience and convert to integer
    if (name === "yearsOfExperience" || name === "phoneNumber" || name === "contactNumber") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseInt(value, 10) : 0, // Default to 0 if the value is empty
      }));
    } else {
      // For other fields, keep the value as a string
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData((prev) => ({ ...prev, [name]: e.target.files?.[0] || null }));
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1) {
      // Validate step 1 fields
      if (!formData.fullName || !formData.dateOfBirth || !formData.gender || 
          !formData.nationalId || !formData.phoneNumber || !formData.email || 
          !formData.address || !formData.city || !formData.postalCode) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate email format
      if (!validateEmail(formData.email)) {
        setEmailError("Please enter a valid email address.");
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      // Validate step 2 fields
      if (!formData.hospitalName || !formData.workLocation || !formData.shiftType || 
          !formData.department || !formData.medicalRegistrationNumber) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
    }

    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation for all required fields
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Ensure the phone numbers are converted to strings before validation
    if (!validatePhoneNumber(formData.contactNumber.toString())) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber.toString())) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }


    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }


    // Validate password strength
    if (!validatePassword(formData.password)) {
      setPasswordError("Password must be at least 8 characters long.");
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FullName: formData.fullName,
          NIC: formData.nationalId,
          Gender: formData.gender,
          DateOfBirth: formData.dateOfBirth,
          ContactNumber: formData.contactNumber || formData.phoneNumber, // Use whichever is filled
          Email: formData.email,
          Department: formData.department,
          MedicalRegistrationNumber: formData.medicalRegistrationNumber,
          Experience: formData.yearsOfExperience,
          Hospital: formData.hospitalName,
          Address: formData.address,
          City: formData.city,
          PostalCode: formData.postalCode,
          PhoneNumber: formData.phoneNumber,
          WorkLocation: formData.workLocation,
          ShiftType: formData.shiftType,
          Password: formData.password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        toast({
          title: "Error",
          description: data.message || "Something went wrong during registration.",
          variant: "destructive",
        });
        return;
      }

      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });

      // Redirect to profile page
      router.push('/profile');
      
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12 bg-white text-black dark:bg-black dark:text-white">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-2">
            <Hospital className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Staff Registration</h1>
          <p className="text-muted-foreground">
            Complete the registration process to join our hospital portal.
          </p>
        </div>

        <Card className="dark:bg-black dark:text-white">
          <CardHeader>
            <CardTitle>Registration - Step {step} of 3</CardTitle>
            <CardDescription>
              {step === 1 && "General Information"}
              {step === 2 && "Work Location & Details"}
              {step === 3 && "Account set-up Details"}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Step 1: General Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName">Full Name *</label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="Enter your DOB"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="gender">Gender *</label>
                      <Input
                        id="gender"
                        name="gender"
                        placeholder="Female /Male / Other"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="nationalId">National ID *</label>
                      <Input
                        id="nationalId"
                        name="nationalId"
                        placeholder="National ID No"
                        value={formData.nationalId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Contact number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email">Email Address *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Official email address"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={(e) => {
                        if (!validateEmail(e.target.value)) {
                          setEmailError("Please enter a valid email address.");
                        } else {
                          setEmailError("");
                        }
                      }}
                      required
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address">Address *</label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Full street address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city">City *</label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="postalCode">Postal Code *</label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="Postal code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Work Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="hospitalName">Hospital Name *</label>
                    <Input
                      id="hospitalName"
                      name="hospitalName"
                      placeholder="Enter your hospital Name"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="workLocation">Work Location *</label>
                    <Input
                      id="workLocation"
                      name="workLocation"
                      placeholder="Add the work location"
                      value={formData.workLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contactNumber">Phone Number *</label>
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="Contact number"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="shiftType">Shift Type *</label>
                    <Input
                      id="shiftType"
                      name="shiftType"
                      placeholder="Day Time / Night Time"
                      value={formData.shiftType}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="department">Department ID *</label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="Department ID"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="medicalRegistrationNumber">Medical Registration Number *</label>
                    <Input
                      id="medicalRegistrationNumber"
                      name="medicalRegistrationNumber"
                      placeholder="Medical Registration Number"
                      value={formData.medicalRegistrationNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="yearsOfExperience">Years Of Experience *</label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      placeholder="Years Of Experience"
                      value={formData.yearsOfExperience.toString()}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Account Setup Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="pt-2 border-t mb-2">
                    <h3 className="text-sm font-medium">Account Setup</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password">Password *</label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={(e) => {
                        if (!validatePassword(e.target.value)) {
                          setPasswordError("Password must be at least 8 characters long.");
                        } else {
                          setPasswordError("");
                        }
                      }}
                      required
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                      <p className="text-red-500 text-sm">Passwords do not match</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="flex justify-between w-full">
                {step > 1 && (
                  <button 
                    type="button" 
                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={prevStep}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </button>
                )}

                {step < 3 ? (
                  <button 
                    type="button"
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ml-auto"
                    onClick={nextStep}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ml-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Registration"} <LockIcon className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;