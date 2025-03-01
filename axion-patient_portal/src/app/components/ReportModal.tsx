import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {CBCReportTemplate, CRPReportTemplate, LFTReportTemplate, UFRTemplate} from "@/app/templates/data/ReportData";
import CBCReport from "@/app/templates/CBC";
import UFRReport from "@/app/templates/UFR";
import CRPReport from "@/app/templates/CRP";
import LFTReport from "@/app/templates/LFT";

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
                ) : (
                    <p>Report type not supported.</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
