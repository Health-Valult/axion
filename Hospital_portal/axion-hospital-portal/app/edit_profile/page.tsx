"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationalId: "",
    contactNumber: "",
    email: "",
    department: "",
    employeeId: "",
    medicalRegistrationNumber: "",
    yearsOfExperience: "",
    hospitalName: "",
    workLocation: "",
    shiftType: "",
  });

  useEffect(() => {
    // Fetch saved data from local storage
    const storedData = localStorage.getItem("userProfile");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(formData));

    toast({
      title: "Profile Updated",
      description: "Your profile details have been successfully updated.",
    });

    router.push("/Profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName">Full Name *</label>
                  <Input
                    id="fullName"
                    name="fullName"
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
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="gender">Gender *</label>
                  <Input
                    id="gender"
                    name="gender"
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
                    value={formData.nationalId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactNumber">Contact Number *</label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <button type="button" className="btn-secondary" onClick={() => router.push("/profile")}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
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
