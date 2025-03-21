"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/components/LanguageContext";

interface Observation {
    id: string;
    display: string;
    value: string;
    unit: string;
}

interface ReportModalProps {
    report: {
        display: string;
    };
    observations: Observation[];
    onClose: () => void;
    generatePDF: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, observations, onClose, generatePDF }) => {
    const { t } = useLanguage();

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl h-full flex flex-col overflow-scroll">
                <DialogTitle className="sr-only">{report.display}</DialogTitle>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-orange-300">{report.display}</h3>
                <table className="min-w-full table-auto border-collapse mt-4">
                    <thead>
                    <tr>
                        <th className="border p-2">Observation Name</th>
                        <th className="border p-2">Result</th>
                        <th className="border p-2">Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {observations.map((observation, index) => (
                        <tr key={index}>
                            <td className="border p-2">{observation.display}</td>
                            <td className="border p-2">{observation.value}</td>
                            <td className="border p-2">{observation.unit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Button onClick={generatePDF} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">
                    {t.download}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
