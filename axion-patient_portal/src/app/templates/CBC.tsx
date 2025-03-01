import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface CBCReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        investigations: string;
        hemoglobin: string;
        totalLeukocyteCount: string;
        neutrophils: string;
        lymphocytes: string;
        eosinophils: string;
        monocytes: string;
        basophils: string;
        plateletCount: string;
        totalRBCCount: string;
        hematocrit: string;
        meanCorpuscularVolume: string;
        meanCellHemoglobin: string;
        meanCellHemoglobinConcentration: string;
    };
}

const referenceRanges = {
    hemoglobin: { min: 13.5, max: 17.5, unit: "g/dL" },
    totalLeukocyteCount: { min: 4.0, max: 11.0, unit: "x10⁹/L" },
    plateletCount: { min: 150, max: 450, unit: "x10⁹/L" },
    totalRBCCount: { min: 4.7, max: 6.1, unit: "x10¹²/L" },
    hematocrit: { min: 38, max: 50, unit: "%" },
    meanCorpuscularVolume: { min: 80, max: 100, unit: "fL" },
    meanCellHemoglobin: { min: 27, max: 33, unit: "pg" },
    meanCellHemoglobinConcentration: { min: 32, max: 36, unit: "g/dL" },
    neutrophils: { min: 40, max: 70, unit: "%" },
    lymphocytes: { min: 20, max: 40, unit: "%" },
    eosinophils: { min: 1, max: 6, unit: "%" },
    monocytes: { min: 2, max: 10, unit: "%" },
    basophils: { min: 0, max: 2, unit: "%" },
};

