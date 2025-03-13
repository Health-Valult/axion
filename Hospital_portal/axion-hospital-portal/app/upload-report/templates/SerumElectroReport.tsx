"use client"

import React from "react";

export interface SerumElectroFormData {
    patientName: "",
    referredBy: "",
    ageSex: "",
    date: "",
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
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="patientName"
          value={serumelectroData.patientName}
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
          value={serumelectroData.referredBy}
          onChange={onChange}
          placeholder="Nurse Name"
          className="search-input"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Sodium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sodium"
            value={serumelectroData.sodium}
            onChange={onChange}
            placeholder="14.0"
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
            value={serumelectroData.potassium}
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
          Chloride <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="neutrophils"
            value={serumelectroData.chloride}
            onChange={onChange}
            placeholder="60"
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
            value={serumelectroData.bicarbonate}
            onChange={onChange}
            placeholder="30"
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
            value={serumelectroData.calcium}
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
          Magnesium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="magnesium"
            value={serumelectroData.magnesium}
            onChange={onChange}
            placeholder="6"
            className="search-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SerumElectroFormFields;
