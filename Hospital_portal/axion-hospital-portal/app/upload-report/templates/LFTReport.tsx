"use client"

import React from "react";

export interface LFTFormData {
    serumBilirubinTotal: "",
    serumBilirubinDirect: "",
    serumBilirubinIndirect: "",
    sGPTALT: "",
    sGOTAST: "",
    serumAlkalinePhosphatase: "",
    serumProtein: "",
    serumAlbumin: "",
    globulin: "",
    agRatio: "",
}

interface LFTFormFieldsProps {
  lftData: LFTFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const LFTFormFields: React.FC<LFTFormFieldsProps> = ({ lftData, onChange }) => {
  const safeData: LFTFormData = {
    serumBilirubinTotal: lftData?.serumBilirubinTotal || "",
    serumBilirubinDirect: lftData?.serumBilirubinDirect || "",
    serumBilirubinIndirect: lftData?.serumBilirubinIndirect || "",
    sGPTALT: lftData?.sGPTALT || "",
    sGOTAST: lftData?.sGOTAST || "",
    serumAlkalinePhosphatase: lftData?.serumAlkalinePhosphatase || "",
    serumProtein: lftData?.serumProtein || "",
    serumAlbumin: lftData?.serumAlbumin || "",
    globulin: lftData?.globulin || "",
    agRatio: lftData?.agRatio || "",
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Bilirubin Total <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumBilirubinTotal"
            value={safeData.serumBilirubinTotal}
            onChange={onChange}
            placeholder="1.0"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Bilirubin Direct <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumBilirubinDirect"
            value={safeData.serumBilirubinDirect}
            onChange={onChange}
            placeholder="0.3"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Bilirubin Indirect <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumBilirubinIndirect"
            value={safeData.serumBilirubinIndirect}
            onChange={onChange}
            placeholder="0.7"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          SGPTALT <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sGPTALT"
            value={safeData.sGPTALT}
            onChange={onChange}
            placeholder="30"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          SGOTAST <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sGOTAST"
            value={safeData.sGOTAST}
            onChange={onChange}
            placeholder="28"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Alkaline Phosphatase <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumAlkalinePhosphatase"
            value={safeData.serumAlkalinePhosphatase}
            onChange={onChange}
            placeholder="70"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Protein <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumProtein"
            value={safeData.serumProtein}
            onChange={onChange}
            placeholder="7.2"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Serum Albumin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serumAlbumin"
            value={safeData.serumAlbumin}
            onChange={onChange}
            placeholder="4.0"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Globulin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="globulin"
            value={safeData.globulin}
            onChange={onChange}
            placeholder="3.2"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          ag Ratio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="agRatio"
            value={safeData.agRatio}
            onChange={onChange}
            placeholder="1.2"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LFTFormFields;
