"use client";

import React, { useState } from "react";
import ReportCard from "@/app/components/ReportCard";
import ReportModal from "@/app/components/ReportModal";
import SidebarLayout from "@/app/components/Layout";

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

const reports: Report[] = [
    {
        id: 1,
        name: "Complete Blood Count (CBC)",
        date: "2024-01-25",
        fileUrl: "/sample_reports/cbc.pdf",
        thumbnail: "/images/medical-report-icon.jpg",
    },
    {
        id: 2,
        name: "Lipid Profile Report",
        date: "2024-01-28",
        fileUrl: "/sample_reports/lipid-profile.pdf",
        thumbnail: "/images/medical-report-icon.jpg",
    },
];

function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    return (
        <div className="p-6 min-h-screen bg-white">
            <h1 className="text-2xl font-bold mb-4 text-purple-900">Medical Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-black">
                {reports.map((report) => (
                    <ReportCard
                        key={report.id}
                        report={report}
                        onClick={() => setSelectedReport(report)}
                    />
                ))}
            </div>

            {selectedReport && (
                <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
            )}
        </div>
    );
}
