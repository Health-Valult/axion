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
  date?: string; 
}

interface CBCFormFieldsProps {
  cbcData: CBCFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CBCFormFields: React.FC<CBCFormFieldsProps> = ({ cbcData, onChange }) => {
  return (
    <div className="space-y-4">
      {/* <div className="space-y-2">
        <label className="block text-sm font-medium">
          Investigations <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="investigations"
          value={cbcData.investigations}
          onChange={onChange}
          placeholder="Patient Name"
          className="search-input"
          required
        />
      </div> */}
      
      {/* <div className="space-y-2">
        <label className="block text-sm font-medium">
          Reffered By <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="ageSex"
          value={cbcData.ageSex}
          onChange={onChange}
          placeholder="28/M"
          className="search-input"
          required
        />
      </div> */}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Hemoglobin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hemoglobin"
            value={cbcData.hemoglobin}
            onChange={onChange}
            placeholder="14.0"
            className="search-input"
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
            value={cbcData.totalLeukocyteCount}
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
            Neutrophils <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="neutrophils"
            value={cbcData.neutrophils}
            onChange={onChange}
            placeholder="60"
            className="search-input"
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
            value={cbcData.lymphocytes}
            onChange={onChange}
            placeholder="30"
            className="search-input"
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
            value={cbcData.eosinophils}
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
            Monocytes <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="monocytes"
            value={cbcData.monocytes}
            onChange={onChange}
            placeholder="6"
            className="search-input"
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
            value={cbcData.basophils}
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
            Platelet Count <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="plateletCount"
            value={cbcData.plateletCount}
            onChange={onChange}
            placeholder="250"
            className="search-input"
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
            value={cbcData.totalRBCCount}
            onChange={onChange}
            placeholder="5.0"
            className="search-input"
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
            value={cbcData.hematocrit}
            onChange={onChange}
            placeholder="42"
            className="search-input"
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
            value={cbcData.meanCorpuscularVolume}
            onChange={onChange}
            placeholder="90"
            className="search-input"
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
            value={cbcData.meanCellHemoglobin}
            onChange={onChange}
            placeholder="30"
            className="search-input"
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
            value={cbcData.meanCellHemoglobinConcentration}
            onChange={onChange}
            placeholder="34"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CBCFormFields;
