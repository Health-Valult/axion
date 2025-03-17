"use client";

import React, { useState } from "react";
import {Bell, User} from "lucide-react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import SidebarLayout from "@/app/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useLanguage } from "@/app/components/LanguageContext";
import LanguageSwitch from '@/app/components/LanguageSwitch';
import {useDarkMode} from "@/app/components/DarkModeContext";
import useAuth from "@/hooks/useAuth";
import toast, {Toaster} from "react-hot-toast";

export default function DashboardLayout() {
    return (
        <SidebarLayout>
            <Dashboard />
        </SidebarLayout>
    );
}

interface Medication {
    name: string;
    dosage: string;
    schedule: string;
}

interface MedicalReport {
    name: string;
    date: string;
}

interface EmergencyInfo {
    allergies: string[];
    chronicIllnesses: string[];
    emergencyContacts: string[];
}

const Dashboard = () => {
    const { t } = useLanguage();
    const { darkMode } = useDarkMode();
    const [healthInfo] = useState({
        name: 'John Doe',
        age: 32,
        gender: "Male",
        height: '5\'9"',
        weight: '75kg',
        bloodType: 'O+'
    });
    const [medications] = useState<Medication[]>([
        { name: 'Paracetamol', dosage: '500mg', schedule: 'Twice daily' },
        { name: 'Amoxicillin', dosage: '250mg', schedule: 'Once daily' },
    ]);
    const [medicalReports] = useState<MedicalReport[]>([
        { name: 'Complete Blood Count (CBC)', date: '2024-01-25' },
        { name: 'Lipid Profile Report', date: '2023-09-15' },
    ]);
    const [emergencyInfo] = useState<EmergencyInfo>({
        allergies: ['Panadol', 'Penicillin'],
        chronicIllnesses: ['Diabetes', 'Hypertension'],
        emergencyContacts: ['+1234567890', '+0987654321'],
    });
    const notifications = [
        { id: 1, message: "Your appointment is scheduled for tomorrow at 10 AM." },
        { id: 2, message: "You have a new lab report available for viewing." },
        { id: 3, message: "Reminder: Take your Amoxicillin at 8 PM." },
    ];
    const router = useRouter();
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen dark:bg-gray-950 p-6">
            <Toaster/>
            <div className="flex items-center justify-between py-4 px-8 bg-white dark:bg-gray-950 rounded-lg">
                <div className="flex justify-center w-full">
                    <Image
                        src={darkMode ? "/logo-with-text.png" : "/logo-with-text-black.png"}
                        alt="Logo"
                        width={160}
                        height={160}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <TooltipProvider>
                        <Popover>
                            <PopoverTrigger>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Bell size={24} className="cursor-pointer mt-2" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Notifications</p>
                                    </TooltipContent>
                                </Tooltip>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 dark:bg-gray-950">
                                <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                                {notifications.length > 0 ? (
                                    <ul className="space-y-2">
                                        {notifications.map((notification) => (
                                            <li key={notification.id} className="text-sm p-2 bg-gray-100 dark:bg-gray-950 dark:text-white rounded">
                                                {notification.message}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-white">No new notifications</p>
                                )}
                            </PopoverContent>
                        </Popover>
                        <Tooltip>
                        <TooltipTrigger>
                            <Popover>
                                <PopoverTrigger>
                                    <User size={24} className="cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent className="p-2 space-y-2 dark:bg-gray-950">
                                    <Button variant="outline" className="w-full" onClick={() => router.push('/profile')}>
                                        Profile
                                    </Button>
                                    <Button variant="destructive" className="w-full"
                                            onClick={async () => {
                                                try {
                                                    const response = await fetch('/api/logout-proxy', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': `Bearer ${sessionStorage.getItem("session_token")}`,
                                                        },
                                                    });
                                                    if (response.ok) {
                                                        toast.success("Logging out...")
                                                        sessionStorage.removeItem("session_token");
                                                        sessionStorage.removeItem("refresh_token");
                                                        router.push("/auth");
                                                    } else {
                                                        toast.error("Logout failed")
                                                        console.error("Logout failed:", await response.text());
                                                    }
                                                } catch (error) {
                                                    toast.error("Error during logout")
                                                    console.error("Error during logout:", error);
                                                }
                                    }}>
                                        Logout
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </TooltipTrigger>
                        <TooltipContent>Profile</TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                    <LanguageSwitch />
                </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-400 mt-6">{t.welcomeMessage}</h1>
            <Card className="mt-4 border-2 dark:border-gray-700 dark:bg-gray-950">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-purple-900 dark:text-orange-300">
                        {t.basicHealthInformation}
                    </CardTitle>
                </CardHeader>
                <CardContent className="bg-white dark:bg-gray-950 rounded-lg">
                    <ul className="text-black dark:text-white space-y-2">
                        <li>{t.name}: {healthInfo.name}</li>
                        <li>{t.age}: {healthInfo.age}</li>
                        <li>{t.gender}: {healthInfo.gender}</li>
                        <li>{t.height}: {healthInfo.height}</li>
                        <li>{t.weight}: {healthInfo.weight}</li>
                        <li>{t.bloodType}: {healthInfo.bloodType}</li>
                    </ul>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <Card className="dark:border-gray-700 dark:bg-gray-950">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.myMedications}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {medications.map((med, index) => (
                            <p key={index} className="text-sm">{med.name} - {med.dosage} ({med.schedule})</p>
                        ))}
                    </CardContent>
                </Card>

                <Card className="dark:border-gray-700 dark:bg-gray-950">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.medicalReports}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {medicalReports.map((report, index) => (
                            <p key={index} className="text-sm">{report.name} - {report.date}</p>
                        ))}
                    </CardContent>
                </Card>

                <Card className="dark:border-gray-700 dark:bg-gray-950">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.criticalAlerts}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive" className="text-red-500">
                            <AlertTitle>Allergic Alert</AlertTitle>
                            <AlertDescription>Allergic to Panadol</AlertDescription>
                        </Alert>
                        <Alert className="mt-2 dark:bg-gray-950">
                            <AlertTitle>Reminder</AlertTitle>
                            <AlertDescription>Upcoming doctor visit on 2023-11-15</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>

                <Card className="dark:border-gray-700 dark:bg-gray-950">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.emergencyInfo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold text-red-500">Allergies</p>
                        {emergencyInfo.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive" className="mr-1">{allergy}</Badge>
                        ))}
                        <p className="font-semibold mt-3">Chronic Illnesses</p>
                        {emergencyInfo.chronicIllnesses.map((illness, index) => (
                            <Badge key={index} className="mr-1">{illness}</Badge>
                        ))}
                        <p className="font-semibold mt-3">Emergency Contacts</p>
                        {emergencyInfo.emergencyContacts.map((contact, index) => (
                            <p key={index} className="text-sm">{contact}</p>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-gray-400">{t.emergencyFeatures}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="dark:border-gray-700 dark:bg-gray-950">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.accessLogs}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t.accessLogsMsg}</p>
                        <Button variant="outline" className="mt-4">{t.accessLogsBtn}</Button>
                    </CardContent>
                </Card>
                <Card className="dark:border-gray-700 dark:bg-gray-950">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.backupStatus}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t.backupStatusMsg}</p>
                        <Button className="mt-4">{t.backupStatusBtn}</Button>
                    </CardContent>
                </Card>
                <Card className="dark:border-gray-700 dark:bg-gray-950">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.connectWithDoctor}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t.connectWithDoctorMsg}</p>
                        <Image
                            src="/images/qr.png"
                            alt="QR Code to connect with doctor"
                            width={128}
                            height={128}
                            className="mx-auto mt-4"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
