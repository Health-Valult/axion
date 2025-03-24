"use client"

import React from "react";

export interface UFRFormData {
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
  const safeData: UFRFormData = {
    quantity: ufrData?.quantity || "",
    color: ufrData?.color || "",
    transparency: ufrData?.transparency || "",
    specificGravity: ufrData?.specificGravity || "",
    pH: ufrData?.pH || "",
    protein: ufrData?.protein || "",
    sugar: ufrData?.sugar || "",
    ketones: ufrData?.ketones || "",
    bilirubin: ufrData?.bilirubin || "",
    rbc: ufrData?.rbc || "",
    pusCells: ufrData?.pusCells || "",
    epithelialCells: ufrData?.epithelialCells || "",
    casts: ufrData?.casts || "",
    crystals: ufrData?.crystals || "",
    bacteria: ufrData?.bacteria || "",
  };
  
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
          Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={safeData.quantity}
            onChange={onChange}
            placeholder="50 ml"
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
            value={safeData.color}
            onChange={onChange}
            placeholder="Yellow"
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
            value={safeData.transparency}
            onChange={onChange}
            placeholder="Clear"
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
            value={safeData.specificGravity}
            onChange={onChange}
            placeholder="1.020"
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
            value={safeData.pH}
            onChange={onChange}
            placeholder="6.0"
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
            value={safeData.protein}
            onChange={onChange}
            placeholder="Negative"
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
            value={safeData.sugar}
            onChange={onChange}
            placeholder="Negative"
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
            value={safeData.ketones}
            onChange={onChange}
            placeholder="Negative"
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
            value={safeData.bilirubin}
            onChange={onChange}
            placeholder="Negative"
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
            value={safeData.rbc}
            onChange={onChange}
            placeholder="0-2"
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
            value={safeData.pusCells}
            onChange={onChange}
            placeholder="0-5"
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
            value={safeData.epithelialCells}
            onChange={onChange}
            placeholder="0-2"
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
            value={safeData.casts}
            onChange={onChange}
            placeholder="None"
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
            value={safeData.crystals}
            onChange={onChange}
            placeholder="None"
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
            value={safeData.bacteria}
            onChange={onChange}
            placeholder="None"
            className="search-input"
            required
          />
        </div>
       </div>
    </div>
  );
};

export default UFRFormFields;
