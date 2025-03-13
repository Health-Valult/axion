"use client"

import React from "react";

export interface SearumCFormData {
    patientName: "",
    referredBy: "",
    ageSex: "",
    date: "",
    serumCreatinine: "",
}

interface SearumCFormFieldsProps {
  scData: SearumCFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const SearumCFormFields: React.FC<SearumCFormFieldsProps> = ({ scData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="patientName"
          value={scData.patientName}
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
          value={scData.referredBy}
          onChange={onChange}
          placeholder="Nurse Name"
          className="search-input"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Creatinine <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumCreatinine"
            value={scData.serumCreatinine}
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

export default SearumCFormFields;
