"use client"


import React from "react";
import { Calendar, Clock, User, Hospital, FileText } from "lucide-react";

export interface CommonReportData {
  date: string;
  time: string;
  practitioner: string;
  clinic: string;
  recorder: string;
  attachPdf: boolean;
  instructions:string;
  pdfFile: File | null;
}

interface CommonReportFieldsProps {
  reportData: CommonReportData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonReportFields: React.FC<CommonReportFieldsProps> = ({
  reportData,
  onInputChange,
  onCheckboxChange,
  onFileChange
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={reportData.date}
            onChange={onInputChange}
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="time"
            value={reportData.time}
            onChange={onInputChange}
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          Practitioner Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="practitioner"
          value={reportData.practitioner}
          onChange={onInputChange}
          placeholder="Dr. John Smith"
          className="search-input bg-white text-black dark:bg-black dark:text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium flex items-center gap-2">
          <Hospital className="h-4 w-4" />
          Clinic Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="clinic"
          value={reportData.clinic}
          onChange={onInputChange}
          placeholder="City Medical Center"
          className="search-input bg-white text-black dark:bg-black dark:text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          Recorded By <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="recorder"
          value={reportData.recorder}
          onChange={onInputChange}
          placeholder="Your name"
          className="search-input bg-white text-black dark:bg-black dark:text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          Instructions <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="instructions"
          value={reportData.instructions}
          onChange={onInputChange}
          placeholder="Key Notes"
          className="search-input bg-white text-black dark:bg-black dark:text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <input
              type="checkbox"
              name="attachPdf"
              checked={reportData.attachPdf}
              onChange={onCheckboxChange}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Attach PDF (Optional)
          </label>
        </div>

        {reportData.attachPdf && (
          <div className="mt-2">
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              className="hidden"
              onChange={onFileChange}
            />
            <label
              htmlFor="pdf-upload"
              className="flex items-center gap-2 p-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
            >
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">
                {reportData.pdfFile ? reportData.pdfFile.name : "Browse for PDF file"}
              </span>
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default CommonReportFields;
