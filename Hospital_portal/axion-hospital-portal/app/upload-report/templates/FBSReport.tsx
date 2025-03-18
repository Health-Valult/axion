"use client"

import React from "react";

export interface FBSFormData {
    fastingBloodSugar: "",
}

interface FBSFormFieldsProps {
  fbsData: FBSFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FBSFormFields: React.FC<FBSFormFieldsProps> = ({ fbsData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Fasting Blood Sugar <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fastingBloodSugar"
            value={fbsData.fastingBloodSugar}
            onChange={onChange}
            placeholder="90"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default FBSFormFields;