const CBCReport: React.FC<CBCReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Complete Blood Count (CBC) Report", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);
        doc.text(`Investigations: ${reportData.investigations}`, 20, 50);

        const tableData = [
            ["Hemoglobin", reportData.hemoglobin, "g/dL", `${referenceRanges.hemoglobin.min} - ${referenceRanges.hemoglobin.max}`],
            ["Total Leukocyte Count", reportData.totalLeukocyteCount, "x10⁹/L", `${referenceRanges.totalLeukocyteCount.min} - ${referenceRanges.totalLeukocyteCount.max}`],
            ["Neutrophils", reportData.neutrophils, "%", `${referenceRanges.neutrophils.min} - ${referenceRanges.neutrophils.max}`],
            ["Lymphocytes", reportData.lymphocytes, "%", `${referenceRanges.lymphocytes.min} - ${referenceRanges.lymphocytes.max}`],
            ["Eosinophils", reportData.eosinophils, "%", `${referenceRanges.eosinophils.min} - ${referenceRanges.eosinophils.max}`],
            ["Monocytes", reportData.monocytes, "%", `${referenceRanges.monocytes.min} - ${referenceRanges.monocytes.max}`],
            ["Basophils", reportData.basophils, "%", `${referenceRanges.basophils.min} - ${referenceRanges.basophils.max}`],
            ["Platelet Count", reportData.plateletCount, "x10⁹/L", `${referenceRanges.plateletCount.min} - ${referenceRanges.plateletCount.max}`],
            ["Total RBC Count", reportData.totalRBCCount, "x10¹²/L", `${referenceRanges.totalRBCCount.min} - ${referenceRanges.totalRBCCount.max}`],
            ["Hematocrit", reportData.hematocrit, "%", `${referenceRanges.hematocrit.min} - ${referenceRanges.hematocrit.max}`],
            ["Mean Corpuscular Volume", reportData.meanCorpuscularVolume, "fL", `${referenceRanges.meanCorpuscularVolume.min} - ${referenceRanges.meanCorpuscularVolume.max}`],
            ["Mean Cell Hemoglobin", reportData.meanCellHemoglobin, "pg", `${referenceRanges.meanCellHemoglobin.min} - ${referenceRanges.meanCellHemoglobin.max}`],
            ["Mean Cell Hemoglobin Concentration", reportData.meanCellHemoglobinConcentration, "g/dL", `${referenceRanges.meanCellHemoglobinConcentration.min} - ${referenceRanges.meanCellHemoglobinConcentration.max}`],
        ];

        const header = [
            ["Test", "Value", "Unit", "Reference Range"], // This is your header
        ];

        autoTable(doc, {
            startY: 60,
            head: header,
            body: tableData,
            theme: "grid",
        });

        doc.save("CBC_Report.pdf");
    };

    const renderTestRow = (test: string, value: string, unit: string, range: string) => (
        <tr>
            <td className="px-3 py-2">{test}</td>
            <td className="px-3 py-2">{value}</td>
            <td className="px-3 py-2">{unit}</td>
            <td className="px-3 py-2">{range}</td>
        </tr>
    );

    const renderdlcTestRow = (test: string, value: string, unit: string, range: string) => (
        <tr>
            <td className="px-3 py-2 pl-8">{test}</td>
            <td className="px-3 py-2">{value}</td>
            <td className="px-3 py-2">{unit}</td>
            <td className="px-3 py-2">{range}</td>
        </tr>
    );

    const createConditionRow = (label: string, highValueCondition: string, lowValueCondition: string) => (
        <tr>
            <td className="px-3 py-2">{label}</td>
            <td className="px-3 py-2">{highValueCondition}</td>
            <td className="px-3 py-2">{lowValueCondition}</td>
        </tr>
    );

    return (
        <Card ref={pdfRef} className="w-full max-w-2xl mx-auto p-4 overflow-scroll">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">Complete Blood Count (CBC) Report</CardTitle>
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
                            {renderTestRow("Hemoglobin", reportData.hemoglobin, "g/dL", `${referenceRanges.hemoglobin.min} - ${referenceRanges.hemoglobin.max}`)}
                            {renderTestRow("Total Leukocyte Count", reportData.totalLeukocyteCount, "x10⁹/L", `${referenceRanges.totalLeukocyteCount.min} - ${referenceRanges.totalLeukocyteCount.max}`)}
                            {renderTestRow("Differential Leukocyte Count", "", "", "")}
                            {renderdlcTestRow("Neutrophils", reportData.neutrophils, "%", `${referenceRanges.neutrophils.min} - ${referenceRanges.neutrophils.max}`)}
                            {renderdlcTestRow("Lymphocytes", reportData.lymphocytes, "%", `${referenceRanges.lymphocytes.min} - ${referenceRanges.lymphocytes.max}`)}
                            {renderdlcTestRow("Eosinophils", reportData.eosinophils, "%", `${referenceRanges.eosinophils.min} - ${referenceRanges.eosinophils.max}`)}
                            {renderdlcTestRow("Monocytes", reportData.monocytes, "%", `${referenceRanges.monocytes.min} - ${referenceRanges.monocytes.max}`)}
                            {renderdlcTestRow("Basophils", reportData.basophils, "%", `${referenceRanges.basophils.min} - ${referenceRanges.basophils.max}`)}
                            {renderTestRow("Platelet Count", reportData.plateletCount, "x10⁹/L", `${referenceRanges.plateletCount.min} - ${referenceRanges.plateletCount.max}`)}
                            {renderTestRow("Total RBC Count", reportData.totalRBCCount, "x10¹²/L", `${referenceRanges.totalRBCCount.min} - ${referenceRanges.totalRBCCount.max}`)}
                            {renderTestRow("Hematocrit", reportData.hematocrit, "%", `${referenceRanges.hematocrit.min} - ${referenceRanges.hematocrit.max}`)}
                            {renderTestRow("Mean Corpuscular Volume", reportData.meanCorpuscularVolume, "fL", `${referenceRanges.meanCorpuscularVolume.min} - ${referenceRanges.meanCorpuscularVolume.max}`)}
                            {renderTestRow("Mean Cell Hemoglobin", reportData.meanCellHemoglobin, "pg", `${referenceRanges.meanCellHemoglobin.min} - ${referenceRanges.meanCellHemoglobin.max}`)}
                            {renderTestRow("Mean Cell Hemoglobin Concentration", reportData.meanCellHemoglobinConcentration, "g/dL", `${referenceRanges.meanCellHemoglobinConcentration.min} - ${referenceRanges.meanCellHemoglobinConcentration.max}`)}
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

export default CBCReport;
