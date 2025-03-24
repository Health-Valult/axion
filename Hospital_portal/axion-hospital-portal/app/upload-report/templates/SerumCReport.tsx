"use client"

import React from "react";

export interface SearumCFormData {
    serumCreatinine: "",
}

interface SearumCFormFieldsProps {
  scData: SearumCFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const SearumCFormFields: React.FC<SearumCFormFieldsProps> = ({ scData, onChange }) => {
  const safeData: SearumCFormData = {
    serumCreatinine: scData?.serumCreatinine || "",
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Creatinine <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumCreatinine"
            value={safeData.serumCreatinine}
            onChange={onChange}
            placeholder="1.0"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SearumCFormFields;
