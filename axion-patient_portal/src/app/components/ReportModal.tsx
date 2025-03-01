import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
    CBCReportTemplate,
    CRPReportTemplate,
    ESRReportTemplate,
    FBSReportTemplate,
    HbA1cReportTemplate,
    LFTReportTemplate,
    LipidProfileReportTemplate,
    SerumCreatinineReportTemplate,
    SerumElectrolytesReportTemplate,
    TFTReportTemplate,
    UFRTemplate
} from "@/app/templates/data/ReportData";
import CBCReport from "@/app/templates/CBC";
import UFRReport from "@/app/templates/UFR";
import CRPReport from "@/app/templates/CRP";
import LFTReport from "@/app/templates/LFT";
import FBSReport from "@/app/templates/FBS";
import SerumCreatinineReport from "@/app/templates/Serum-Creatinine";
import SerumElectrolytesReport from "@/app/templates/Serum-Electrolytes";
import LipidProfileReport from "@/app/templates/LPT";
import HbA1cReport from "@/app/templates/HbA1c";
import ESRReport from "@/app/templates/ESR";
import TFTReport from "@/app/templates/TFT";

interface ReportModalProps {
    report: {
        id: number;
        name: string;
        date: string;
    };
    onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl h-full flex flex-col">
                <DialogTitle>
                    <VisuallyHidden>Report: {report.name}</VisuallyHidden> {/* Visually hidden but accessible */}
                </DialogTitle>
                {report.name === "Complete Blood Count (CBC)" ? (
                    <CBCReport reportData={CBCReportTemplate} />
                ) : report.name === "Urine Full Report (UFR)" ? (
                    <UFRReport reportData={UFRTemplate} />
                ) : report.name === "C-Reactive Protein (CRP) Report" ? (
                    <CRPReport reportData={CRPReportTemplate} />
                ) : report.name === "Liver Function Test (LFT) Report" ? (
                    <LFTReport reportData={LFTReportTemplate} />
                ) : report.name === "Fasting Blood Sugar (FBS) Report" ? (
                    <FBSReport reportData={FBSReportTemplate} />
                ) : report.name === "Serum Creatinine Report" ? (
                    <SerumCreatinineReport reportData={SerumCreatinineReportTemplate} />
                ) : report.name === "Serum Electrolytes Report" ? (
                    <SerumElectrolytesReport reportData={SerumElectrolytesReportTemplate} />
                ) : report.name === "Lipid Profile Test (LPT) Report" ? (
                    <LipidProfileReport reportData={LipidProfileReportTemplate} />
                ) : report.name === "HbA1c Report" ? (
                    <HbA1cReport reportData={HbA1cReportTemplate} />
                ) : report.name === "Erythrocyte Sedimentation Rate (ESR) Report" ? (
                    <ESRReport reportData={ESRReportTemplate} />
                ) : report.name === "Thyroid Function Test (TFT) Report" ? (
                    <TFTReport reportData={TFTReportTemplate} />
                ) : (
                    <p>Report type not supported.</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
