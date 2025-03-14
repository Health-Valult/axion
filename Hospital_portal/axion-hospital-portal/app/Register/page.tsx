"use client"


import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
//import { Label } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import Link  from "next/link";
import { Hospital, Upload, ArrowRight, ArrowLeft, Lock as LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {  
  const navigate = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // General Information
    hospitalName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Legal and Administrative Documents
    registrationCertificate: null as File | null,
    businessRegistration: null as File | null,
    articlesOfAssociation: null as File | null,
    tinCertificate: null as File | null,

    // Operational Details
    services: "",
    medicalStaff: "",
    nursingStaff: "",
    administrativeStaff: "",

    // Facilities and Infrastructure
    equipment: "",
    floorPlan: null as File | null,

    // Regulatory Compliance
    inspectionReport: null as File | null,
    mohApproval: null as File | null,

    // Financial Information
    paymentProof: null as File | null,
    bankCertificate: null as File | null,
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
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      navigate.push("/Login");
    }, 2000);
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-2">
            <Hospital className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Hospital Registration</h1>
          <p className="text-muted-foreground">
            Complete the registration process to join our hospital portal.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration - Step {step} of 5</CardTitle>
            <CardDescription>
              {step === 1 && "General Information"}
              {step === 2 && "Legal and Administrative Documents"}
              {step === 3 && "Operational Details"}
              {step === 4 && "Facilities and Regulatory Compliance"}
              {step === 5 && "Financial Information & Account Setup"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Step 1: General Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="hospitalName">Hospital Name*</label>
                    <Input
                      id="hospitalName"
                      name="hospitalName"
                      placeholder="Enter your hospital's official name"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address">Address*</label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Full street address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city">City*</label>
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
                      <label htmlFor="postalCode">Postal Code*</label>
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

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber">Phone Number*</label>
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
                    <label htmlFor="email">Email Address*</label>
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
                </div>
              )}

              {/* Step 2: Legal and Administrative Documents */}
              {step === 2 && (
                <div className="space-y-4">
                  {renderFileUpload("registrationCertificate", "Certificate of Registration*")}
                  {renderFileUpload("businessRegistration", "Business Registration Certificate*")}
                  {renderFileUpload("articlesOfAssociation", "Articles of Association (if applicable)")}
                  {renderFileUpload("tinCertificate", "Tax Identification Number (TIN) Certificate*")}
                </div>
              )}

              {/* Step 3: Operational Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="services">Services Provided*</label>
                    <Textarea
                      id="services"
                      name="services"
                      placeholder="Describe the types of medical services offered (e.g., inpatient, outpatient)"
                      value={formData.services}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="medicalStaff">Medical Staff Details*</label>
                    <Textarea
                      id="medicalStaff"
                      name="medicalStaff"
                      placeholder="List with qualifications and certifications"
                      value={formData.medicalStaff}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="nursingStaff">Nursing Staff Details*</label>
                    <Textarea
                      id="nursingStaff"
                      name="nursingStaff"
                      placeholder="Details of nursing personnel"
                      value={formData.nursingStaff}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="administrativeStaff">Administrative Staff Details*</label>
                    <Textarea
                      id="administrativeStaff"
                      name="administrativeStaff"
                      placeholder="Details of administrative personnel"
                      value={formData.administrativeStaff}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Facilities and Regulatory Compliance */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="equipment">Equipment and Facilities*</label>
                    <Textarea
                      id="equipment"
                      name="equipment"
                      placeholder="Details of available medical equipment and facilities (e.g., beds, diagnostic tools)"
                      value={formData.equipment}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {renderFileUpload("floorPlan", "Floor Plan/Layout*")}
                  
                  <div className="pt-2 border-t">
                    <h3 className="text-sm font-medium mb-2">Regulatory Compliance</h3>
                  </div>
                  {renderFileUpload("inspectionReport", "Inspection Report from PDHS*")}
                  {renderFileUpload("mohApproval", "Ministry of Health Approval")}
                </div>
              )}

              {/* Step 5: Financial Information & Account Setup */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="pt-2 border-t mb-2">
                    <h3 className="text-sm font-medium">Financial Information</h3>
                  </div>
                  {renderFileUpload("paymentProof", "Proof of Payment for Registration Fees*")}
                  {renderFileUpload("bankCertificate", "Bank Certificate for Operational Expenses*")}

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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex justify-between w-full">
                {step > 1 && (
                  <button type="button" className="btn-primary" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </button>
                )}
                {step < 5 ? (
                  <button type="button" className="btn-primary" onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                    <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Complete Registration"}
                    {!isLoading && <LockIcon className="ml-2 h-4 w-4" />}
                  </button>
                )}
              </div>
              {step === 1 && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/Login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
