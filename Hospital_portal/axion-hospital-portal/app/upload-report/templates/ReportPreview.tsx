"use client"

import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import CBCReport from "@/app/upload-report/templates/CBCReport";
import { CBCFormData } from "@/app/upload-report/data/CBCFormData";

interface ReportPreviewProps {
  reportType: string;
  reportData: CBCFormData;
  isSaving: boolean;
  onBack: () => void;
  onSave: () => void;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ 
  reportType,
  reportData, 
  isSaving, 
  onBack, 
  onSave 
}) => {
  if (reportType !== "cbc") {
    return null;
  }
  
  return (
    <div className="space-y-6 fade-in">
      <CBCReport cbcData={reportData as any} onChange={function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
              throw new Error("Function not implemented.");
          } } />
      <div className="flex justify-between max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white/60 border-t-white rounded-full" />
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportPreview;
