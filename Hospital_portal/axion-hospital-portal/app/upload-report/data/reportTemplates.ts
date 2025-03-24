// export interface ReportTemplateField {
//     id: string;
//     label: string;
//     type: string;
//     placeholder: string;
//     required: boolean;
//     unit?: string;
//   }
  
  export interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    // fields: ReportTemplateField[];
  }
  
  export const reportTemplates: ReportTemplate[] = [
    {
      id: "cbc",
      name: "Complete Blood Count (CBC)",
      description: "Measures the levels of red blood cells, white blood cells, and platelets in the blood",
      // fields: [
      //   { id: "hemoglobin", label: "Hemoglobin", type: "number", unit: "g/dL", placeholder: "14.0", required: true },
      //   { id: "totalLeukocyteCount", label: "Total Leukocyte Count", type: "number", unit: "x10^9/L", placeholder: "7.5", required: true },
      //   { id: "neutrophils", label: "Neutrophils", type: "number", unit: "%", placeholder: "60", required: true },
      //   { id: "lymphocytes", label: "Lymphocytes", type: "number", unit: "%", placeholder: "30", required: true },
      //   { id: "eosinophils", label: "Eosinophils", type: "number", unit: "%", placeholder: "3", required: true },
      //   { id: "monocytes", label: "Monocytes", type: "number", unit: "%", placeholder: "6", required: true },
      //   { id: "basophils", label: "Basophils", type: "number", unit: "%", placeholder: "1", required: true },
      //   { id: "plateletCount", label: "Platelet Count", type: "number", unit: "x10^9/L", placeholder: "250", required: true },
      //   { id: "totalRBCCount", label: "Total RBC Count", type: "number", unit: "x10^12/L", placeholder: "5.0", required: true },
      //   { id: "hematocrit", label: "Hematocrit", type: "number", unit: "%", placeholder: "42", required: true },
      //   { id: "meanCorpuscularVolume", label: "Mean Corpuscular Volume", type: "number", unit: "fL", placeholder: "90", required: true },
      //   { id: "meanCellHemoglobin", label: "Mean Cell Hemoglobin", type: "number", unit: "pg", placeholder: "30", required: true },
      //   { id: "meanCellHemoglobinConcentration", label: "Mean Cell Hemoglobin Concentration", type: "number", unit: "g/dL", placeholder: "34", required: true },
      // ],
    },
    {
      id: "ufr",
      name: "Urine Full Report (UFR)",
      description: "Analyzes urine composition and characteristics",
      // fields: [
      //   { id: "quantity", label: "Quantity", type: "text", placeholder: "50 mL", required: true },
      //   { id: "color", label: "Color", type: "text", placeholder: "Yellow", required: true },
      //   { id: "transparency", label: "Transparency", type: "text", placeholder: "Clear", required: true },
      //   { id: "specificGravity", label: "Specific Gravity", type: "number", placeholder: "1.020", required: true },
      //   { id: "pH", label: "pH", type: "number", placeholder: "6.0", required: true },
      //   { id: "protein", label: "Protein", type: "text", placeholder: "Negative", required: true },
      //   { id: "sugar", label: "Sugar", type: "text", placeholder: "Negative", required: true },
      //   { id: "ketones", label: "Ketones", type: "text", placeholder: "Negative", required: true },
      //   { id: "bilirubin", label: "Bilirubin", type: "text", placeholder: "Negative", required: true },
      //   { id: "rbc", label: "RBC", type: "number", placeholder: "0-2", required: true },
      //   { id: "pusCells", label: "Pus Cells", type: "number", placeholder: "0-5", required: true },
      //   { id: "epithelialCells", label: "Epithelial Cells", type: "number", placeholder: "0-2", required: true },
      //   { id: "casts", label: "Casts", type: "text", placeholder: "None", required: true },
      //   { id: "crystals", label: "Crystals", type: "text", placeholder: "None", required: true },
      //   { id: "bacteria", label: "Bacteria", type: "text", placeholder: "None", required: true },
      // ],
    },
    {
      id: "crp",
      name: "C-Reactive Protein (CRP)",
      description: "Measures the level of C-reactive protein in the blood to detect inflammation",
    //   fields: [{ id: "crpLevel", label: "CRP Level", type: "number", unit: "mg/L", placeholder: "5.0", required: true }],
    },
    {
      id: "lft",
      name: "Liver Function Test (LFT)",
      description: "Evaluates liver function and detects liver diseases",
      // fields: [
      //   { id: "serumBilirubinTotal", label: "Serum Bilirubin (Total)", type: "number", unit: "mg/dL", placeholder: "1.0", required: true },
      //   { id: "serumBilirubinDirect", label: "Serum Bilirubin (Direct)", type: "number", unit: "mg/dL", placeholder: "0.3", required: true },
      //   { id: "serumBilirubinIndirect", label: "Serum Bilirubin (Indirect)", type: "number", unit: "mg/dL", placeholder: "0.7", required: true },
      //   { id: "sGPTALT", label: "SGPT/ALT", type: "number", unit: "U/L", placeholder: "30", required: true },
      //   { id: "sGOTAST", label: "SGOT/AST", type: "number", unit: "U/L", placeholder: "28", required: true },
      //   { id: "serumAlkalinePhosphatase", label: "Serum Alkaline Phosphatase", type: "number", unit: "U/L", placeholder: "70", required: true },
      //   { id: "serumProtein", label: "Serum Protein", type: "number", unit: "g/dL", placeholder: "7.2", required: true },
      //   { id: "serumAlbumin", label: "Serum Albumin", type: "number", unit: "g/dL", placeholder: "4.0", required: true },
      //   { id: "globulin", label: "Globulin", type: "number", unit: "g/dL", placeholder: "3.2", required: true },
      //   { id: "agRatio", label: "A/G Ratio", type: "number", placeholder: "1.2", required: true },
      // ],
    },
    {
      id: "fbs",
      name: "Fasting Blood Sugar (FBS)",
      description: "Measures blood glucose levels after fasting",
      // fields: [{ id: "fastingBloodSugar", label: "Fasting Blood Sugar", type: "number", unit: "mg/dL", placeholder: "90", required: true }],
    },
    {
      id: "serumCreatinine",
      name: "Serum Creatinine",
      description: "Evaluates kidney function by measuring creatinine levels in blood",
      // fields: [{ id: "serumCreatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", placeholder: "1.0", required: true }],
    },
    {
      id: "hba1c",
      name: "HbA1c",
      description: "Measures average blood sugar levels over the past three months",
      // fields: [
      //   { id: "hba1c", label: "HbA1c", type: "number", unit: "%", placeholder: "5.5", required: true },
      //   { id: "estimatedAvgGlucose", label: "Estimated Average Glucose", type: "number", unit: "mg/dL", placeholder: "110", required: true },
      // ],
    },

    {
      id: "esr",
      name: "Erythrocyte Sedimentation Rate (ESR)",
      description: "Measures how quickly red blood cells settle at the bottom of a test tube",
      // fields: [
      //   { id: "esr", label: "ESR", type: "number", unit: "mm/hr", placeholder: "10", required: true },
      // ],
    },
    {
      id: "lipidProfile",
      name: "Lipid Profile",
      description: "Measures lipid levels in blood to assess cardiovascular health",
      // fields: [
      //   { id: "totalCholesterol", label: "Total Cholesterol", type: "number", unit: "mg/dL", placeholder: "180", required: true },
      //   { id: "triglycerides", label: "Triglycerides", type: "number", unit: "mg/dL", placeholder: "150", required: true },
      //   { id: "hdl", label: "HDL (High-Density Lipoprotein)", type: "number", unit: "mg/dL", placeholder: "50", required: true },
      //   { id: "ldl", label: "LDL (Low-Density Lipoprotein)", type: "number", unit: "mg/dL", placeholder: "100", required: true },
      //   { id: "vldl", label: "VLDL (Very Low-Density Lipoprotein)", type: "number", unit: "mg/dL", placeholder: "30", required: true },
      //   { id: "ldlToHdlRatio", label: "LDL to HDL Ratio", type: "number", placeholder: "2.0", required: true },
      //   { id: "totalCholesterolToHdlRatio", label: "Total Cholesterol to HDL Ratio", type: "number", placeholder: "4.5", required: true },
      //   { id: "tgToHdlRatio", label: "Triglycerides to HDL Ratio", type: "number", placeholder: "3.0", required: true },
      //   { id: "nonHdlCholesterol", label: "Non-HDL Cholesterol", type: "number", unit: "mg/dL", placeholder: "130", required: true },
      // ],
    },
    {
      id: "serumElectrolytes",
      name: "Serum Electrolytes",
      description: "Evaluates levels of key electrolytes in the blood",
      // fields: [
      //   { id: "sodium", label: "Sodium", type: "number", unit: "mmol/L", placeholder: "140", required: true },
      //   { id: "potassium", label: "Potassium", type: "number", unit: "mmol/L", placeholder: "4.0", required: true },
      //   { id: "chloride", label: "Chloride", type: "number", unit: "mmol/L", placeholder: "100", required: true },
      //   { id: "bicarbonate", label: "Bicarbonate", type: "number", unit: "mmol/L", placeholder: "24", required: true },
      //   { id: "calcium", label: "Calcium", type: "number", unit: "mg/dL", placeholder: "9.5", required: true },
      //   { id: "magnesium", label: "Magnesium", type: "number", unit: "mg/dL", placeholder: "2.0", required: true },
      // ],
    },
    {
      id: "tft",
      name: "Thyroid Function Test (TFT)",
      description: "Assesses thyroid gland function",
      // fields: [
      //   { id: "tsh", label: "TSH (Thyroid-Stimulating Hormone)", type: "number", unit: "mIU/L", placeholder: "2.0", required: true },
      //   { id: "t3", label: "T3 (Triiodothyronine)", type: "number", unit: "ng/dL", placeholder: "100", required: true },
      //   { id: "t4", label: "T4 (Thyroxine)", type: "number", unit: "μg/dL", placeholder: "7.0", required: true },
      // ],
    },
  ];
  
  