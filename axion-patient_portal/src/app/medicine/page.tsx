"use client";

import React, { useState, useEffect } from "react";
import MedicineCard from "@/app/components/MedicineCard";
import { useLanguage } from "@/app/components/LanguageContext";
import SidebarLayout from "@/app/components/Layout";
import Image from "next/image";
import { useDarkMode } from "@/app/components/DarkModeContext";
import useAuth from "@/hooks/useAuth";

interface Meta {
    created: string;
    source: string;
}

interface Medication {
    patientID: string;
    code: string;
    display: string;
    dosage: string;
    route: string;
    prescriber: string;
    meta: Meta;
}

interface MedicationsData {
    medications: Medication[];
}

interface GraphQLResponse {
    data: {
        medications: MedicationsData;
    };
}

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
    const isAuthenticated = useAuth(); // Redirects if not authenticated

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [medicines, setMedicines] = useState<Medication[]>([]); // Use the Medication type here

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        const fetchMedicines = async () => {
            try {
                const response = await fetch("https://axiontestgateway.azure-api.net/records-patients", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${sessionStorage.getItem("session_token")}`,
                    },
                    body: JSON.stringify({
                        query: `
                            query Medications {
                                medications {
                                    medications {
                                        patientID
                                        code
                                        display
                                        dosage
                                        route
                                        prescriber
                                        meta
                                    }
                                }
                            }
                        `,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch medications");
                }

                const { data }: GraphQLResponse = await response.json(); // Type the response
                const medicationsData = data?.medications?.medications || []; // Access the medications array
                setMedicines(medicationsData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Error fetching data");
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [isAuthenticated]);

    if (loading) {
        return <p className="text-center text-gray-700 dark:text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error Fetching Data</p>;
    }

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
            {medicines.length > 0 ? (
                medicines.map((medicine, index) => (
                    <MedicineCard key={medicine.code || index} medicine={medicine} />
                ))
            ) : (
                <p className="text-center text-gray-700 dark:text-white">No Medications Found</p>
            )}
        </div>
    );
};
