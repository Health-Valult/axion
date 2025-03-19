"use client"

import React from "react";

export interface CPRFormData {
    crpLevel: "",
}

interface CPRFormFieldsProps {
  cprData: CPRFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CPRFormFields: React.FC<CPRFormFieldsProps> = ({ cprData, onChange }) => {
  return (
    <div className="space-y-4">
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
            placeholder="5.0"
            className="search-input dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CPRFormFields;
