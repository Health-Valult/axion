"use client"

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
//import { Label } from "@nextui-org/react";
import Link  from "next/link";
import { Hospital, Upload, ArrowRight, ArrowLeft, Lock as LockIcon, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {  
  const navigate = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [uuid, setUuid] = useState(""); // Store unique ID for OTP verification

  const [formData, setFormData] = useState({
    // General Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationalId: "",
    contactNumber: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",

    // Work Informations
    hospitalName: "",
    phoneNumber: "",
    workLocation: "",
    department: "",
    employeeId: "",
    medicalRegistrationNumber: "",
    yearsOfExperience: "",
    shiftType: "",

    // account setup Details
    password: "",
    confirmPassword: "",

  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData((prev) => ({ ...prev, [name]: e.target.files?.[0] || null }));
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    // This would be replaced with actual registration logic
    setTimeout(() => {
      setIsLoading(false);
      
      // Save the form data to localStorage
      localStorage.setItem("profileData", JSON.stringify(formData));
  
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      navigate.push("/profile"); // Redirect to the Profile page
    }, 2000);
  };

  // Function to send OTP
  const sendOtp = async () => {

      if (!formData.email || !formData.email.includes("@")) {
        toast({ title: "Error", description: "Please enter a valid email!", variant: "destructive" });
        return;
      }
      
    setIsLoading(true);
    try {
      const uuidGenerated = crypto.randomUUID(); // Generate unique ID
      setUuid(uuidGenerated);

      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempID: uuidGenerated,
          type: 'email',
          data: formData.email, // Use the user's email
        }),
      });

      if (response.ok) {
        toast({ title: "OTP Sent", description: "A 6-digit OTP has been sent to your email." });
        setStep(4); // Move to OTP verification step
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast({ title: "Error", description: "Failed to send OTP. Try again later.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({ title: "Error", description: "Something went wrong!", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempID: uuid, otp }),
      });

      if (response.ok) {
        toast({ title: "OTP Verified", description: "Your email has been verified successfully." });
        navigate.push("/profile"); // Redirect to Profile
      } else {
        toast({ title: "Invalid OTP", description: "Please enter the correct OTP.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({ title: "Error", description: "OTP verification failed!", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFileUpload = (
    id: string,
    label: string,
    accept: string = ".pdf,.doc,.docx,.jpg,.jpeg,.png"
  ) => (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          name={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <Upload className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );

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
            <CardTitle>Registration - Step {step} of 4</CardTitle>
            <CardDescription>
              {step === 1 && "General Information"}
              {step === 2 && "Work Location & Details"}
              {step === 3 && "Account set-up Details"}
              {step === 4 && "Email Verification"}
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
                    <label htmlFor="address">Date of Birth *</label>
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
                      <label htmlFor="city">Gender *</label>
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
                      <label htmlFor="postalCode">National ID *</label>
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
                      placeholder="Hospital contact number"
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
                      required
                    />
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

              {/* Step 2: Work Informations */}
              {step === 2 && (
                <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="services">Hospital Name *</label>
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

                <div className="space-y-">
                  <label htmlFor="nursingStaff">Shift Type*</label>
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
                    <label htmlFor="employeeId">Employee ID *</label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      type="employeeId"
                      placeholder="Verified Employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="department">Medical Registration Number *</label>
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
                    <label htmlFor="employeeId">Years Of Experience *</label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="yearsOfExperience"
                      placeholder="Years Of Experience"
                      value={formData.yearsOfExperience}
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
                    <label htmlFor="password">Password*</label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword">Confirm Password*</label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
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
                <button type="button" className="btn-primary" onClick={sendOtp} disabled={isLoading}>
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