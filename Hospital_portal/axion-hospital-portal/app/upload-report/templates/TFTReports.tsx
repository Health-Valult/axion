"use client"

import React from "react";

export interface TFTFormData {
    tsh: "",
    t3: "",
    t4: "",
}

interface TFTFormFieldsProps {
  tftData: TFTFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const TFTFormFields: React.FC<TFTFormFieldsProps> = ({ tftData, onChange }) => {
  const safeData: TFTFormData = {
    tsh: tftData?.tsh || "",
    t3: tftData?.t3 || "",
    t4: tftData?.t4 || "",
  };
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          TSH <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tsh"
            value={safeData.tsh}
            onChange={onChange}
            placeholder="2.0"
            className="search-input"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
          T3 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="t3"
            value={safeData.t3}
            onChange={onChange}
            placeholder="100"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          T4 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="t4"
            value={safeData.t4}
            onChange={onChange}
            placeholder="7.0"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default TFTFormFields;
