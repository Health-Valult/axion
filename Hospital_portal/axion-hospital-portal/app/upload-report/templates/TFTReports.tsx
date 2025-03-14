"use client"

import React from "react";

export interface TFTFormData {
    patientName: "",
    referredBy: "",
    ageSex: "",
    date: "",
    investigations: "",
    tsh: "",
    t3: "",
    t4: "",
}

interface TFTFormFieldsProps {
  tftData: TFTFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const TFTFormFields: React.FC<TFTFormFieldsProps> = ({ tftData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="patientName"
          value={tftData.patientName}
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
          value={tftData.referredBy}
          onChange={onChange}
          placeholder="Nurse Name"
          className="search-input"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          TSH <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tsh"
            value={tftData.tsh}
            onChange={onChange}
            placeholder="14.0"
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
            value={tftData.t3}
            onChange={onChange}
            placeholder="7.5"
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
            value={tftData.t4}
            onChange={onChange}
            placeholder="60"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default TFTFormFields;
