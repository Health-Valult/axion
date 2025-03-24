"use client";

import React from "react";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/app/components/DarkModeContext";

interface Report {
    id: string;
    display: string;
    timestamp: string;
}

interface ReportCardProps {
    report: Report;
    onClick: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
    const { darkMode } = useDarkMode();

    return (
        <Card
            className="w-full bg-white overflow-x-hidden dark:bg-gray-950 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer mb-4"
            onClick={onClick}
        >
            <CardHeader className="p-4 items-center">
                <Image
                    src={darkMode ? "/images/medical-report-icon-black.jpg" : "/images/medical-report-icon.jpg"}
                    alt={report.display}
                    width={96}
                    height={96}
                    className="object-cover rounded-lg"
                />
                <CardTitle className="text-lg font-semibold text-center text-black dark:text-orange-300 mt-2">
                    {report.display}
                </CardTitle>
                <CardDescription className="text-black dark:text-white text-sm text-center">
                    {new Date(report.timestamp).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default ReportCard;
