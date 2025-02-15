"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarLayout from "@/app/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

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
    const [userName] = useState('John Doe');
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

    return (
        <div className="min-h-screen p-6">
            <div className="flex items-center justify-between py-4 px-8 bg-white rounded-lg">
                <Image src="/logo-with-text-black.png" alt="Logo" width={160} height={160} />
                <div className="flex items-center space-x-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Bell size={24} />
                            </TooltipTrigger>
                            <TooltipContent>Notifications</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href="/profile">
                                    <Avatar>
                                        <AvatarImage src="/user-avatar.png" alt="User" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>Profile</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* Welcome Message */}
            <h1 className="text-2xl font-bold text-gray-800 mt-6">Welcome back, {userName}! Here’s your health summary.</h1>

            {/* Health Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {/* Medications */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Medications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {medications.map((med, index) => (
                            <p key={index} className="text-sm">{med.name} - {med.dosage} ({med.schedule})</p>
                        ))}
                    </CardContent>
                </Card>

                {/* Medical Reports */}
                <Card>
                    <CardHeader>
                        <CardTitle>Medical Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {medicalReports.map((report, index) => (
                            <p key={index} className="text-sm">{report.name} - {report.date}</p>
                        ))}
                    </CardContent>
                </Card>

                {/* Critical Alerts */}
                <Card>
                    <CardHeader>
                        <CardTitle>Critical Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <AlertTitle>Allergic Alert</AlertTitle>
                            <AlertDescription>Allergic to Panadol</AlertDescription>
                        </Alert>
                        <Alert className="mt-2">
                            <AlertTitle>Reminder</AlertTitle>
                            <AlertDescription>Upcoming doctor visit on 2023-11-15</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>

                {/* Emergency Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Emergency Info</CardTitle>
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

            {/* Emergency & Security Features */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Emergency & Security Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Emergency Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Doctors can view life-saving info like allergies and blood type.</p>
                        <Button variant="destructive" className="mt-4">Enable Emergency Access</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Access Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>View who accessed your data for transparency and security.</p>
                        <Button variant="outline" className="mt-4">View Access Logs</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Backup & Sync Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>All records are safely backed up and synced.</p>
                        <Button className="mt-4">Check Backup Status</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
