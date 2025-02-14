"use client";

import React, { useState } from "react";
import { ArrowUpDown, Calendar } from "lucide-react";
import ReportCard from "@/app/components/ReportCard";
import ReportModal from "@/app/components/ReportModal";
import SidebarLayout from "@/app/components/Layout";
import Image from "next/image";

export default function ReportsLayout() {
    return (
        <SidebarLayout>
            <ReportsPage />
        </SidebarLayout>
    );
}

interface Report {
    id: number;
    name: string;
    date: string;
    fileUrl: string;
    thumbnail: string;
}

const reportsData: Report[] = [
    { id: 1, name: "Complete Blood Count (CBC)", date: "2024-01-25", fileUrl: "/sample_reports/cbc.pdf", thumbnail: "/images/medical-report-icon.jpg" },
    { id: 2, name: "Lipid Profile Report", date: "2024-01-28", fileUrl: "/sample_reports/lipid-profile.pdf", thumbnail: "/images/medical-report-icon.jpg" },
    { id: 3, name: "X-Ray Report", date: "2024-02-10", fileUrl: "/sample_reports/xray.pdf", thumbnail: "/images/medical-report-icon.jpg" },
];

function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [filterDate, setFilterDate] = useState<string>("");

    const sortedReports = [...reportsData].sort((a, b) => {
        return sortOrder === "newest"
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const filteredReports = filterDate
        ? sortedReports.filter(report => report.date === filterDate)
        : sortedReports;

    return (
        <div className="p-6 min-h-screen bg-white">
            <div className="flex-1 text-center">
                <Image
                    src="/logo-with-text-black.png"
                    alt="Logo"
                    width={160}
                    height={160}
                    className="mx-auto mb-4"
                />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-purple-900">Medical Reports</h1>

            <div className="flex justify-between items-center mb-4">
                <div/>

                <div className="flex items-center space-x-4">
                    <button
                        className="flex items-center space-x-2 border px-3 py-2 rounded-md hover:bg-gray-100"
                        onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                    >
                        <ArrowUpDown className="text-gray-600" />
                        <span className="text-gray-700 font-semibold">
                            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                        </span>
                    </button>

                    <div className="flex items-center space-x-2 border px-3 py-2 rounded-md hover:bg-gray-100">
                        <Calendar className="text-gray-600" />
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="text-gray-700 font-semibold bg-transparent border-none outline-none cursor-pointer"
                        />
                        {filterDate && (
                            <button onClick={() => setFilterDate("")} className="text-red-600 ml-2">
                                ✖
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            onClick={() => setSelectedReport(report)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">No reports found.</p>
                )}
            </div>

            {selectedReport && (
                <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
            )}
        </div>
    );
}
