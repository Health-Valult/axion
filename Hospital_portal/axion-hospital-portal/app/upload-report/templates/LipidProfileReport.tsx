"use client"

import React from "react";

export interface LipidProfileFormData {
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
  const safeData: LipidProfileFormData = {
    totalCholesterol:  lipidprofileData?.totalCholesterol || "",
    triglycerides:  lipidprofileData?.triglycerides || "",
    hdl:  lipidprofileData?.hdl || "",
    ldl:  lipidprofileData?.ldl || "",
    vldl:  lipidprofileData?.vldl || "",
    ldlToHdlRatio:  lipidprofileData?.ldlToHdlRatio || "",
    totalCholesterolToHdlRatio:  lipidprofileData?.nonHdlCholesterol || "",
    tgToHdlRatio:  lipidprofileData?.tgToHdlRatio || "",
    nonHdlCholesterol:  lipidprofileData?.nonHdlCholesterol || "",
  };
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Total Cholesterol <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="totalCholesterol"
            value={safeData.totalCholesterol}
            onChange={onChange}
            placeholder="180"
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
            value={safeData.triglycerides}
            onChange={onChange}
            placeholder="150"
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
            value={safeData.hdl}
            onChange={onChange}
            placeholder="50"
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
            value={safeData.ldl}
            onChange={onChange}
            placeholder="100"
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
            value={safeData.vldl}
            onChange={onChange}
            placeholder="30"
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
            value={safeData.ldlToHdlRatio}
            onChange={onChange}
            placeholder="2.0"
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
            value={safeData.totalCholesterolToHdlRatio}
            onChange={onChange}
            placeholder="4.5"
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
            value={safeData.tgToHdlRatio}
            onChange={onChange}
            placeholder="3.0"
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
            value={safeData.nonHdlCholesterol}
            onChange={onChange}
            placeholder="130"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LipidProfileFormFields;
