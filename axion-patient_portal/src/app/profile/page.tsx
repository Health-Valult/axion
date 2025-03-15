"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Assuming ShadCN Dialog is imported
import { Button } from "@/components/ui/button"; // Import your Button component
import useAuth from "@/hooks/useAuth"; // Adjust your authentication hook

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

    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [deleteNIC, setDeleteNIC] = useState(""); // For Delete Account NIC
    const [deletePassword, setDeletePassword] = useState(""); // For Delete Account Password

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        alert("Profile updated successfully!");
    };

    const handleResetPassword = async (oldPassword: string, newPassword: string) => {
        console.log(JSON.stringify({
            Old: oldPassword,
            New: newPassword
        }));
        try {
            const response = await fetch("/api/proxy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${sessionStorage.getItem("session_token")}`,
                },
                body: JSON.stringify({
                    Old: oldPassword,
                    New: newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong during password reset.");
            }

            const data = await response.json();
            alert("Password updated successfully!");
            setIsResetPasswordModalOpen(false); // Close the modal after success
            return data;
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleDeleteAccount = async (nic: string, password: string) => {
        try {
            const response = await fetch("/api/proxy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("session_token")}`,
                },
                body: JSON.stringify({
                    NIC: nic,
                    Password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong during account deletion.");
            }

            const data = await response.json();
            alert("Account deleted successfully!");
            setIsDeleteAccountModalOpen(false); // Close the modal after success
            return data;
        } catch (error) {
            console.error("Error during account deletion:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 text-purple-900 dark:text-orange-300">Your Profile</h1>

            <div className="mt-6 w-full max-w-lg space-y-4">
                {[
                    { label: "First Name", name: "firstName", disabled: true },
                    { label: "Last Name", name: "lastName", disabled: true },
                    { label: "Email", name: "email", disabled: true },
                    { label: "Phone", name: "phone" },
                    { label: "NIC", name: "nic", disabled: true },
                    { label: "Date of Birth", name: "dob", type: "date" },
                ].map(({ label, name, type = "text", disabled }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-black dark:text-white">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={profile[name as keyof typeof profile]}
                            onChange={handleChange}
                            disabled={disabled}
                            className={`mt-1 block w-full px-4 py-2 border text-black dark:text-white dark:bg-gray-950 border-gray-300 rounded-md ${
                                disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
                            }`}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full max-w-lg">
                <Button
                    onClick={handleSave}
                    className={"w-full py-2 bg-purple-600 dark:bg-orange-300 text-white dark:text-black font-semibold rounded-md hover:bg-purple-700 dark:hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                >
                    Save Changes
                </Button>

                <Button
                    onClick={() => setIsResetPasswordModalOpen(true)}
                    className="w-full font-semibold mt-4"
                    variant="default"
                >
                    Reset Password
                </Button>

                <Button
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                    className="w-full font-semibold mt-4"
                    variant="destructive"
                >
                    Delete Account
                </Button>
            </div>

            {/* Reset Password Modal */}
            <Dialog open={isResetPasswordModalOpen} onOpenChange={setIsResetPasswordModalOpen}>
                <DialogContent>
                    <DialogTitle>Reset Your Password</DialogTitle>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Old Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Button
                            onClick={async () => await handleResetPassword(oldPassword, newPassword)}
                            className="bg-purple-600 text-white rounded-md"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => setIsResetPasswordModalOpen(false)} // Close modal
                            className="bg-gray-400 text-white rounded-md"
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Account Modal */}
            <Dialog open={isDeleteAccountModalOpen} onOpenChange={setIsDeleteAccountModalOpen}>
                <DialogContent>
                    <DialogTitle>Delete Your Account</DialogTitle>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">NIC</label>
                            <input
                                type="text"
                                value={deleteNIC}
                                onChange={(e) => setDeleteNIC(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            Enter NIC and Password to confirm account deletion.
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Button
                            onClick={() => handleDeleteAccount(deleteNIC, deletePassword)}
                            className="bg-red-600 text-white rounded-md"
                        >
                            Confirm Deletion
                        </Button>
                        <Button
                            onClick={() => setIsDeleteAccountModalOpen(false)} // Close modal
                            className="bg-gray-400 text-white rounded-md"
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProfileForm;
