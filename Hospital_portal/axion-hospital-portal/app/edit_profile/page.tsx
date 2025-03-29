"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Input } from "@nextui-org/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ProfileEditContent() {
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

    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const fetchProfileData = async (token: string | null) => {
            try {
                setLoading(true);
                const response = await fetch("https://axiontestgateway.azure-api.net/axion/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
    
                if (!token) {
                    console.error("Token is missing");
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Token is missing. Please log in again.",
                    });
                    return;
                }
    
                if (response.status === 401) {
                    toast({
                        variant: "destructive",
                        title: "Session Expired",
                        description: "Please login again to continue.",
                    });
                    return;
                }
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch profile data");
                }
    
                const data = await response.json();
                
                // Map API response to our state structure
                setProfile({
                    fullName: data.FullName || "",
                    email: data.Email || "",
                    phoneNumber: data.Telephone || 0,
                    nic: data.NIC || "",
                    dob: data.DateOfBirth || "",
                    gender: data.Gender || "",
                    address: data.Address || "",
                    city: data.City || "",
                    postalCode: data.PostalCode || "",
                    hospitalName: data.HospitalName || "",
                    contactNumber: data.ContactNumber || 0,
                    workLocation: data.WorkLocation || "",
                    department: data.Department || "",
                    medicalRegistrationNumber: data.MedicalRegistrationNumber || "",
                    yearsOfExperience: data.YearsOfExperience || "",
                    shiftType: data.ShiftType || ""
                });
    
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
    
        const token = sessionStorage.getItem("session_token");
        setToken(token);
    
        const cachedProfile = sessionStorage.getItem("profileData");
        if (cachedProfile) {
            try {
                const data = JSON.parse(cachedProfile);
                setProfile({
                    fullName: data.FullName || "",
                    email: data.Email || "",
                    phoneNumber: data.PhoneNumber || "",
                    nic: data.NIC || "",
                    dob: data.DateOfBirth || "",
                    gender: data.Gender || "",
                    address: data.Address || "",
                    city: data.City || "",
                    postalCode: data.PostalCode || "",
                    hospitalName: data.HospitalName || "",
                    contactNumber: data.ContactNumber || "",
                    workLocation: data.WorkLocation || "",
                    department: data.Department || "",
                    medicalRegistrationNumber: data.MedicalRegistrationNumber || "",
                    yearsOfExperience: data.YearsOfExperience || "",
                    shiftType: data.ShiftType || ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Error parsing cached profile data", error);
                fetchProfileData(token);
            }
        } else {
            fetchProfileData(token);
        }
    }, [toast]); // Empty dependency array to run only on mount

    // Handle form data changes
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    
    const handleSave = async () => {
        try {
            // Update profile data
            const response = await fetch("https://axiontestgateway.azure-api.net/axion/user/profile/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    
                    Name: profile.fullName,
                    Email: profile.email,
                    Telephone: profile.phoneNumber,
                    NIC:profile.nic,
                    DateOfBirth: profile.dob,
                    Gender: profile.gender,
                    Address: profile.address,
                    City: profile.city,
                    PostalCode: profile.postalCode,
                    HospitalName: profile.hospitalName,
                    WorkLocation: profile.workLocation,
                    ContactNumber: profile.contactNumber,
                    Department: profile.department,
                    MedicalRegistrationNumber: profile.medicalRegistrationNumber,
                    YearsOfExperience: profile.yearsOfExperience,
                    ShiftType: profile.shiftType
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            toast({
                title: "Success",
                description: "Profile updated successfully"
            });
            
            // Update the cached profile data
            const updatedProfile = {
              
              Name: profile.fullName,
              Email: profile.email,
              Telephone: profile.phoneNumber,
              NIC:profile.nic,
              DateOfBirth: profile.dob,
              Gender: profile.gender,
              Address: profile.address,
              City: profile.city,
              PostalCode: profile.postalCode,
              HospitalName: profile.hospitalName,
              WorkLocation: profile.workLocation,
              ContactNumber: profile.contactNumber,
              Department: profile.department,
              MedicalRegistrationNumber: profile.medicalRegistrationNumber,
              YearsOfExperience: profile.yearsOfExperience,
              ShiftType: profile.shiftType
            };
            sessionStorage.setItem("profileData", JSON.stringify(updatedProfile));
            
            // Navigate back to view page
            router.push("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update profile."
            });
        }
    };

    const handleCancel = () => {
        router.push("/profile");
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-purple-900 dark:text-orange-300">
                    Edit Profile
                </h1>

                <div className="space-y-6">
                    <Card className="bg-white dark:bg-gray-900 overflow-hidden shadow-md">
                        <CardHeader>
                            <CardTitle>Edit Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Name
                                    </label>
                                    <Input
                                        name="lastName"
                                        value={profile.fullName}
                                        onChange={handleChange}
                                        disabled
                                        className="bg-gray-100 dark:bg-gray-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <Input
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        disabled
                                        className="bg-gray-100 dark:bg-gray-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Phone
                                    </label>
                                    <Input
                                        name="phone"
                                        value={profile.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        NIC
                                    </label>
                                    <Input
                                        name="nic"
                                        value={profile.nic}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Date Of Birth
                                    </label>
                                    <input
                                        name="dob"
                                        value={profile.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Gender
                                    </label>
                                    <Input
                                        name="gender"
                                        value={profile.gender}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Address
                                    </label>
                                    <Input
                                        name="address"
                                        value={profile.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        City
                                    </label>
                                    <Input
                                        name="city"
                                        value={profile.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Postal Code
                                    </label>
                                    <Input
                                        name="postalCode"
                                        value={profile.postalCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900 overflow-hidden shadow-md">
                        <CardHeader>
                            <CardTitle>Edit Hospital Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Hospital Name
                                    </label>
                                    <Input
                                        name="hospitalName"
                                        value={profile.hospitalName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Contact Number
                                    </label>
                                    <Input
                                        name="contactNumber"
                                        value={profile.contactNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Work Location
                                    </label>
                                    <Input
                                        name="workLocation"
                                        value={profile.workLocation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900 overflow-hidden shadow-md">
                        <CardHeader>
                            <CardTitle>Edit Work Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Department
                                    </label>
                                    <Input
                                        name="department"
                                        value={profile.department}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Medical Registration Number
                                    </label>
                                    <Input
                                        name="medicalRegistrationNumber"
                                        value={profile.medicalRegistrationNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Years of Experience
                                    </label>
                                    <Input
                                        name="yearsOfExperience"
                                        value={profile.yearsOfExperience}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-black dark:text-white">
                                        Shift Type
                                    </label>
                                    <Input
                                        name="shiftType"
                                        value={profile.shiftType}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="space-x-4">
                        <button
                              onClick={handleCancel}
                              className="btn-primary flex justify-start "
                            >
                              Cancel
                            </button>
                            <button
                                className="btn-primary flex justify-end "
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}