"use client"

import React from "react";

export interface CPRFormData {
    patientName: "",
    referredBy: "",
    ageSex: "",
    date: "",
    investigations: "",
    crpLevel: "",
}

interface CPRFormFieldsProps {
  cprData: CPRFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CPRFormFields: React.FC<CPRFormFieldsProps> = ({ cprData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="patientName"
          value={cprData.patientName}
          onChange={onChange}
          placeholder="Patient Name"
          className="search-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">
        Referred By <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="referredBy"
          value={cprData.referredBy}
          onChange={onChange}
          placeholder="28/M"
          className="search-input"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          CRP Level <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hemoglobin"
            value={cprData.crpLevel}
            onChange={onChange}
            placeholder="14.0"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CPRFormFields;
