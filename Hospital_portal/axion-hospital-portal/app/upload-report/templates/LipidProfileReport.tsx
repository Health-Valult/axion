"use client"

import React from "react";

export interface LipidProfileFormData {
    patientName: "",
    referredBy: "",
    ageSex: "",
    date: "",
    totalCholesterol: "",
    triglycerides: "",
    hdl: "",
    ldl: "",
    vldl: "",
    ldlToHdlRatio: "",
    totalCholesterolToHdlRatio: "",
    tgToHdlRatio: "",
    nonHdlCholesterol: "",
}

interface LipidProfileFormFieldsProps {
    lipidprofileData: LipidProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const LipidProfileFormFields: React.FC<LipidProfileFormFieldsProps> = ({ lipidprofileData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="patientName"
          value={lipidprofileData.patientName}
          onChange={onChange}
          placeholder="Patient Name"
          className="search-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">
        Referred By <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="referredBy"
          value={lipidprofileData.referredBy}
          onChange={onChange}
          placeholder="Nurse Name"
          className="search-input"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Total Cholesterol <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="totalCholesterol"
            value={lipidprofileData.totalCholesterol}
            onChange={onChange}
            placeholder="14.0"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Triglycerides <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="triglycerides"
            value={lipidprofileData.triglycerides}
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
          HDL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hdl"
            value={lipidprofileData.hdl}
            onChange={onChange}
            placeholder="60"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          LDL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ldl"
            value={lipidprofileData.ldl}
            onChange={onChange}
            placeholder="30"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          VLDL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="vldl"
            value={lipidprofileData.vldl}
            onChange={onChange}
            placeholder="3"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          LDL To HDL Ratio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ldlToHdlRatio"
            value={lipidprofileData.ldlToHdlRatio}
            onChange={onChange}
            placeholder="6"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Total Cholesterol To HDL Ratio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="totalCholesterolToHdlRatio"
            value={lipidprofileData.totalCholesterolToHdlRatio}
            onChange={onChange}
            placeholder="1"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          TG To HDL Ratio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tgToHdlRatio"
            value={lipidprofileData.tgToHdlRatio}
            onChange={onChange}
            placeholder="250"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Non HDL Cholesterol <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nonHdlCholesterol"
            value={lipidprofileData.nonHdlCholesterol}
            onChange={onChange}
            placeholder="5.0"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LipidProfileFormFields;
