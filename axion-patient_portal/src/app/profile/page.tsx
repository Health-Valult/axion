"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import {Input} from "@/components/ui/input";
import SidebarLayout from "@/app/components/Layout";
import {useLanguage} from "@/app/components/LanguageContext";

export default function ProfileLayout() {
    return (
        <SidebarLayout>
            <ProfileForm />
        </SidebarLayout>
    );
}

function ProfileForm() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
    });

    const [token, setToken] = useState<string | null>(null);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [deleteEmail, setDeleteEmail] = useState("");
    const [deletePassword, setDeletePassword] = useState("");

    const isAuthenticated = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        const token = sessionStorage.getItem("session_token");
        setToken(token);
        const fetchProfileData = async () => {
            try {
                const response = await fetch("https://axiontestgateway.azure-api.net/axion/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch profile data");
                }

                const data = await response.json();

                setProfile({
                    firstName: data.FirstName || "",
                    lastName: data.LastName || "",
                    email: data.Email || "",
                    phone: data.Telephone || "",
                    nic: data.NIC || "",
                    dob: data.DateOfBirth || "",
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
                toast.error("Failed to load profile data.");
            }
        };

        if (isAuthenticated) {
            fetchProfileData();
        }
    }, [isAuthenticated, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleResetPassword = async (oldPassword: string, newPassword: string) => {
        try {
            const response = await fetch("https://axiontestgateway.azure-api.net/axion/user/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ Old: oldPassword, New: newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong during password reset.");
            }

            const data = await response.json();
            toast.success("Password updated successfully!");
            setIsResetPasswordModalOpen(false);
            return data;
        } catch (error) {
            console.error("Error during password reset:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleDeleteAccount = async (email: string, password: string) => {
        try {
            const response = await fetch("https://axiontestgateway.azure-api.net/axion/user/profile/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error("Something went wrong during account deletion.");
                throw new Error(errorData.message || "Something went wrong during account deletion.");
            }

            const data = await response.json();
            toast.success("Account deleted successfully!");
            setIsDeleteAccountModalOpen(false);
            return data;
        } catch (error) {
            console.error("Error during account deletion:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 p-6 flex flex-col items-center">
            <div><Toaster /></div>
            <h1 className="text-2xl font-bold mb-4 text-purple-900 dark:text-orange-300">{t.your_profile}</h1>

            <div className="mt-6 w-full max-w-lg space-y-4">
                {[
                    { label: "First Name", name: "firstName", disabled: true },
                    { label: "Last Name", name: "lastName", disabled: true },
                    { label: "Email", name: "email", disabled: true },
                    { label: "Phone", name: "phone" },
                    { label: "NIC", name: "nic", disabled: true },
                    { label: "Date of Birth", name: "dob", type: "date", disabled: true }
                ]
                    .map(({ label, name, type = "text", disabled }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-black dark:text-white">{label}</label>
                        <Input
                            type={type}
                            name={name}
                            value={profile[name as keyof typeof profile]}
                            onChange={handleChange}
                            disabled={disabled}
                            className={`mt-1 block w-full px-4 py-2 border text-black dark:text-white dark:bg-gray-950 border-gray-300 rounded-md ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full max-w-lg">
                <Button
                    onClick={() => setIsResetPasswordModalOpen(true)}
                    className="w-full font-semibold mt-4 overflow-hidden"
                    variant="default"
                >
                    {t.reset_password}
                </Button>

                <Button
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                    className="w-full font-semibold mt-4 overflow-hidden"
                    variant="destructive"
                >
                    {t.delete_account}
                </Button>
            </div>

            <Dialog open={isResetPasswordModalOpen} onOpenChange={setIsResetPasswordModalOpen}>
                <DialogContent>
                    <DialogTitle>{t.reset_password}</DialogTitle>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">{t.old_password}</label>
                            <Input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t.new_password}</label>
                            <Input
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
                            {t.confirm}
                        </Button>
                        <Button
                            onClick={() => setIsResetPasswordModalOpen(false)} // Close modal
                            className="bg-gray-400 text-white rounded-md"
                        >
                            {t.cancel}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteAccountModalOpen} onOpenChange={setIsDeleteAccountModalOpen}>
                <DialogContent>
                    <DialogTitle>{t.delete_account}</DialogTitle>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">{t.email}</label>
                            <Input
                                type="text"
                                value={deleteEmail}
                                onChange={(e) => setDeleteEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t.password}</label>
                            <Input
                                type="password"
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            {t.enter_email_and_password}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Button
                            onClick={() => handleDeleteAccount(deleteEmail, deletePassword)}
                            className="bg-red-600 text-white rounded-md"
                        >
                            {t.confirm}
                        </Button>
                        <Button
                            onClick={() => setIsDeleteAccountModalOpen(false)} // Close modal
                            className="bg-gray-400 text-white rounded-md"
                        >
                            {t.cancel}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
