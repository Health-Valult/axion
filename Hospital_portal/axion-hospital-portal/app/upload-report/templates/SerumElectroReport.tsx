"use client"

import React from "react";

export interface SerumElectroFormData {
    sodium: "",
    potassium: "",
    chloride: "",
    bicarbonate: "",
    calcium: "",
    magnesium: "",
}

interface SerumElectroFormFieldsProps {
    serumelectroData: SerumElectroFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const SerumElectroFormFields: React.FC<SerumElectroFormFieldsProps> = ({ serumelectroData, onChange }) => {
  const safeData: SerumElectroFormData = {
    sodium: serumelectroData?.sodium || "",
    potassium: serumelectroData?.potassium || "",
    chloride: serumelectroData?.chloride || "",
    bicarbonate: serumelectroData?.bicarbonate || "",
    calcium: serumelectroData?.calcium || "",
    magnesium: serumelectroData?.magnesium || "",
  };
  return (
    <div className="space-y-4">

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Sodium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sodium"
            value={safeData.sodium}
            onChange={onChange}
            placeholder="140"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Potassium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="potassium"
            value={safeData.potassium}
            onChange={onChange}
            placeholder="4.0"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Chloride <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="neutrophils"
            value={safeData.chloride}
            onChange={onChange}
            placeholder="100"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Bicarbonate <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bicarbonate"
            value={safeData.bicarbonate}
            onChange={onChange}
            placeholder="24"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Calcium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="calcium"
            value={safeData.calcium}
            onChange={onChange}
            placeholder="9.5"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Magnesium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="magnesium"
            value={safeData.magnesium}
            onChange={onChange}
            placeholder="2.0"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SerumElectroFormFields;
