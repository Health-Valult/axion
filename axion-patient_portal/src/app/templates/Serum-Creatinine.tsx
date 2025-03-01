import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface SerumCreatinineReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        serumCreatinine: string;
    };
}

const referenceRanges = {
    serumCreatinine: { min: 0.72, max: 1.18, unit: "mg/dL" },
};

const SerumCreatinineReport: React.FC<SerumCreatinineReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Serum Creatinine Report", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);

        const tableData = [
            ["Serum Creatinine", reportData.serumCreatinine, "mg/dL", `${referenceRanges.serumCreatinine.min} - ${referenceRanges.serumCreatinine.max}`],
        ];

        const header = [
            ["Test", "Value", "Unit", "Reference Range"]
        ];

        autoTable(doc, {
            startY: 60,
            head: header,
            body: tableData,
            theme: "grid",
        });

        doc.save("Serum_Creatinine_Report.pdf");
    };

    return (
        <Card ref={pdfRef} className="w-full max-w-2xl mx-auto p-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">Serum Creatinine Report</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="border p-4 rounded-md shadow-sm">
                    <div className="grid grid-cols-2 text-sm mb-4">
                        <p><strong>Patient Name:</strong> {reportData.patientName}</p>
                        <p><strong>Referred By:</strong> {reportData.referredBy}</p>
                        <p><strong>Age / Sex:</strong> {reportData.ageSex}</p>
                        <p><strong>Date:</strong> {reportData.date}</p>
                    </div>

                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-3 py-2 text-left">Test</th>
                            <th className="px-3 py-2 text-left">Value</th>
                            <th className="px-3 py-2 text-left">Unit</th>
                            <th className="px-3 py-2 text-left">Reference Range</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="px-3 py-2">Serum Creatinine</td>
                            <td className="px-3 py-2">{reportData.serumCreatinine}</td>
                            <td className="px-3 py-2">mg/dL</td>
                            <td className="px-3 py-2">{`${referenceRanges.serumCreatinine.min} - ${referenceRanges.serumCreatinine.max}`}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="mt-6 flex justify-center">
                        <Button onClick={downloadPDF}>Download PDF</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SerumCreatinineReport;
