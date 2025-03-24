"use client"

import React from "react";

export interface CPRFormData {
    crpLevel: string;
}

interface CPRFormFieldsProps {
  cprData: CPRFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CPRFormFields: React.FC<CPRFormFieldsProps> = ({ cprData, onChange }) => {
    const safeData: CPRFormData = {
      crpLevel: cprData?.crpLevel || "",
    }
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          CRP Level <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="crpLevel"
            className="search-input"
            value={safeData.crpLevel}
            onChange={onChange}
            placeholder="5.0"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CPRFormFields;
