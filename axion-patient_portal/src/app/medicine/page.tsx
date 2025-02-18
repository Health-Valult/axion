"use client"

import React from "react";
import MedicineCard from "@/app/components/MedicineCard";
import { useLanguage } from "@/app/components/LanguageContext";
import SidebarLayout from "@/app/components/Layout";
import Image from "next/image";
import {useDarkMode} from "@/app/components/DarkModeContext";

export default function MedicineLayout() {
    return (
        <SidebarLayout>
            <PatientMedicineList />
        </SidebarLayout>
    );
}

const PatientMedicineList: React.FC = () => {
    const { t } = useLanguage();
    const { darkMode } = useDarkMode();

    const medicines = [
        {
            name: "Paracetamol",
            form: "Tablet",
            dosage: "500",
            diagnosis: "Fever and mild pain",
            prescribedAt: "2025-01-25 10:00 AM",
            directions: "1 tablet every 6 hours, after meals",
            treatmentDuration: "5 days",
            doctorProfile: "Dr. John Smith, MD - General Practitioner",
        },
        {
            name: "Amoxicillin",
            form: "Capsule",
            dosage: "250",
            diagnosis: "Bacterial infection",
            prescribedAt: "2025-01-20 4:00 PM",
            directions: "1 capsule every 8 hours, before meals",
            treatmentDuration: "7 days",
            doctorProfile: "Dr. Jane Doe, MD - Internal Medicine",
        },
    ];

    return (
        <div className="p-4 min-h-screen">
            <div className="flex-1 text-center">
                <Image
                    src={darkMode ? "/logo-with-text.png" : "/logo-with-text-black.png"}
                    alt="Logo"
                    width={160}
                    height={160}
                    className="mx-auto mb-4"
                />
            </div>
            <h1 className="text-2xl text-purple-900 dark:text-gray-400 font-bold mb-4">{t.prescribedMedicines}</h1>
            {medicines.map((medicine, index) => (
                <MedicineCard key={index} medicine={medicine} />
            ))}
        </div>
    );
};
