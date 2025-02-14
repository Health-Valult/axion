"use client"

import React, { useState } from "react";
import { Bell, User } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import SidebarLayout from "@/app/components/Layout";

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
    const [healthInfo] = useState({
        name: 'John Doe',
        age: 32,
        height: '5\'9"',
        weight: '75kg',
    });

    return (
        <div className="min-h-screen bg-white">
            <div className="flex items-center py-4 px-8 text-white justify-between">
                <div className="flex-1 text-center">
                    <Image
                        src="/logo-with-text-black.png"
                        alt="Logo"
                        width={160}
                        height={160}
                        className="mx-auto mb-4"
                    />
                </div>
                <div className="flex items-center space-x-4 text-black">
                    <Bell size={24} />
                    <Link href="/profile">
                        <User size={24} />
                    </Link>
                </div>
            </div>

            <div className="mb-8 px-8">
                <h1 className="text-2xl text-black font-bold">Welcome back, {userName}! Here’s your health summary.</h1>

                <div className="mt-4 bg-white p-6 rounded-lg border-black border-2 shadow">
                    <h2 className="text-lg font-semibold text-purple-900">Basic Health Information</h2>
                    <ul className="mt-2 text-black">
                        <li>Name: {healthInfo.name}</li>
                        <li>Age: {healthInfo.age}</li>
                        <li>Height: {healthInfo.height}</li>
                        <li>Weight: {healthInfo.weight}</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-8">
                <div className="bg-white p-6 rounded-lg border-black border-2 shadow">
                    <h2 className="text-lg font-semibold text-purple-900">My Medications</h2>
                    <ul className="mt-2 text-black">
                        {medications.map((med, index) => (
                            <li key={index}>{med.name} - {med.dosage} ({med.schedule})</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border-black border-2 shadow">
                    <h2 className="text-lg font-semibold text-purple-900">Medical Reports</h2>
                    <ul className="mt-2 text-black">
                        {medicalReports.map((report, index) => (
                            <li key={index}>{report.name} - {report.date}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border-black border-2 shadow">
                    <h2 className="text-lg font-semibold text-purple-900">Critical Alerts</h2>
                    <ul className="mt-2">
                        <li className="text-red-600">Allergic to Panadol</li>
                        <li className="text-yellow-600">Upcoming doctor visit on 2023-11-15</li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border-black border-2 shadow">
                    <h2 className="text-lg font-semibold text-purple-900">Emergency Info</h2>
                    <div className="mt-2">
                        <h3 className="text-md text-black font-medium">Allergies</h3>
                        <ul>
                            {emergencyInfo.allergies.map((allergy, index) => (
                                <li key={index} className="text-red-600">{allergy}</li>
                            ))}
                        </ul>
                        <h3 className="text-md text-black font-medium mt-2">Chronic Illnesses</h3>
                        <ul className="text-black">
                            {emergencyInfo.chronicIllnesses.map((illness, index) => (
                                <li key={index}>{illness}</li>
                            ))}
                        </ul>
                        <h3 className="text-md font-medium text-red-600 mt-2">Emergency Contacts</h3>
                        <ul className="text-black">
                            {emergencyInfo.emergencyContacts.map((contact, index) => (
                                <li key={index}>{contact}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mb-8 px-8">
                <h2 className="text-2xl text-black font-bold mb-4">Emergency & Security Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-lg border-black border-2 shadow">
                        <h3 className="text-lg font-semibold text-purple-900">Emergency Access</h3>
                        <p className="mt-2 text-black">Doctors can view life-saving info like allergies and blood type.</p>
                        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Enable Emergency Access</button>
                    </div>
                    <div className="bg-white p-6 rounded-lg border-black border-2 shadow">
                        <h3 className="text-lg font-semibold text-purple-900">Access Logs</h3>
                        <p className="mt-2 text-black">View who accessed your data for transparency and security.</p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">View Access Logs</button>
                    </div>
                    <div className="bg-white p-6 rounded-lg border-black border-2 shadow">
                        <h3 className="text-lg font-semibold text-purple-900">Backup & Sync Status</h3>
                        <p className="mt-2 text-black">All records are safely backed up and synced.</p>
                        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">Check Backup Status</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
