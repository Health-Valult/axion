import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CBCReportTemplate } from "@/app/templates/data/ReportData";
import CBCReport from "@/app/templates/CBC";

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
                ) : (
                    <p>Report type not supported.</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
