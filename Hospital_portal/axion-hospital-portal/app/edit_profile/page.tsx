"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const EditProfile = () => {
  const [formData, setFormData] = useState<any>(null);
  const navigate = useRouter();
  const { toast } = useToast();

  // Update the useEffect to fetch data:
useEffect(() => {
  const fetchUserProfile = async () => {
    // Try to get from sessionStorage first
    const savedData = sessionStorage.getItem("profileData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      return;
    }
    
    // If not in sessionStorage, fetch from API
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You must log in to access this page.",
      });
      navigate.push("/Login");
      return;
    }
    
    try {
      const response = await fetch("/api/user-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data.",
      });
      navigate.push("/profile");
    }
  };
  
  fetchUserProfile();
}, []);

// Add API call to handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const token = localStorage.getItem("authToken");
  if (!token) {
    toast({
      variant: "destructive",
      title: "Unauthorized",
      description: "You must log in to update your profile.",
    });
    navigate.push("/Login");
    return;
  }
  
  try {
    const response = await fetch("/api/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    
    // Update sessionStorage
    sessionStorage.setItem("profileData", JSON.stringify(formData));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    
    navigate.push("/profile");
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to update profile.",
    });
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12 bg-white text-black dark:bg-black dark:text-white">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">Modify your profile details below.</p>
        </div>

        <Card className="dark:bg-black dark:text-white">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Input fields for editing profile data */}
              {formData ? (
                <>
                  <div className="space-y-2">
                    <label htmlFor="fullName">Full Name</label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="gender">Gender</label>
                    <Input
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="nationalId">National Id</label>
                    <Input
                      id="nationalId"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="department">Department ID</label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="medicalRegistrationNumber">Medical Registration Number</label>
                    <Input
                      id="medicalRegistrationNumber"
                      name="medicalRegistrationNumber"
                      value={formData.medicalRegistrationNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="yearsOfExperience">Years Of Experience</label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                    />
                  </div>

                  <h3>Work Information</h3>

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
                    <label htmlFor="yearsOfExperience">Years Of Experience *</label>
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
                </>
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>

            <CardFooter>
              <button type="submit" className="mt-6 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                Save Changes
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
