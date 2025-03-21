"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [formData, setFormData] = useState<any>(null);
  const navigate = useRouter();

  useEffect(() => {
    // Retrieve the current profile data
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save updated data to localStorage
    localStorage.setItem("profileData", JSON.stringify(formData));

    navigate.push("/profile"); // Redirect to the Profile page
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
                    <label htmlFor="employeeId">Employee Id</label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
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
