import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface TFTReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        investigations: string;
        tsh: string;
        t3: string;
        t4: string;
    };
}

const referenceRanges = {
    tsh: { min: 0.3, max: 4.5, unit: "µIU/mL" },
    t3: { min: 0.69, max: 2.15, unit: "ng/mL" },
    t4: { min: 52, max: 127, unit: "ng/mL" },
};

const TFTReport: React.FC<TFTReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Thyroid Function Test (TFT) Report", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);
        doc.text(`Investigations: ${reportData.investigations}`, 20, 50);

        const tableData = [
            ["TSH", reportData.tsh, "µIU/mL", `${referenceRanges.tsh.min} - ${referenceRanges.tsh.max}`],
            ["T3", reportData.t3, "ng/mL", `${referenceRanges.t3.min} - ${referenceRanges.t3.max}`],
            ["T4", reportData.t4, "ng/mL", `${referenceRanges.t4.min} - ${referenceRanges.t4.max}`],
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

        doc.save("TFT_Report.pdf");
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
        <Card ref={pdfRef} className="w-full max-w-2xl mx-auto p-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">Thyroid Function Test (TFT) Report</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="border p-4 rounded-md shadow-sm">
                    <div className="grid grid-cols-2 text-sm mb-4">
                        <p><strong>Patient Name:</strong> {reportData.patientName}</p>
                        <p><strong>Referred By:</strong> {reportData.referredBy}</p>
                        <p><strong>Age / Sex:</strong> {reportData.ageSex}</p>
                        <p><strong>Date:</strong> {reportData.date}</p>
                        <p className="col-span-2"><strong>Investigations:</strong> {reportData.investigations}</p>
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
                        {renderTestRow("TSH", reportData.tsh, "µIU/mL", `${referenceRanges.tsh.min} - ${referenceRanges.tsh.max}`)}
                        {renderTestRow("T3", reportData.t3, "ng/mL", `${referenceRanges.t3.min} - ${referenceRanges.t3.max}`)}
                        {renderTestRow("T4", reportData.t4, "ng/mL", `${referenceRanges.t4.min} - ${referenceRanges.t4.max}`)}
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

export default TFTReport;
