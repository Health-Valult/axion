"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="space-y-8 p-6 max-w-2xl mx-auto bg-white text-black dark:bg-black dark:text-white">
      <header>
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-secondary-foreground dark:text-white">Manage your personal information</p>
      </header>

      <Card className="glass-card p-6 bg-white text-black dark:bg-black dark:text-white flex flex-col items-center text-center">
        <Image
          src="https://assets.aceternity.com/manu.png"
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
        <h2 className="mt-4 text-2xl font-semibold">{profileData?.fullName || "John Doe"}</h2>
        <p className="text-sm text-muted-foreground">{profileData?.email || "example@email.com"}</p>

        <div className="mt-6 space-y-3 text-left w-full">
          <ProfileItem label="Date of Birth" value={profileData?.dateOfBirth || "N/A"} />
          <ProfileItem label="Gender" value={profileData?.gender || "N/A"} />
          <ProfileItem label="National ID" value={profileData?.nationalId || "N/A"} />
          <ProfileItem label="Contact Number" value={profileData?.contactNumber || "N/A"} />
          <ProfileItem label="Address" value={profileData?.address || "N/A"} />
        </div>

        <Link href="/edit_profile">
          <button className="mt-6 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
            Edit Profile
          </button>
        </Link>
      </Card>

      <Card className="glass-card p-6 bg-white text-black dark:bg-black dark:text-white">
        <h3 className="text-lg font-semibold mb-6">Hospital Details</h3>
        <div className="space-y-3">
          <ProfileItem label="Hospital Name" value={profileData?.hospitalName || "N/A"} />
          <ProfileItem label="Phone Number" value={profileData?.phoneNumber || "N/A"} />
          <ProfileItem label="Work Location" value={profileData?.workLocation || "N/A"} />
        </div>
      </Card>

      <Card className="glass-card p-6 bg-white text-black dark:bg-black dark:text-white">
        <h3 className="text-lg font-semibold mb-6">Work Information</h3>
        <div className="space-y-3">
          <ProfileItem label="Department" value={profileData?.department || "N/A"} />
          <ProfileItem label="Employee ID" value={profileData?.employeeId || "N/A"} />
          <ProfileItem label="Medical Registration Number" value={profileData?.medicalRegistrationNumber || "N/A"} />
          <ProfileItem label="Years of Experience" value={profileData?.yearsOfExperience || "N/A"} />
          <ProfileItem label="Shift Type" value={profileData?.shiftType || "N/A"} />
        </div>
      </Card>
    </div>
  );
};

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <p className="text-sm">
    <strong>{label}:</strong> {value}
  </p>
);

export default Profile;