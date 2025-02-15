import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

interface Report {
    report: {
        id: number;
        name: string;
        date: string;
        fileUrl: string;
        thumbnail: string;
    };
    onClick: (fileUrl: string) => void;
}

const ReportCard: React.FC<Report> = ({ report, onClick }) => {
    return (
        <Card
            className="cursor-pointer w-full max-w-[320px] bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={() => onClick(report.fileUrl)}
        >
            <CardHeader className="p-4 items-center">
                <Image
                    src={report.thumbnail}
                    alt={report.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-lg"
                />
                <CardTitle className="text-lg font-semibold text-center text-purple-900 mt-2">{report.name}</CardTitle>
                <CardDescription className="text-purple-900 text-sm text-center">
                    {new Date(report.date).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4"></CardContent>
        </Card>
    );
};

export default ReportCard;
