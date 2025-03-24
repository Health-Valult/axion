"use client"


import React from "react";
import { Calendar, Clock, User, Hospital, FileText } from "lucide-react";

export interface CommonReportData {
  patientNIC: string,
  date: string;
  time: string;
  practitioner: string;
  clinic: string;
  recorder: string;
  instructions:string;
  
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
            Patient NIC <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="patientNIC"
            value={reportData.patientNIC}
            onChange={onInputChange}
            placeholder="Patient NIC"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
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
    </>
  );
};

export default CommonReportFields;
