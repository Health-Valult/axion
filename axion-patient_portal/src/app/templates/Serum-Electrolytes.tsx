import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface SerumElectrolytesReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        sodium: string;
        potassium: string;
        chloride: string;
        bicarbonate: string;
        calcium: string;
        magnesium: string;
    };
}

const referenceRanges = {
    sodium: { min: 136, max: 145, unit: "mEq/L" },
    potassium: { min: 3.5, max: 5.1, unit: "mEq/L" },
    chloride: { min: 98, max: 107, unit: "mEq/L" },
    bicarbonate: { min: 22, max: 28, unit: "mEq/L" },
    calcium: { min: 8.6, max: 10.2, unit: "mg/dL" },
    magnesium: { min: 1.8, max: 2.3, unit: "mg/dL" },
};

const SerumElectrolytesReport: React.FC<SerumElectrolytesReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Serum Electrolytes Report", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);

        const tableData = [
            ["Sodium", reportData.sodium, "mEq/L", `${referenceRanges.sodium.min} - ${referenceRanges.sodium.max}`],
            ["Potassium", reportData.potassium, "mEq/L", `${referenceRanges.potassium.min} - ${referenceRanges.potassium.max}`],
            ["Chloride", reportData.chloride, "mEq/L", `${referenceRanges.chloride.min} - ${referenceRanges.chloride.max}`],
            ["Bicarbonate", reportData.bicarbonate, "mEq/L", `${referenceRanges.bicarbonate.min} - ${referenceRanges.bicarbonate.max}`],
            ["Calcium", reportData.calcium, "mg/dL", `${referenceRanges.calcium.min} - ${referenceRanges.calcium.max}`],
            ["Magnesium", reportData.magnesium, "mg/dL", `${referenceRanges.magnesium.min} - ${referenceRanges.magnesium.max}`],
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

        doc.save("Serum_Electrolytes_Report.pdf");
    };

    const renderTestRow = (test: string, value: string, unit: string, range: string) => (
        <tr>
            <td className="px-3 py-2">{test}</td>
            <td className="px-3 py-2">{value}</td>
            <td className="px-3 py-2">{unit}</td>
            <td className="px-3 py-2">{range}</td>
        </tr>
    );

    return (
        <Card ref={pdfRef} className="w-full max-w-2xl mx-auto p-4 overflow-scroll">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">Serum Electrolytes Report</CardTitle>
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
                            {renderTestRow("Sodium", reportData.sodium, "mEq/L", `${referenceRanges.sodium.min} - ${referenceRanges.sodium.max}`)}
                            {renderTestRow("Potassium", reportData.potassium, "mEq/L", `${referenceRanges.potassium.min} - ${referenceRanges.potassium.max}`)}
                            {renderTestRow("Chloride", reportData.chloride, "mEq/L", `${referenceRanges.chloride.min} - ${referenceRanges.chloride.max}`)}
                            {renderTestRow("Bicarbonate", reportData.bicarbonate, "mEq/L", `${referenceRanges.bicarbonate.min} - ${referenceRanges.bicarbonate.max}`)}
                            {renderTestRow("Calcium", reportData.calcium, "mg/dL", `${referenceRanges.calcium.min} - ${referenceRanges.calcium.max}`)}
                            {renderTestRow("Magnesium", reportData.magnesium, "mg/dL", `${referenceRanges.magnesium.min} - ${referenceRanges.magnesium.max}`)}
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

export default SerumElectrolytesReport;
