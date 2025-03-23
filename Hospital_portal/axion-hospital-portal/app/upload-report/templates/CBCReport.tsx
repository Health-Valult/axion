"use client"

import React from "react";

export interface CBCFormData {
  hemoglobin: string;
  totalLeukocyteCount: string;
  neutrophils: string;
  lymphocytes: string;
  eosinophils: string;
  monocytes: string;
  basophils: string;
  plateletCount: string;
  totalRBCCount: string;
  hematocrit: string;
  meanCorpuscularVolume: string;
  meanCellHemoglobin: string;
  meanCellHemoglobinConcentration: string; 
}

interface CBCFormFieldsProps {
  cbcData: CBCFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CBCFormFields: React.FC<CBCFormFieldsProps> = ({ cbcData, onChange }) => {
    // Ensure all cbcData properties have at least empty string values
    const safeData: CBCFormData = {
      hemoglobin: cbcData?.hemoglobin || "",
      totalLeukocyteCount: cbcData?.totalLeukocyteCount || "",
      neutrophils: cbcData?.neutrophils || "",
      lymphocytes: cbcData?.lymphocytes || "",
      eosinophils: cbcData?.eosinophils || "",
      monocytes: cbcData?.monocytes || "",
      basophils: cbcData?.basophils || "",
      plateletCount: cbcData?.plateletCount || "",
      totalRBCCount: cbcData?.totalRBCCount || "",
      hematocrit: cbcData?.hematocrit || "",
      meanCorpuscularVolume: cbcData?.meanCorpuscularVolume || "",
      meanCellHemoglobin: cbcData?.meanCellHemoglobin || "",
      meanCellHemoglobinConcentration: cbcData?.meanCellHemoglobinConcentration || "",
    };

  return (
    <div className="space-y-4">

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Hemoglobin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hemoglobin"
            value={safeData.hemoglobin}
            onChange={onChange}
            placeholder="14.0"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Total Leukocyte Count <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="totalLeukocyteCount"
            value={safeData.totalLeukocyteCount}
            onChange={onChange}
            placeholder="7.5"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Neutrophils <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="neutrophils"
            value={safeData.neutrophils}
            onChange={onChange}
            placeholder="60"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Lymphocytes <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lymphocytes"
            value={safeData.lymphocytes}
            onChange={onChange}
            placeholder="30"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Eosinophils <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="eosinophils"
            value={safeData.eosinophils}
            onChange={onChange}
            placeholder="3"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Monocytes <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="monocytes"
            value={safeData.monocytes}
            onChange={onChange}
            placeholder="6"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Basophils <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="basophils"
            value={safeData.basophils}
            onChange={onChange}
            placeholder="1"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Platelet Count <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="plateletCount"
            value={safeData.plateletCount}
            onChange={onChange}
            placeholder="250"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Total RBC Count <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="totalRBCCount"
            value={safeData.totalRBCCount}
            onChange={onChange}
            placeholder="5.0"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Hematocrit <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hematocrit"
            value={safeData.hematocrit}
            onChange={onChange}
            placeholder="42"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Mean Corpuscular Volume <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="meanCorpuscularVolume"
            value={safeData.meanCorpuscularVolume}
            onChange={onChange}
            placeholder="90"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Mean Cell Hemoglobin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="meanCellHemoglobin"
            value={safeData.meanCellHemoglobin}
            onChange={onChange}
            placeholder="30"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Mean Cell Hemoglobin Concentration <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="meanCellHemoglobinConcentration"
            value={safeData.meanCellHemoglobinConcentration}
            onChange={onChange}
            placeholder="34"
            className="search-input bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CBCFormFields;
