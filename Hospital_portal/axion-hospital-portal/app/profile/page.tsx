"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from local storage (or API if available)
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Name:</strong> {userData.fullName}</p>
              <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>National ID:</strong> {userData.nationalId}</p>
              <p><strong>Contact Number:</strong> {userData.contactNumber}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Department:</strong> {userData.department}</p>
              <p><strong>Employee ID:</strong> {userData.employeeId}</p>
              <p><strong>Medical Registration No:</strong> {userData.medicalRegistrationNumber}</p>
              <p><strong>Years of Experience:</strong> {userData.yearsOfExperience}</p>
              <p><strong>Hospital Name:</strong> {userData.hospitalName}</p>
              <p><strong>Work Location:</strong> {userData.workLocation}</p>
              <p><strong>Shift Type:</strong> {userData.shiftType}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/edit_profile">
            <button className="btn-primary flex items-center">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
