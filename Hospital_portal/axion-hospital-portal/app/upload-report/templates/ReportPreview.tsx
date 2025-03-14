"use client";

import React from "react";
import { ArrowLeft, Check } from "lucide-react";

interface ReportPreviewProps {
  reportType: string;
  reportData: Record<string, any>;
  isSaving: boolean;
  onBack: () => void;
  onSave: () => void;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({
  reportType,
  reportData,
  isSaving,
  onBack,
  onSave,
}) => {
  if (!reportType) return null;

  return (
    <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto border border-gray-300">
      {/* Report Header */}
      <div className="text-center border-b-2 pb-4">
        <h1 className="text-3xl font-bold uppercase">{reportType} Report</h1>
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">Date:</span> {reportData.date || "N/A"} | 
          <span className="font-semibold"> Time:</span> {reportData.time || "N/A"}
        </p>
      </div>

      {/* Common Report Details */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Patient & Clinic Details</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {["practitioner", "clinic", "recorder"].map((key) => (
              <tr key={key} className="border border-gray-300">
                <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize">{key.replace(/_/g, " ")}:</td>
                <td className="p-2 border border-gray-300">{reportData[key] || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Specific Report Fields */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Report Findings</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {Object.entries(reportData)
              .filter(([key]) => !["date", "time", "practitioner", "clinic", "recorder"].includes(key))
              .map(([key, value]) => (
                <tr key={key} className="border border-gray-300">
                  <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize">{key.replace(/_/g, " ")}:</td>
                  <td className="p-2 border border-gray-300">{value || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          <ArrowLeft className="h-4 w-4" /> Back to Form
        </button>
        <button type="button" onClick={onSave} disabled={isSaving} className="btn-primary">
          {isSaving ? "Saving..." : <><Check className="h-4 w-4" /> Save Report</>}
        </button>
      </div>
    </div>
  );
};

export default ReportPreview;
