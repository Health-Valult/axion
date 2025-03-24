"use client"

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import { Hospital, ShieldCheck, ArrowRight, ArrowLeft, Lock as LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Register = () => {  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempID, setTempId] = useState("");
  const [uuid, setUuid] = useState(""); // Store unique ID for OTP verification

  const [formData, setFormData] = useState({
    // General Information
    fullName: "",
    dateOfBirth: new Date().toISOString().split("T")[0],
    gender: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",

    // Work Informations
    hospitalName: "",
    contactNumber: "",
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

  //const validateDateOfBirth = (dob: string): boolean => /^[0-3][0-9]-[0-1][0-9]-\d{4}$/.test(dob);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
  
    // Check if the field is yearsOfExperience and convert to integer
    if (name === "yearsOfExperience") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseInt(value, 10) : 0, // Default to 0 if the value is empty
      }));
    } else if (name === "dateOfBirth") {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Directly set the value as it is in the format YYYY-MM-DD
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

  // Function to send OTP
  const sendOtp = async () => {
    //const emailToUse = formData.email;

    if (!formData.email) {
      toast({ title: "Error", description: "No email found in profile!", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const uuidGenerated = crypto.randomUUID(); // Generate unique ID
      setUuid(uuidGenerated);
      setTempId(uuidGenerated);

      const response = await fetch("http://localhost:3000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempID: uuidGenerated, type: "email", data:formData.email }),
      });

      //const data = await response.json();

      if (response.ok) {
        toast({ title: "OTP Sent", description: `A 6-digit OTP has been sent to ${email}.` });
        setStep(4); // Move to OTP verification step
      } else {
        toast({ title: "Error", description: "Failed to send OTP. Try again later.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({ title: "Error", description: "Something OTP went wrong!", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempID: tempID, otp: otp  }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
  
        toast({ title: "OTP Verified", description: "Your account has been verified." });
        navigate.push("/search_patient"); // Redirect to dashboard
        
      } else {
        toast({ title: "Invalid OTP", description: "Please enter the correct OTP{uuid}.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({ title: "Error", description: "OTP verification failed!", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
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
  
      // Log the form data before sending
      //console.log("Submitting data:", formData);
    
      const body = {
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
      };
    
      console.log("Request body:", JSON.stringify(body)); // Log the request body
    
      try {
        const response = await fetch("http://localhost:3000/api/Register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
    
        const data = await response.json();
        console.log("Server response:", data); // Log the response
    
        if (!response.ok) {
          toast({
            title: "Error",
            description: data.message || "Something went wrong during registration.",
            variant: "destructive",
          });
          return;
        }
    
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully.",
        });
    
        sendOtp(); // Proceed to OTP verification
    
      } catch (error) {
        console.error("Error during registration:", error);
        toast({
          title: "Error",
          description: "Registration failed. Please try again.",
          variant: "destructive",
        });
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
                      type = "date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="Enter your DOB"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
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
                    <Input
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
             {/* Step 4: OTP Verification */}
             {step === 4 && (
               <div className="space-y-4">
                 <label>Enter OTP *</label>
                 <Input id="otp" name="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
               </div>
             )}
           </CardContent>
           </form>
 
           <CardFooter className="flex flex-col space-y-4">
             <div className="flex justify-between w-full">
               {step > 1 && step < 4 && (
                 <button type="button" className="btn-primary" onClick={prevStep}>
                   <ArrowLeft className="mr-2 h-4 w-4" /> Back
                 </button>
               )}
               {step < 3 ? (
                 <button type="button" className="btn-primary" onClick={nextStep}>
                   Next <ArrowRight className="ml-2 h-4 w-4" />
                 </button>
               ) : step === 3 ? (
                 <button type="button" className="btn-primary" onClick={handleSubmit} disabled={isLoading}>
                   {isLoading ? "Sending OTP..." : "Send OTP"} <LockIcon className="ml-2 h-4 w-4" />
                 </button>
               ) : (
                 <button type="button" className="btn-primary" onClick={verifyOtp} disabled={isLoading}>
                   {isLoading ? "Verifying..." : "Verify OTP"} <ShieldCheck className="ml-2 h-4 w-4" />
                 </button>
               )}
             </div>
           </CardFooter>
         </Card>
       </div>
     </div>
   );
 };

export default Register;