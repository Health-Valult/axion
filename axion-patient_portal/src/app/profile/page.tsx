"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import SidebarLayout from "@/app/components/Layout";

export default function Profile() {
    return (
        <SidebarLayout>
            <ProfileForm />
        </SidebarLayout>
    );
}

function ProfileForm() {
    const [profile, setProfile] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@email.com",
        phone: "+123456789",
        nic: "987654321V",
        dob: "1995-06-15",
        houseNumber: "123",
        street: "Baker Street",
        city: "Colombo",
        district: "Western",
        avatar: "/user-icon.jpg",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = URL.createObjectURL(e.target.files[0]);
            setProfile({ ...profile, avatar: file });
        }
    };

    const handleSave = () => {
        alert("Profile updated successfully! ✅");
    };

    return (
        <div className="min-h-screen bg-white p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 text-purple-900">Your Profile</h1>
            <div className="flex flex-col items-center space-y-3">
                <Image
                    src={profile.avatar}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full border-2 border-gray-300"
                />
                <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800">
                    <Upload className="h-4 w-4" /> Change Picture
                    <input type="file" className="hidden" onChange={handleUpload} />
                </label>
            </div>

            <div className="mt-6 w-full max-w-lg space-y-4">
                {[
                    { label: "First Name", name: "firstName", disabled: true },
                    { label: "Last Name", name: "lastName", disabled: true },
                    { label: "Email", name: "email" },
                    { label: "Phone", name: "phone" },
                    { label: "NIC", name: "nic", disabled: true },
                    { label: "Date of Birth", name: "dob", type: "date" },
                    { label: "House Number", name: "houseNumber" },
                    { label: "Street", name: "street" },
                    { label: "City", name: "city" },
                    { label: "District", name: "district" },
                ].map(({ label, name, type = "text", disabled }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-black">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={profile[name as keyof typeof profile]}
                            onChange={handleChange}
                            disabled={disabled}
                            className={`mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md ${
                                disabled ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full max-w-lg">
                <button
                    onClick={handleSave}
                    className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
