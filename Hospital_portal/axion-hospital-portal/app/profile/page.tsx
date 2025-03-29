"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type ProfileItemProps = {
  label: string;
  value: string | null | undefined;
};

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => (
  <div className="py-2">
    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
    <div className="mt-1 text-sm text-black dark:text-white">{value || "N/A"}</div>
  </div>
);

  export default function ProfileViewContent() {
    // 2. Specify type for token state
    const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("session_token"));
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
     
      fullName: "",
      email: "",
      phoneNumber: "",
      nic: "",
      dob: "",
      gender: "",
      address: "",
      city: "",
      postalCode: "",
      hospitalName: "",
      contactNumber: "",
      workLocation: "",
      department: "",
      medicalRegistrationNumber: "",
      yearsOfExperience: "",
      shiftType: ""
    });   
      
    const { toast } = useToast();
    const navigate = useRouter();

    useEffect(() => {
        // Get token from session storage
        //const token = sessionStorage.getItem("session_token");
        setToken(token);
        
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/api/user-profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    toast({
                        variant: "destructive",
                        title: "Session Expired",
                        description: "Please login again to continue.",
                    });
                    // Handle redirect to login if needed
                    return;
                }
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch profile data");
                }

                const data = await response.json();
                
                // Map API
                setProfile({
                    fullName: data.FullName || "",
                    email: data.Email || "",
                    phoneNumber: data.PhoneNUmber || "",
                    nic: data.NIC || "",
                    dob: data.DateOfBirth || "",
                    gender: data.Gender || "",
                    address: data.Address || "",
                    city: data.City || "",
                    postalCode: data.PostalCode || "",
                    
                    // Hospital Details
                    hospitalName: data.HospitalName || "",
                    contactNumber: data.ContactNumber || "",
                    workLocation: data.WorkLocation || "",
                    
                    // Work Information
                    department: data.Department || "",
                    medicalRegistrationNumber: data.MedicalRegistrationNumber || "",
                    yearsOfExperience: data.YearsOfExperience || "",
                    shiftType: data.ShiftType || ""
                });
                
                // Store in sessionStorage for future use
                sessionStorage.setItem("profileData", JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching profile data:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load profile data."
                });
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProfileData();
        } else {
            setLoading(false);
        }
    }, [token,toast]);

    const handleSubmit = () => {
        navigate.push("/search_patient");
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black dark:text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-black-900 dark:bg-black dark:text-white">
                    Your Profile
                </h1>

                <div className="space-y-6">
                    <Card className="bg-white dark:bg-black overflow-hidden shadow-md">
                        <CardHeader>
                            <CardTitle className="font-black">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <ProfileItem label="Name" value={profile.fullName} />
                            <ProfileItem label="Email" value={profile.email} />
                            <ProfileItem label="Phone" value={profile.phoneNumber} />
                            <ProfileItem label="NIC" value={profile.nic} />
                            <ProfileItem label="Date of Birth" value={profile.dob} />
                            <ProfileItem label="Gender" value={profile.gender} />
                            <ProfileItem label="Address" value={profile.address} />
                            <ProfileItem label="City" value={profile.city}/>
                            <ProfileItem label="Postal Code" value={profile.postalCode}/>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-black overflow-hidden shadow-md">
                        <CardHeader>
                            <CardTitle>Hospital Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <ProfileItem label="Hospital Name" value={profile.hospitalName} />
                            <ProfileItem label="Contact Number" value={profile.contactNumber}/>
                            <ProfileItem label="Work Location" value={profile.workLocation} />
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900 overflow-hidden shadow-md">
                        <CardHeader>
                            <CardTitle>Work Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <ProfileItem label="Department" value={profile.department} />
                            <ProfileItem 
                                label="Medical Registration Number" 
                                value={profile.medicalRegistrationNumber} 
                            />
                            <ProfileItem 
                                label="Years of Experience" 
                                value={profile.yearsOfExperience} 
                            />
                            <ProfileItem label="Shift Type" value={profile.shiftType} />
                        </CardContent>
                    </Card>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
                        <button
                            onClick={handleSubmit}
                            className="btn-primary"
                        >
                            Close
                        </button>
                    </div>
                </div>
            
            </div>
        </div>
    );
}