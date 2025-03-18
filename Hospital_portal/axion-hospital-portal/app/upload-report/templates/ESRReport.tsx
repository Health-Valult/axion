"use client"

import React from "react";

export interface ESRFormData {
    esr: "",
}

interface ESRFormFieldsProps {
  esrData: ESRFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ESRFormFields: React.FC<ESRFormFieldsProps> = ({ esrData, onChange }) => {
  return (
    <div className="space-y-4">
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
            placeholder="10"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ESRFormFields;
