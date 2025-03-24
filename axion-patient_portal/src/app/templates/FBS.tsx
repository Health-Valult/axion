import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface FBSReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        fastingBloodSugar: string;
    };
}

const referenceRanges = {
    fastingBloodSugar: { min: 70, max: 100, unit: "mg/dL" },
};

const FBSReport: React.FC<FBSReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Fasting Blood Sugar (FBS) Report", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);

        const tableData = [
            ["Fasting Blood Sugar", reportData.fastingBloodSugar, "mg/dL", `${referenceRanges.fastingBloodSugar.min} - ${referenceRanges.fastingBloodSugar.max}`],
        ];

        const header = [
            ["Test", "Value", "Unit", "Reference Range"],
        ];

        autoTable(doc, {
            startY: 60,
            head: header,
            body: tableData,
            theme: "grid",
        });

        doc.save("FBS_Report.pdf");
    };

    return (
        <Card ref={pdfRef} className="w-full max-w-2xl mx-auto p-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">Fasting Blood Sugar (FBS) Report</CardTitle>
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
                            <td className="px-3 py-2">Fasting Blood Sugar</td>
                            <td className="px-3 py-2">{reportData.fastingBloodSugar}</td>
                            <td className="px-3 py-2">mg/dL</td>
                            <td className="px-3 py-2">{referenceRanges.fastingBloodSugar.min} - {referenceRanges.fastingBloodSugar.max}</td>
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

export default FBSReport;
