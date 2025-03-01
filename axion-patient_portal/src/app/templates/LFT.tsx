import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

interface LFTReportProps {
    reportData: {
        patientName: string;
        referredBy: string;
        ageSex: string;
        date: string;
        investigations: string;
        serumBilirubinTotal: string;
        serumBilirubinDirect: string;
        serumBilirubinIndirect: string;
        sGPTALT: string;
        sGOTAST: string;
        serumAlkalinePhosphatase: string;
        serumProtein: string;
        serumAlbumin: string;
        globulin: string;
        agRatio: string;
    };
}

const referenceRanges = {
    serumBilirubinTotal: { min: 0.2, max: 1.2, unit: "mg/dL" },
    serumBilirubinDirect: { min: 0, max: 0.3, unit: "mg/dL" },
    serumBilirubinIndirect: { min: 0.2, max: 1, unit: "mg/dL" },
    sGPTALT: { min: 13, max: 40, unit: "U/I" },
    sGOTAST: { min: 0, max: 37, unit: "U/I" },
    serumAlkalinePhosphatase: { min: "", max: "", unit: "U/I" },
    serumProtein: { min: 6.4, max: 8.3, unit: "g/dL" },
    serumAlbumin: { min: 3.5, max: 5.2, unit: "g/dL" },
    globulin: { min: 1.8, max: 3.6, unit: "g/dL" },
    agRatio: { min: 1.1, max: 2.1, unit: "" },
};

const LFTReport: React.FC<LFTReportProps> = ({ reportData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Liver Function Test (LFT) Report", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 30);
        doc.text(`Referred By: ${reportData.referredBy}`, 120, 30);
        doc.text(`Age / Sex: ${reportData.ageSex}`, 20, 40);
        doc.text(`Date: ${reportData.date}`, 120, 40);
        doc.text(`Investigations: ${reportData.investigations}`, 20, 50);

        const tableData = [
            ["Serum Bilirubin Total", reportData.serumBilirubinTotal, "mg/dL", `${referenceRanges.serumBilirubinTotal.min} - ${referenceRanges.serumBilirubinTotal.max}`],
            ["Serum Bilirubin Direct", reportData.serumBilirubinDirect, "mg/dL", `${referenceRanges.serumBilirubinDirect.min} - ${referenceRanges.serumBilirubinDirect.max}`],
            ["Serum Bilirubin Indirect", reportData.serumBilirubinIndirect, "mg/dL", `${referenceRanges.serumBilirubinIndirect.min} - ${referenceRanges.serumBilirubinIndirect.max}`],
            ["SGPT (ALT)", reportData.sGPTALT, "U/I", `${referenceRanges.sGPTALT.min} - ${referenceRanges.sGPTALT.max}`],
            ["SGOT (AST)", reportData.sGOTAST, "U/I", `${referenceRanges.sGOTAST.min} - ${referenceRanges.sGOTAST.max}`],
            ["Serum Alkaline Phosphatase", reportData.serumAlkalinePhosphatase, "U/I", `${referenceRanges.serumAlkalinePhosphatase.min} - ${referenceRanges.serumAlkalinePhosphatase.max}`],
            ["Serum Protein", reportData.serumProtein, "g/dL", `${referenceRanges.serumProtein.min} - ${referenceRanges.serumProtein.max}`],
            ["Serum Albumin", reportData.serumAlbumin, "g/dL", `${referenceRanges.serumAlbumin.min} - ${referenceRanges.serumAlbumin.max}`],
            ["Globulin", reportData.globulin, "g/dL", `${referenceRanges.globulin.min} - ${referenceRanges.globulin.max}`],
            ["A/G Ratio", reportData.agRatio, "", `${referenceRanges.agRatio.min} - ${referenceRanges.agRatio.max}`],
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

        doc.save("LFT_Report.pdf");
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
                <CardTitle className="text-lg font-semibold text-center">Liver Function Test (LFT) Report</CardTitle>
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
                            {renderTestRow("Serum Bilirubin Total", reportData.serumBilirubinTotal, "mg/dL", `${referenceRanges.serumBilirubinTotal.min} - ${referenceRanges.serumBilirubinTotal.max}`)}
                            {renderTestRow("Serum Bilirubin Direct", reportData.serumBilirubinDirect, "mg/dL", `${referenceRanges.serumBilirubinDirect.min} - ${referenceRanges.serumBilirubinDirect.max}`)}
                            {renderTestRow("Serum Bilirubin Indirect", reportData.serumBilirubinIndirect, "mg/dL", `${referenceRanges.serumBilirubinIndirect.min} - ${referenceRanges.serumBilirubinIndirect.max}`)}
                            {renderTestRow("SGPT (ALT)", reportData.sGPTALT, "U/I", `${referenceRanges.sGPTALT.min} - ${referenceRanges.sGPTALT.max}`)}
                            {renderTestRow("SGOT (AST)", reportData.sGOTAST, "U/I", `${referenceRanges.sGOTAST.min} - ${referenceRanges.sGOTAST.max}`)}
                            {renderTestRow("Serum Alkaline Phosphatase", reportData.serumAlkalinePhosphatase, "U/I", `${referenceRanges.serumAlkalinePhosphatase.min} - ${referenceRanges.serumAlkalinePhosphatase.max}`)}
                            {renderTestRow("Serum Protein", reportData.serumProtein, "g/dL", `${referenceRanges.serumProtein.min} - ${referenceRanges.serumProtein.max}`)}
                            {renderTestRow("Serum Albumin", reportData.serumAlbumin, "g/dL", `${referenceRanges.serumAlbumin.min} - ${referenceRanges.serumAlbumin.max}`)}
                            {renderTestRow("Globulin", reportData.globulin, "g/dL", `${referenceRanges.globulin.min} - ${referenceRanges.globulin.max}`)}
                            {renderTestRow("A/G Ratio", reportData.agRatio, "", `${referenceRanges.agRatio.min} - ${referenceRanges.agRatio.max}`)}
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

export default LFTReport;
