"use client"

import React from "react";

export interface ESRFormData {
    patientName: "",
    referredBy: "",
    ageSex: "",
    date: "",
    investigations: "",
    esr: "",
}

interface ESRFormFieldsProps {
  esrData: ESRFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ESRFormFields: React.FC<ESRFormFieldsProps> = ({ esrData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="patientName"
          value={esrData.patientName}
          onChange={onChange}
          placeholder="Patient Name"
          className="search-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">
        referredBy <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="referredBy"
          value={esrData.referredBy}
          onChange={onChange}
          placeholder="Nurse Name"
          className="search-input"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          ESR <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="esr"
            value={esrData.esr}
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

export default ESRFormFields;
