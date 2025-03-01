import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

interface Report {
    report: {
        id: number;
        name: string;
        date: string;
    };
    onClick: () => void;
}

const ReportCard: React.FC<Report> = ({ report, onClick }) => {
    return (
        <Card
            className="w-full bg-white dark:bg-gray-950 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onClick()}
        >
            <CardHeader className="p-4 items-center">
                <Image
                    src="/images/medical-report-icon.jpg"
                    alt={report.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-lg"
                />
                <CardTitle className="text-lg font-semibold text-center text-black dark:text-orange-300 mt-2">{report.name}</CardTitle>
                <CardDescription className="text-black dark:text-white text-sm text-center">
                    {new Date(report.date).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default ReportCard;
