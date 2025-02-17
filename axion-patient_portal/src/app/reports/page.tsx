"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useLanguage } from "@/app/components/LanguageContext";
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
    const [filterDate, setFilterDate] = useState<Date | undefined>();
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const yearOptions = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

    const { t } = useLanguage();

    const sortedReports = [...reportsData].sort((a, b) => {
        return sortOrder === "newest"
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const filteredReports = filterDate
        ? sortedReports.filter(report => report.date === format(filterDate, "yyyy-MM-dd"))
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
            <h1 className="text-2xl font-bold mb-4 text-purple-900">{t.medicalReports}</h1>

            <div className="flex justify-between items-center mb-4">
                <div />

                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                    >
                        <ArrowUpDown className="mr-2" />
                        {sortOrder === "newest" ? `${t.newestFirst}` : `${t.oldestFirst}`}
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-[200px] justify-start text-left font-normal",
                                    !filterDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {filterDate ? format(filterDate, "PPP") : `${t.pickDate}`}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b">
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
                            onClick={() => setSelectedReport(report)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">{t.noReportsFound}</p>
                )}
            </div>

            {selectedReport && (
                <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
            )}
        </div>
    );
}
