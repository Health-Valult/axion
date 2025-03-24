import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface UFRReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        quantity: string;
        color: string;
        transparency: string;
        specificGravity: string;
        pH: string;
        protein: string;
        sugar: string;
        ketones: string;
        bilirubin: string;
        rbc: string;
        pusCells: string;
        epithelialCells: string;
        casts: string;
        crystals: string;
        bacteria: string;
    };
}

const referenceRanges = {
    quantity: "Normal range: 800 - 2,000 mL",
    color: "Pale yellow",
    transparency: "Clear",
    specificGravity: { min: 1.005, max: 1.030, unit: "" },
    pH: { min: 5, max: 7, unit: "" },
    protein: "Absent",
    sugar: "Absent",
    ketones: "Absent",
    bilirubin: "Absent",
    rbc: "Absent",
    pusCells: "Absent",
    epithelialCells: "Absent",
    casts: "Absent",
    crystals: "Absent",
    bacteria: "Absent",
};

const UFRReport: React.FC<UFRReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Urine Full Report (UFR)", 20, 20);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);

        const tableData = [
            ["Quantity", reportData.quantity, "ml", referenceRanges.quantity],
            ["Color", reportData.color, "", referenceRanges.color],
            ["Transparency", reportData.transparency, "", referenceRanges.transparency],
            ["Specific Gravity", reportData.specificGravity, "", `${referenceRanges.specificGravity.min} - ${referenceRanges.specificGravity.max}`],
            ["pH", reportData.pH, "", `${referenceRanges.pH.min} - ${referenceRanges.pH.max}`],
            ["Protein", reportData.protein, "", referenceRanges.protein],
            ["Sugar", reportData.sugar, "", referenceRanges.sugar],
            ["Ketones", reportData.ketones, "", referenceRanges.ketones],
            ["Bilirubin", reportData.bilirubin, "", referenceRanges.bilirubin],
            ["RBC", reportData.rbc, "/HBF", referenceRanges.rbc],
            ["Pus Cells", reportData.pusCells, "/HBF", referenceRanges.pusCells],
            ["Epithelial Cells", reportData.epithelialCells, "/HBF", referenceRanges.epithelialCells],
            ["Casts", reportData.casts, "", referenceRanges.casts],
            ["Crystals", reportData.crystals, "", referenceRanges.crystals],
            ["Bacteria", reportData.bacteria, "", referenceRanges.bacteria],
        ];

        const header = [["Test", "Value", "Unit", "Reference Range"]];

        autoTable(doc, { startY: 60, head: header, body: tableData, theme: "grid" });

        doc.save("UFR.pdf");
    };

    const renderTestRow = (test: string, value: string, unit: string, range: string) => (
        <tr>
            <td className="px-3 py-2">{test}</td>
            <td className="px-3 py-2">{value}</td>
            <td className="px-3 py-2">{unit}</td>
            <td className="px-3 py-2">{range}</td>
        </tr>
    );

    const renderTypeRow = (test: string, value: string, unit: string, range: string) => (
        <tr>
            <td className="px-3 py-2 pl-8">{test}</td>
            <td className="px-3 py-2">{value}</td>
            <td className="px-3 py-2">{unit}</td>
            <td className="px-3 py-2">{range}</td>
        </tr>
    );

    return (
        <Card ref={pdfRef} className="w-full max-w-2xl mx-auto p-4 overflow-scroll">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">Urine Full Report (UFR)</CardTitle>
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
                            {renderTestRow("Physical Examination", "", "", "")}
                            {renderTypeRow("Quantity", reportData.quantity, "ml", referenceRanges.quantity)}
                            {renderTypeRow("Color", reportData.color, "", referenceRanges.color)}
                            {renderTypeRow("Transparency", reportData.transparency, "", referenceRanges.transparency)}
                            {renderTypeRow("Specific Gravity", reportData.specificGravity, "", `${referenceRanges.specificGravity.min} - ${referenceRanges.specificGravity.max}`)}
                            {renderTypeRow("pH", reportData.pH, "", `${referenceRanges.pH.min} - ${referenceRanges.pH.max}`)}
                            {renderTestRow("Chemical Examination", "", "", "")}
                            {renderTypeRow("Protein", reportData.protein, "", referenceRanges.protein)}
                            {renderTypeRow("Sugar", reportData.sugar, "", referenceRanges.sugar)}
                            {renderTypeRow("Ketones", reportData.ketones, "", referenceRanges.ketones)}
                            {renderTypeRow("Bilirubin", reportData.bilirubin, "", referenceRanges.bilirubin)}
                            {renderTestRow("Microscopic Examination", "", "", "")}
                            {renderTypeRow("RBC", reportData.rbc, "/HBF", referenceRanges.rbc)}
                            {renderTypeRow("Pus Cells", reportData.pusCells, "/HBF", referenceRanges.pusCells)}
                            {renderTypeRow("Epithelial Cells", reportData.epithelialCells, "/HBF", referenceRanges.epithelialCells)}
                            {renderTypeRow("Casts", reportData.casts, "", referenceRanges.casts)}
                            {renderTypeRow("Crystals", reportData.crystals, "", referenceRanges.crystals)}
                            {renderTypeRow("Bacteria", reportData.bacteria, "", referenceRanges.bacteria)}
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

export default UFRReport;
