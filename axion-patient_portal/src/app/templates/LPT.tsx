import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface LipidProfileReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        totalCholesterol: string;
        triglycerides: string;
        hdl: string;
        ldl: string;
        vldl: string;
        ldlToHdlRatio: string;
        totalCholesterolToHdlRatio: string;
        tgToHdlRatio: string;
        nonHdlCholesterol: string;
    };
}

const referenceRanges = {
    totalCholesterol: { min: 125, max: 200, unit: "mg/dL" },
    triglycerides: { min: 25, max: 200, unit: "mg/dL" },
    hdl: { min: 35, max: 80, unit: "mg/dL" },
    ldl: { min: 85, max: 130, unit: "mg/dL" },
    vldl: { min: 5, max: 40, unit: "mg/dL" },
    ldlToHdlRatio: { min: 1.5, max: 3.5, unit: "" },
    totalCholesterolToHdlRatio: { min: 3.5, max: 5, unit: "" },
    tgToHdlRatio: { min: "", max: "", unit: "" },
    nonHdlCholesterol: { min: "", max: "", unit: "" },
};

const LipidProfileReport: React.FC<LipidProfileReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Lipid Profile Test (LPT) Report", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);

        const tableData = [
            ["Total Cholesterol", reportData.totalCholesterol, "mg/dL", `${referenceRanges.totalCholesterol.min} - ${referenceRanges.totalCholesterol.max}`],
            ["Triglycerides", reportData.triglycerides, "mg/dL", `${referenceRanges.triglycerides.min} - ${referenceRanges.triglycerides.max}`],
            ["HDL Cholesterol", reportData.hdl, "mg/dL", `${referenceRanges.hdl.min} - ${referenceRanges.hdl.max}`],
            ["LDL Cholesterol (Calculated)", reportData.ldl, "mg/dL", `${referenceRanges.ldl.min} - ${referenceRanges.ldl.max}`],
            ["VLDL Cholesterol (Calculated)", reportData.vldl, "mg/dL", `${referenceRanges.vldl.min} - ${referenceRanges.vldl.max}`],
            ["LDL / HDL (Calculated)", reportData.ldlToHdlRatio, "", `${referenceRanges.ldlToHdlRatio.min} - ${referenceRanges.ldlToHdlRatio.max}`],
            ["Total Cholesterol / HDL (Calculated)", reportData.totalCholesterolToHdlRatio, "", `${referenceRanges.totalCholesterolToHdlRatio.min} - ${referenceRanges.totalCholesterolToHdlRatio.max}`],
            ["TG / HDL (Calculated)", reportData.tgToHdlRatio, "", `${referenceRanges.tgToHdlRatio.min} - ${referenceRanges.tgToHdlRatio.max}`],
            ["Non-HDL Cholesterol (Calculated)", reportData.nonHdlCholesterol, "", `${referenceRanges.nonHdlCholesterol.min} - ${referenceRanges.nonHdlCholesterol.max}`]
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

        doc.save("Lipid_Profile_Report.pdf");
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
                <CardTitle className="text-lg font-semibold text-center">Lipid Profile Test (LPT) Report</CardTitle>
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
                            {renderTestRow("Total Cholesterol", reportData.totalCholesterol, "mg/dL", `${referenceRanges.totalCholesterol.min} - ${referenceRanges.totalCholesterol.max}`)}
                            {renderTestRow("Triglycerides", reportData.triglycerides, "mg/dL", `${referenceRanges.triglycerides.min} - ${referenceRanges.triglycerides.max}`)}
                            {renderTestRow("HDL Cholesterol", reportData.hdl, "mg/dL", `${referenceRanges.hdl.min} - ${referenceRanges.hdl.max}`)}
                            {renderTestRow("LDL Cholesterol (Calculated)", reportData.ldl, "mg/dL", `${referenceRanges.ldl.min} - ${referenceRanges.ldl.max}`)}
                            {renderTestRow("VLDL Cholesterol (Calculated)", reportData.vldl, "mg/dL", `${referenceRanges.vldl.min} - ${referenceRanges.vldl.max}`)}
                            {renderTestRow("LDL / HDL (Calculated)", reportData.ldlToHdlRatio, "", `${referenceRanges.ldlToHdlRatio.min} - ${referenceRanges.ldlToHdlRatio.max}`)}
                            {renderTestRow("Total Cholesterol / HDL (Calculated)", reportData.totalCholesterolToHdlRatio, "", `${referenceRanges.totalCholesterolToHdlRatio.min} - ${referenceRanges.totalCholesterolToHdlRatio.max}`)}
                            {renderTestRow("TG / HDL (Calculated)", reportData.tgToHdlRatio, "", `${referenceRanges.tgToHdlRatio.min} - ${referenceRanges.tgToHdlRatio.max}`)}
                            {renderTestRow("Non-HDL Cholesterol (Calculated)", reportData.nonHdlCholesterol, "", `${referenceRanges.nonHdlCholesterol.min} - ${referenceRanges.nonHdlCholesterol.max}`)}
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

export default LipidProfileReport;
