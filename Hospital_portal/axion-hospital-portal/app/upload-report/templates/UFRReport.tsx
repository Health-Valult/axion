"use client"

import React from "react";

export interface UFRFormData {
    patientName: "",
    referredBy: "",
    ageSex: "",
    date: "",
    quantity: "",
    color: "",
    transparency: "",
    specificGravity: "",
    pH: "",
    protein: "",
    sugar: "",
    ketones: "",
    bilirubin: "",
    rbc: "",
    pusCells: "",
    epithelialCells: "",
    casts: "",
    crystals: "",
    bacteria: "",
}

interface UFRFormFieldsProps {
    ufrData: UFRFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const UFRFormFields: React.FC<UFRFormFieldsProps> = ({ ufrData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="patientName"
          value={ufrData.patientName}
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
          value={ufrData.referredBy}
          onChange={onChange}
          placeholder="Nurse Name"
          className="search-input"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={ufrData.quantity}
            onChange={onChange}
            placeholder="14.0"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Color <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="color"
            value={ufrData.color}
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
          Transparency <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="transparency"
            value={ufrData.transparency}
            onChange={onChange}
            placeholder="60"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Specific Gravity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="specificGravity"
            value={ufrData.specificGravity}
            onChange={onChange}
            placeholder="30"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          pH <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pH"
            value={ufrData.pH}
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
          Protein <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="protein"
            value={ufrData.protein}
            onChange={onChange}
            placeholder="6"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Sugar <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sugar"
            value={ufrData.sugar}
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
          Ketones <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ketones"
            value={ufrData.ketones}
            onChange={onChange}
            placeholder="250"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Bilirubin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bilirubin"
            value={ufrData.bilirubin}
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
          RBC <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="rbc"
            value={ufrData.rbc}
            onChange={onChange}
            placeholder="42"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            PUS Cells <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pusCells"
            value={ufrData.pusCells}
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
          Epithelial Cells <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="epithelialCells"
            value={ufrData.epithelialCells}
            onChange={onChange}
            placeholder="30"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Casts <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="casts"
            value={ufrData.casts}
            onChange={onChange}
            placeholder="34"
            className="search-input"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Crystals <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="crystals"
            value={ufrData.crystals}
            onChange={onChange}
            placeholder="30"
            className="search-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Bacteria <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bacteria"
            value={ufrData.bacteria}
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

export default UFRFormFields;
