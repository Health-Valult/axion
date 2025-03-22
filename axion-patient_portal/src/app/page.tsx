"use client";

import React, { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SidebarLayout from "@/app/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useLanguage } from "@/app/components/LanguageContext";
import LanguageSwitch from '@/app/components/LanguageSwitch';
import { useDarkMode } from "@/app/components/DarkModeContext";
import useAuth from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";

export default function DashboardLayout() {
    return (
        <SidebarLayout>
            <Dashboard />
        </SidebarLayout>
    );
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

interface Report {
    id: string;
    display: string;
    timestamp: string;
    meta: string;
}

interface Meta {
    created: string;
    source: string;
}

interface Allergy {
    display: string;
    criticality: string;
    severity: string;
    category: string;
    source: string;
    verificationStatus: string;
    meta: Meta;
}

interface Immunization {
    patientID: string;
    code: string;
    display: string;
    dosage: string;
    unit: string;
    site: string;
    timestamp: string;
    meta: object;
}

const Dashboard = () => {
    const { t } = useLanguage();
    const { darkMode } = useDarkMode();
    const [healthInfo, setHealthInfo] = useState({
        name: '',
        age: null as number | null,
        gender: '' as string | undefined,
    });
    const [medications, setMedications] = useState<Medication[]>([]);
    const [reports, setReports] = useState<Report[]>([]);
    const notifications = [
        { id: 1, message: "Your appointment is scheduled for tomorrow at 10 AM." },
        { id: 2, message: "You have a new lab report available for viewing." },
        { id: 3, message: "Reminder: Take your Amoxicillin at 8 PM." },
    ];
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [value, setValue] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const [allergies, setAllergies] = useState<Allergy[]>([]);
    const [immunizations, setImmunizations] = useState<Immunization[]>([]);

    const [selectedAllergy, setSelectedAllergy] = useState<Allergy | null>(null);
    const [selectedImmunization, setSelectedImmunization] = useState<Immunization | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("session_token");
        setToken(token);

        const socket = new WebSocket(`ws://axiontestgateway.azure-api.net/socket?token=Bearer ${token}`);

        // Handle WebSocket open event
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        // Handle incoming messages from WebSocket
        socket.onmessage = (event) => {
            console.log('Received message:', event.data);
            toast.custom(event.data);
        };

        // Handle WebSocket error event
        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        // Handle WebSocket close event
        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

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

                const currentYear = new Date().getFullYear();
                let birthYear;

                if (data.NIC.length === 12) {
                    birthYear = parseInt(data.NIC.substring(0, 4)); // Extract the first 4 digits
                } else if (data.NIC.length === 10) {
                    // NIC with 10 digits (9 digits + 'v' or 'x' at the end)
                    const firstTwoDigits = data.NIC.substring(0, 2); // First 2 digits
                    birthYear = parseInt('19' + firstTwoDigits); // Prefix '19' to the 2 digits to get the year
                } else {
                    // Invalid NIC length
                    console.error("Invalid NIC length.");
                    birthYear = null; // Set to null if invalid
                }

                // Calculate age if birthYear is valid
                const age = birthYear ? currentYear - birthYear : null;

                let gender;

                if (data.NIC.length === 12) {
                    const genderDigit = parseInt(data.NIC.charAt(4)); // Extract the 5th digit (index 4 in 0-based indexing)
                    gender = genderDigit <= 4 ? "Male" : "Female";
                } else if (data.NIC.length === 10) {
                    // NIC with 10 digits (9 digits + 'v' or 'x' at the end)
                    const genderDigit = parseInt(data.NIC.charAt(2)); // Extract the 3rd digit (index 2 in 0-based indexing)
                    gender = genderDigit <= 4 ? "Male" : "Female";
                } else {
                    // Invalid NIC length
                    console.error("Invalid NIC length.");
                }

                // Update state with name and calculated age
                setHealthInfo({
                    name: data.FirstName,
                    age: age,
                    gender: gender,
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
                toast.error("Failed to load profile data.");
            }
        };

        const fetchMedications = async () => {
            try {
                const response = await fetch('https://axiontestgateway.azure-api.net/records-patients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
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
                            }`,
                    }),
                });

                const {data} = await response.json();
                if (data && data.medications && data.medications.medications) {
                    setMedications(data.medications.medications);
                }
            } catch (error) {
                console.error('Error fetching medication data:', error);
                toast.error("Failed to load medications.");
            }
        }

        const fetchReports = async () => {
            try {
                const response = await fetch('https://axiontestgateway.azure-api.net/records-patients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        query: `
                            query Labs {
                                Labs {
                                    labs {
                                        id
                                        patientID
                                        code
                                        display
                                        timestamp
                                        meta
                                    }
                                }
                            }`,
                    }),
                });

                const { data } = await response.json();
                if (data && data.Labs && data.Labs.labs) {
                    setReports(data.Labs.labs);
                }
            } catch (error) {
                console.error('Error fetching lab data:', error);
                toast.error("Failed to load lab results.");
            }
        };

        const fetchAllergies = async () => {
            try {
                const response = await fetch('https://axiontestgateway.azure-api.net/records-patients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        query: `
                            query Allergys {
                                allergys {
                                    allergyIntolerances {
                                        display
                                        criticality
                                        severity
                                        category
                                        source
                                        verificationStatus
                                        meta 
                                    }
                                }
                            }`,
                    }),
                });

                const { data } = await response.json();
                if (data && data.allergys && data.allergys.allergyIntolerances) {
                    setAllergies(data.allergys.allergyIntolerances);
                }
            } catch (error) {
                console.error('Error fetching allergy data:', error);
                toast.error("Failed to load allergies.");
            }
        };

        const fetchImmunizations = async () => {
            try {
                const response = await fetch('https://axiontestgateway.azure-api.net/records-patients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        query: `
                            query Immunization {
                                immunization {
                                    immunizations {
                                        patientID
                                        code
                                        display
                                        unit
                                        site
                                        timestamp
                                        meta
                                        dosage
                                    }
                                }
                            }`,
                    }),
                });

                const {data} = await response.json();
                if (data && data.immunization && data.immunization.immunizations) {
                    setImmunizations(data.immunization.immunizations);
                }
            } catch (error) {
                console.error('Error fetching immunization data:', error);
                toast.error("Failed to load immunizations.");
            }
        };

        if (isAuthenticated) {
            fetchProfileData();
            fetchMedications();
            fetchReports()
            fetchAllergies();
            fetchImmunizations();
        }

        return () => {
            socket.close();
        };
    }, [isAuthenticated, token]);

    if (!isAuthenticated) {
        return null;
    }

    const handleAlertClick = (allergy: Allergy) => {
        setSelectedAllergy(allergy);
    };

    const handleCardClick = (immunization: Immunization) => {
        setSelectedImmunization(immunization);
    };

    return (
        <div className="min-h-screen dark:bg-gray-950 p-6 overflow-x-hidden">
            <Toaster />
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
                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            onClick={async () => {
                                                try {
                                                    const response = await fetch('https://axiontestgateway.azure-api.net/axion/auth/logout', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': `Bearer ${sessionStorage.getItem("session_token")}`,
                                                        },
                                                    });
                                                    if (response.ok) {
                                                        toast.success("Logging out...");
                                                        sessionStorage.removeItem("session_token");
                                                        sessionStorage.removeItem("refresh_token");
                                                        router.push("/auth");
                                                    } else {
                                                        toast.error("Logout failed!");
                                                        console.error("Logout failed:", await response.text());
                                                    }
                                                } catch (error) {
                                                    toast.error("Logout failed!");
                                                    console.error("Error during logout:", error);
                                                }
                                            }}
                                        >
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

            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-400 mt-6">{t.welcomeMessage} {healthInfo.name}!</h1>
            <Card className="mt-4 border-2 dark:border-gray-700 dark:bg-gray-950 overflow-hidden">
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
                    </ul>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <Card className="dark:border-gray-700 dark:bg-gray-950 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.myMedications}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {medications.map((med, index) => (
                            <p key={index} className="text-sm">{med.display}</p>
                        ))}
                    </CardContent>
                </Card>

                <Card className="dark:border-gray-700 dark:bg-gray-950 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.medicalReports}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {reports.map((report, index) => (
                            <p key={index} className="text-sm">{report.display}</p>
                        ))}
                    </CardContent>
                </Card>

                <Card className="dark:border-gray-700 dark:bg-gray-950 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.allergies}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {allergies.length === 0 ? (
                                <p className="text-center text-gray-500 dark:text-white">{t.no_allergies_data}</p>
                            ) : (
                                <ul className="space-y-2"> {/* space between items */}
                                    {allergies.map((allergy, index) => (
                                        <Dialog key={index}>
                                            <DialogTrigger>
                                                <li
                                                    className="cursor-pointer text-sm w-full p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
                                                    onClick={() => handleAlertClick(allergy)} // Handle click
                                                >
                                                    {allergy.display} {/* Allergy display name */}
                                                </li>
                                            </DialogTrigger>
                                            {selectedAllergy === allergy && (
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>{allergy.display}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <p><strong>{t.criticality}:</strong> {allergy.criticality}</p>
                                                        <p><strong>{t.severity}:</strong> {allergy.severity}</p>
                                                        <p><strong>{t.category}:</strong> {allergy.category}</p>
                                                        <p><strong>{t.source}:</strong> {allergy.source}</p>
                                                        <p><strong>{t.verification_status}:</strong> {allergy.verificationStatus}</p>
                                                        <p><strong>{t.created}:</strong> {new Date(allergy.meta?.created).toLocaleString() || "N/A"}</p>
                                                        <p><strong>{t.source}:</strong> {allergy.meta?.source || "N/A"}</p>
                                                    </div>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="dark:border-gray-700 dark:bg-gray-950 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-orange-300">{t.immunizations}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {immunizations.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-white">{t.no_immunizations_data}</p>
                        ) : (
                            <ul className="space-y-2">
                                {immunizations.map((immunization, index) => (
                                    <Dialog key={index}>
                                        <DialogTrigger>
                                            <li
                                                className="cursor-pointer text-sm w-full p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
                                                onClick={() => handleCardClick(immunization)}
                                            >
                                                {immunization.display}
                                            </li>
                                        </DialogTrigger>
                                        {selectedImmunization === immunization && (
                                            <DialogContent className="max-w-lg dark:bg-gray-950">
                                                <DialogHeader>
                                                    <DialogTitle className="text-purple-900">{immunization.display}</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-2">
                                                    <p><strong>{t.dosage}:</strong> {immunization.dosage} {immunization.unit}</p>
                                                    <p><strong>{t.site}:</strong> {immunization.site}</p>
                                                    <p><strong>{t.administered_on}:</strong> {new Date(immunization.timestamp).toLocaleString()}</p>
                                                </div>
                                            </DialogContent>
                                        )}
                                    </Dialog>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                <Card className="mt-4 border-2 dark:border-gray-700 dark:bg-gray-950 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-purple-900 dark:text-orange-300">
                            {t.connectWithDoctor}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden">
                        <InputOTP maxLength={6} value={value} onChange={value => setValue(value)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="flex space-x-4 mt-4">
                            <Button
                                className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase"
                                onClick={async () => {
                                    try {
                                        const response = await fetch("https://axiontestgateway.azure-api.net/records/records/verify-request", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": `Bearer ${sessionStorage.getItem("session_token")}`,
                                            },
                                            body: JSON.stringify({ otp: value }),
                                        });

                                        // Handle the response
                                        if (response.ok) {
                                            const responseData = await response.json();
                                            // If successful, proceed to register the user
                                            toast.success("Access Given successfully!");
                                            return responseData;
                                        } else {
                                            // If response is not successful, show an error
                                            const errorData = await response.json();
                                            toast.error("Access Failed");
                                            return errorData;
                                        }
                                    } catch (error) {
                                        // Handle any errors (network issues, etc.)
                                        console.error("Error during OTP verification:", error);
                                        toast.error("Something went wrong. Please try again.");
                                    }
                                }}
                            >
                                Give Access
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
