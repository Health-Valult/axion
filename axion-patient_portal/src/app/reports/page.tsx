"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { jsPDF } from "jspdf";
import { useLanguage } from "@/app/components/LanguageContext";
import ReportCard from "@/app/components/ReportCard";
import ReportModal from "@/app/components/ReportModal";
import { useDarkMode } from "@/app/components/DarkModeContext";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {ArrowUpDown, CalendarIcon} from "lucide-react";
import { format } from "date-fns";
import SidebarLayout from "@/app/components/Layout";

// Define types for GraphQL response
interface Report {
    id: string;
    display: string;
    timestamp: string;
    meta: string;
}

interface Observation {
    id: string;
    patientID: string;
    labID: string;
    code: string;
    display: string;
    unit: string;
    value: string;
    timestamp: string;
    meta: string;
}

interface GraphQLResponse {
    data: {
        Labs: { labs: Report[] };
        observationStack: { Observations: Observation[] };
    };
}

export default function ReportsLayout() {
    return (
        <SidebarLayout>
            <ReportPage />
        </SidebarLayout>
    );
}

const ReportPage: React.FC = () => {
    const { t } = useLanguage();
    const { darkMode } = useDarkMode();
    const isAuthenticated = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reports, setReports] = useState<Report[]>([]); // Available reports
    const [selectedReport, setSelectedReport] = useState<Report | null>(null); // Selected report
    const [observations, setObservations] = useState<Observation[]>([]); // Observations data
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const yearOptions = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

    // Fetch the available reports
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchReports = async () => {
            try {
                const response = await fetch("/api/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${sessionStorage.getItem("session_token")}`,
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
                            }
                        `,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch reports");
                }

                const { data }: GraphQLResponse = await response.json();
                setReports(data.Labs.labs || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Error fetching data");
                setLoading(false);
            }
        };

        fetchReports();
    }, [isAuthenticated]);

    // Fetch observations for the selected report using the LabID
    const fetchObservations = async (labID: string) => {
        try {
            const response = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("session_token")}`,
                },
                body: JSON.stringify({
                    query: `
                        query ObservationStack($LabID: String!) {
                            observationStack(LabID: $LabID) {
                                Observations {
                                    id
                                    patientID
                                    labID
                                    code
                                    display
                                    unit
                                    value
                                    timestamp
                                    meta
                                }
                            }
                        }
                    `,
                    variables: {
                        LabID: labID,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch observations");
            }

            const { data }: GraphQLResponse = await response.json();
            setObservations(data.observationStack.Observations || []);
        } catch (err) {
            console.error(err);
            setError("Error fetching observations");
        }
    };

    // Function to generate PDF of observations
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`${selectedReport?.display}`, 10, 10);
        let yPosition = 20;
        doc.text("Observation Name", 10, yPosition);
        doc.text("Result", 100, yPosition);
        doc.text("Unit", 150, yPosition);
        yPosition += 10;
        observations.forEach((obs) => {
            doc.text(obs.display, 10, yPosition);
            doc.text(obs.value, 100, yPosition);
            doc.text(obs.unit, 150, yPosition);
            yPosition += 10;
        });
        doc.save(`${selectedReport?.display}.pdf`);
    };

    // Sorting and date filtering handling
    const handleSortChange = () => {
        setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
    };

    // Sort reports based on the selected sort order
    const sortedReports = [...reports].sort((a, b) => {
        return sortOrder === "newest"
            ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

    // Filter reports based on the selected date
    const filteredReports = filterDate
        ? sortedReports.filter(report => {
            const reportDate = new Date(report.timestamp);
            return reportDate.toISOString().split("T")[0] === format(filterDate, "yyyy-MM-dd");
        })
        : sortedReports;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error Fetching Data</p>;
    }

    return (
        <div className="p-6 min-h-screen bg-white dark:bg-gray-950">
            <div className="flex-1 text-center">
                <Image
                    src={darkMode ? "/logo-with-text.png" : "/logo-with-text-black.png"}
                    alt="Logo"
                    width={160}
                    height={160}
                    className="mx-auto mb-4"
                />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-purple-900 dark:text-gray-400">{t.medicalReports}</h1>

            <div className="flex justify-between items-center mb-4">
                <div />
                <div className="flex items-center space-x-4 dark:bg-gray-950">
                    <Button variant="outline" onClick={handleSortChange}>
                        <ArrowUpDown className="mr-2" />
                        {sortOrder === "newest" ? `${t.newestFirst}` : `${t.oldestFirst}`}
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-[200px] justify-start text-left font-normal dark:text-white"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
                                {filterDate ? format(filterDate, "PPP") : `${t.pickDate}`}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-950 border-b">
                                <span className="font-semibold">Year:</span>
                                <Select
                                    onValueChange={(value) => {
                                        const newYear = parseInt(value, 10);
                                        setSelectedYear(newYear);
                                        setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1));
                                    }}
                                    value={selectedYear.toString()}
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {yearOptions.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Calendar
                                mode="single"
                                selected={filterDate}
                                onSelect={setFilterDate}
                                month={currentMonth}
                                onMonthChange={setCurrentMonth}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    {filterDate && (
                        <Button variant="destructive" onClick={() => setFilterDate(undefined)}>
                            {t.removeDate}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            onClick={() => {
                                setSelectedReport(report);
                                fetchObservations(report.id); // Fetch observations when a report is clicked
                            }}
                        />
                    ))
                ) : (
                    <p>No reports found</p>
                )}
            </div>

            {selectedReport && (
                <ReportModal
                    report={selectedReport}
                    observations={observations}
                    onClose={() => setSelectedReport(null)} // Close modal when the report is deselected
                    generatePDF={generatePDF}
                />
            )}
        </div>
    );
};
