import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Using ShadCN Dialog components
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import from Radix UI

interface ReportModalProps {
    report: {
        id: number;
        name: string;
        date: string;
        fileUrl: string;
    };
    onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
    const pdfUrl = useRef<string | null>(null);

    useEffect(() => {
        pdfUrl.current = report.fileUrl;
    }, [report.fileUrl]);

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                <DialogTitle>
                    <VisuallyHidden>Report: {report.name}</VisuallyHidden> {/* Visually hidden but accessible */}
                </DialogTitle>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-purple-900">{report.name}</h2>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</h3>
                </div>
                <div className="flex-grow">
                    <iframe
                        src={report.fileUrl}
                        className="w-full h-full border rounded-lg"
                        title="PDF Report"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
