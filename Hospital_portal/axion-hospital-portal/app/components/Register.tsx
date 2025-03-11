'use client'

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Select";
import { Progress } from "@/components/ui/Progress";
import Switch from "@/components/ui/Switch";
import { LogIn, ChevronRight, ChevronLeft, Save, Upload, EyeOff, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Registration form data model
interface RegistrationFormData {
  // Basic Hospital Information
  hospitalName: string;
  hospitalType: string;
  registrationNumber: string;
  yearEstablished: string;
  accreditation: string;
  
  // Contact Details
  email: string;
  contactPrimary: string;
  contactSecondary: string;
  website: string;
  emergencyContact: string;
  
  // Address & Geolocation
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: string;
  longitude: string;
  
  // Administrator Details
  adminName: string;
  adminEmail: string;
  adminContact: string;
  adminRole: string;
  
  // Department & Services
  departments: string;
  services: string;
  specialties: string;
  
  // Operational Details
  workingHours: string;
  is24x7: boolean;
  bedCount: string;
  hasICU: boolean;
  hasEmergency: boolean;
  hasAmbulance: boolean;
  
  // Medical Staff
  doctorCount: string;
  nurseCount: string;
  hasSpecialists: boolean;
  
  // Insurance & Payment
  insuranceProviders: string;
  paymentMethods: string;
  
  // Login & Security
  username: string;
  password: string;
  confirmPassword: string;
  useMFA: boolean;
  
  // Documents
  registrationCertificate: File | null;
  accreditationCertificate: File | null;
  taxIdentificationDocument: File | null;
  otherDocuments: File | null;
}

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(10);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const steps = [
    "Basic Info",
    "Contact",
    "Address",
    "Admin",
    "Services",
    "Operation",
    "Staff",
    "Payment",
    "Security",
    "Documents"
  ];
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    hospitalName: "",
    hospitalType: "",
    registrationNumber: "",
    yearEstablished: "",
    accreditation: "",
    email: "",
    contactPrimary: "",
    contactSecondary: "",
    website: "",
    emergencyContact: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    latitude: "",
    longitude: "",
    adminName: "",
    adminEmail: "",
    adminContact: "",
    adminRole: "",
    departments: "",
    services: "",
    specialties: "",
    workingHours: "",
    is24x7: false,
    bedCount: "",
    hasICU: false,
    hasEmergency: false,
    hasAmbulance: false,
    doctorCount: "",
    nurseCount: "",
    hasSpecialists: false,
    insuranceProviders: "",
    paymentMethods: "",
    username: "",
    password: "",
    confirmPassword: "",
    useMFA: false,
    registrationCertificate: null,
    accreditationCertificate: null,
    taxIdentificationDocument: null,
    otherDocuments: null
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });
    }
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 2) / steps.length) * 100);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep) / steps.length) * 100);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Hospital registered successfully! You can now login.");
      setIsSubmitting(false);
      // Redirect to login
      window.location.href = "/login";
    }, 2000);
  };
  
  const getCurrentLocationCoordinates = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          toast.success("Location detected successfully!");
        },
        (error) => {
          toast.error("Unable to retrieve your location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };
  
  // Animation variant for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/30 to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Hospital Registration</CardTitle>
            <CardDescription className="text-center">
              Register your hospital to join our healthcare network
            </CardDescription>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs">{steps[currentStep]}</span>
                <span className="text-xs">{currentStep + 1} of {steps.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
              {/* Step 1: Basic Hospital Information */}
              {currentStep === 0 && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      name="hospitalName"
                      placeholder="Enter hospital name"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalType">Hospital Type</Label>
                    <Select 
                      value={formData.hospitalType} 
                      onChange={(event) => handleSelectChange(event.target.value, "hospitalType")}
                    >
                      <SelectTrigger>
                        Select hospital type
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Hospital</SelectItem>
                        <SelectItem value="specialty">Specialty Hospital</SelectItem>
                        <SelectItem value="multi-specialty">Multi-Specialty Hospital</SelectItem>
                        <SelectItem value="clinic">Clinic</SelectItem>
                        <SelectItem value="teaching">Teaching Hospital</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      placeholder="Government/Medical Council ID"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearEstablished">Year of Establishment</Label>
                    <Input
                      id="yearEstablished"
                      name="yearEstablished"
                      placeholder="YYYY"
                      value={formData.yearEstablished}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accreditation">Accreditation Details</Label>
                    <Input
                      id="accreditation"
                      name="accreditation"
                      placeholder="e.g., JCI, NABH"
                      value={formData.accreditation}
                      onChange={handleInputChange}
                      className="bg-white/50"
                    />
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Contact Details */}
              {currentStep === 1 && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Official Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="hospital@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPrimary">Primary Contact Number</Label>
                    <Input
                      id="contactPrimary"
                      name="contactPrimary"
                      placeholder="Primary contact number"
                      value={formData.contactPrimary}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactSecondary">Secondary Contact Number</Label>
                    <Input
                      id="contactSecondary"
                      name="contactSecondary"
                      placeholder="Secondary contact number"
                      value={formData.contactSecondary}
                      onChange={handleInputChange}
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://www.hospital.com"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      placeholder="Emergency contact number"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Address & Geolocation */}
              {currentStep === 2 && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Geolocation</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        id="latitude"
                        name="latitude"
                        placeholder="Latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className="bg-white/50"
                      />
                      <Input
                        id="longitude"
                        name="longitude"
                        placeholder="Longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        className="bg-white/50"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-2 w-full"
                      onClick={getCurrentLocationCoordinates}
                    >
                      Get Current Location
                    </Button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 4: Administrator Details */}
              {currentStep === 3 && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Administrator Name</Label>
                    <Input
                      id="adminName"
                      name="adminName"
                      placeholder="Full name"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Administrator Email</Label>
                    <Input
                      id="adminEmail"
                      name="adminEmail"
                      type="email"
                      placeholder="admin@hospital.com"
                      value={formData.adminEmail}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminContact">Administrator Contact</Label>
                    <Input
                      id="adminContact"
                      name="adminContact"
                      placeholder="Contact number"
                      value={formData.adminContact}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminRole">Role/Designation</Label>
                    <Input
                      id="adminRole"
                      name="adminRole"
                      placeholder="e.g., Hospital Director, CEO"
                      value={formData.adminRole}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                </motion.div>
              )}
              
              {/* Step 5: Department & Services */}
              {currentStep === 4 && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="departments">Departments</Label>
                    <Input
                      id="departments"
                      name="departments"
                      placeholder="e.g., Cardiology, Neurology, Pediatrics (comma separated)"
                      value={formData.departments}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="services">Services Offered</Label>
                    <Input
                      id="services"
                      name="services"
                      placeholder="e.g., OPD, Surgery, Emergency (comma separated)"
                      value={formData.services}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialties">Available Specialties</Label>
                    <Input
                      id="specialties"
                      name="specialties"
                      placeholder="e.g., Oncology, Orthopedics (comma separated)"
                      value={formData.specialties}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50"
                    />
                  </div>
                </motion.div>
              )}
              
              {/* Step 6: Operational Details */}
              {currentStep === 5 && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Switch 
                        checked={formData.is24x7}
                        onCheckedChange={(checked) => setFormData({...formData, is24x7: checked})}
                        />
                        <Label htmlFor="is24x7">24/7 Operation</Label>
                    </div>
                    </div>

                    {!formData.is24x7 && (
                    <div className="space-y-2">
                        <Label htmlFor="workingHours">Working Hours</Label>
                        <Input
                        id="workingHours"
                        name="workingHours"
                        placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 9AM-1PM"
                        value={formData.workingHours}
                        onChange={handleInputChange}
                        required={!formData.is24x7}
                        className="bg-white/50"
                        />
                    </div>
                    )}

                    <div className="space-y-2">
                    <Label htmlFor="bedCount">Number of Beds Available</Label>
                    <Input
                        id="bedCount"
                        name="bedCount"
                        type="number"
                        placeholder="Total beds available"
                        value={formData.bedCount}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                    />
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Switch 
                        checked={formData.hasICU}
                        onCheckedChange={(checked) => 
                            setFormData({...formData, hasICU: checked})
                        }
                        />
                        <Label htmlFor="hasICU">ICU Facilities Available</Label>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Switch 
                        checked={formData.hasEmergency}
                        onCheckedChange={(checked) => 
                            setFormData({...formData, hasEmergency: checked})
                        }
                        />
                        <Label htmlFor="hasEmergency">Emergency Facilities Available</Label>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Switch 
                        checked={formData.hasAmbulance}
                        onCheckedChange={(checked) => 
                            setFormData({...formData, hasAmbulance: checked})
                        }
                        />
                        <Label htmlFor="hasAmbulance">Ambulance Services Available</Label>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="doctorCount">Total Number of Doctors</Label>
                    <Input
                        id="doctorCount"
                        name="doctorCount"
                        type="number"
                        placeholder="Number of doctors"
                        value={formData.doctorCount}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="nurseCount">Total Number of Nurses & Support Staff</Label>
                    <Input
                        id="nurseCount"
                        name="nurseCount"
                        type="number"
                        placeholder="Number of nurses and staff"
                        value={formData.nurseCount}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                    />
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Switch 
                        checked={formData.hasSpecialists}
                        onCheckedChange={(checked) => 
                            setFormData({...formData, hasSpecialists: checked})
                        }
                        />
                        <Label htmlFor="hasSpecialists">Specialists Available</Label>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="insuranceProviders">Accepted Insurance Providers</Label>
                    <Input
                        id="insuranceProviders"
                        name="insuranceProviders"
                        placeholder="List of insurance providers (comma separated)"
                        value={formData.insuranceProviders}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="paymentMethods">Payment Methods</Label>
                    <Input
                        id="paymentMethods"
                        name="paymentMethods"
                        placeholder="e.g., Cash, Card, Online, Insurance (comma separated)"
                        value={formData.paymentMethods}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50 pr-10"
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                        >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="bg-white/50"
                    />
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Switch 
                        checked={formData.useMFA}
                        onCheckedChange={(checked) => 
                            setFormData({...formData, useMFA: checked})
                        }
                        />
                        <Label htmlFor="useMFA">Enable Multi-Factor Authentication</Label>
                    </div>
                    </div>
                </motion.div>
              )}
              
              {/* Step 10: Legal & Compliance Documents */}
              {currentStep === 9 && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="registrationCertificate">Government Registration Certificate</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="registrationCertificate"
                        name="registrationCertificate"
                        type="file"
                        onChange={(e) => handleFileChange(e, "registrationCertificate")}
                        required
                        className="bg-white/50"
                      />
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accreditationCertificate">Accreditation Certificate</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="accreditationCertificate"
                        name="accreditationCertificate"
                        type="file"
                        onChange={(e) => handleFileChange(e, "accreditationCertificate")}
                        className="bg-white/50"
                      />
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxIdentificationDocument">Tax Identification Number</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="taxIdentificationDocument"
                        name="taxIdentificationDocument"
                        type="file"
                        onChange={(e) => handleFileChange(e, "taxIdentificationDocument")}
                        required
                        className="bg-white/50"
                      />
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherDocuments">Other Legal Permits</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="otherDocuments"
                        name="otherDocuments"
                        type="file"
                        onChange={(e) => handleFileChange(e, "otherDocuments")}
                        className="bg-white/50"
                      />
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground">
                      By clicking Register, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="hover-scale"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button 
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="hover-scale"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <span className="mr-2">Registering</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Register Hospital</span>
                    <Save className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={nextStep}
                className="hover-scale"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;