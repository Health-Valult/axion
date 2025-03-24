"use client"

import React from "react";

export interface HbA1cFormData {
    hba1c: "",
    estimatedAvgGlucose: "", 
}

interface HbA1cFormFieldsProps {
    hbA1cData: HbA1cFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const HbA1cFormFields: React.FC<HbA1cFormFieldsProps> = ({ hbA1cData, onChange }) => {
  const safeData: HbA1cFormData = {
    hba1c: hbA1cData?.hba1c || "",
    estimatedAvgGlucose: hbA1cData?.estimatedAvgGlucose || "",};
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          HbA1c <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hba1c"
            value={safeData.hba1c}
            onChange={onChange}
            placeholder="5.5"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Estimated Avg Glucose <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="estimatedAvgGlucose"
            value={safeData.estimatedAvgGlucose}
            onChange={onChange}
            placeholder="110"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default HbA1cFormFields;
