from pydantic import BaseModel, Field

class CBCReportTemplate(BaseModel):
    hemoglobin: str = Field(..., metadata={"official_name": "Hemoglobin", "loinc_code": "718-7", "unit": "g/dL"})
    totalLeukocyteCount: str = Field(..., metadata={"official_name": "Leukocytes", "loinc_code": "6690-2", "unit": "10^3/µL"})
    neutrophils: str = Field(..., metadata={"official_name": "Neutrophils", "loinc_code": "770-8", "unit": "%"})
    lymphocytes: str = Field(..., metadata={"official_name": "Lymphocytes", "loinc_code": "731-0", "unit": "%"})
    eosinophils: str = Field(..., metadata={"official_name": "Eosinophils", "loinc_code": "711-2", "unit": "%"})
    monocytes: str = Field(..., metadata={"official_name": "Monocytes", "loinc_code": "742-7", "unit": "%"})
    basophils: str = Field(..., metadata={"official_name": "Basophils", "loinc_code": "706-2", "unit": "%"})
    plateletCount: str = Field(..., metadata={"official_name": "Platelet Count", "loinc_code": "777-3", "unit": "10^3/µL"})
    totalRBCCount: str = Field(..., metadata={"official_name": "Red Blood Cell Count", "loinc_code": "789-8", "unit": "10^6/µL"})
    hematocrit: str = Field(..., metadata={"official_name": "Hematocrit", "loinc_code": "4544-3", "unit": "%"})
    meanCorpuscularVolume: str = Field(..., metadata={"official_name": "Mean Corpuscular Volume", "loinc_code": "787-2", "unit": "fL"})
    meanCellHemoglobin: str = Field(..., metadata={"official_name": "Mean Corpuscular Hemoglobin", "loinc_code": "785-6", "unit": "pg"})
    meanCellHemoglobinConcentration: str = Field(..., metadata={"official_name": "Mean Corpuscular Hemoglobin Concentration", "loinc_code": "786-4", "unit": "g/dL"})

class UFRTemplate(BaseModel):
    quantity: str = Field(..., metadata={"official_name": "Quantity", "loinc_code": "5767-9", "unit": "mL"})
    color: str = Field(..., metadata={"official_name": "Color of Urine", "loinc_code": "5778-6", "unit": "N/A"})
    transparency: str = Field(..., metadata={"official_name": "Urine Clarity", "loinc_code": "5780-2", "unit": "N/A"})
    specificGravity: str = Field(..., metadata={"official_name": "Specific Gravity", "loinc_code": "5811-5", "unit": "ratio"})
    pH: str = Field(..., metadata={"official_name": "Urine pH", "loinc_code": "2756-5", "unit": "pH"})
    protein: str = Field(..., metadata={"official_name": "Urine Protein", "loinc_code": "5804-0", "unit": "mg/dL"})
    sugar: str = Field(..., metadata={"official_name": "Urine Glucose", "loinc_code": "5792-7", "unit": "mg/dL"})
    ketones: str = Field(..., metadata={"official_name": "Urine Ketones", "loinc_code": "5797-6", "unit": "mg/dL"})
    bilirubin: str = Field(..., metadata={"official_name": "Urine Bilirubin", "loinc_code": "5802-4", "unit": "mg/dL"})
    rbc: str = Field(..., metadata={"official_name": "Urine Red Blood Cells", "loinc_code": "58445-8", "unit": "/hpf"})
    pusCells: str = Field(..., metadata={"official_name": "Urine White Blood Cells", "loinc_code": "5821-4", "unit": "/hpf"})
    epithelialCells: str = Field(..., metadata={"official_name": "Urine Epithelial Cells", "loinc_code": "58439-1", "unit": "/hpf"})
    casts: str = Field(..., metadata={"official_name": "Urine Casts", "loinc_code": "5809-9", "unit": "/lpf"})
    crystals: str = Field(..., metadata={"official_name": "Urine Crystals", "loinc_code": "58441-7", "unit": "/hpf"})
    bacteria: str = Field(..., metadata={"official_name": "Urine Bacteria", "loinc_code": "5822-2", "unit": "/hpf"})

class CRPReportTemplate(BaseModel):
    crpLevel: str = Field(..., metadata={"official_name": "C-Reactive Protein", "loinc_code": "1988-5", "unit": "mg/L"})

class LFTReportTemplate(BaseModel):
    serumBilirubinTotal: str = Field(..., metadata={"official_name": "Bilirubin Total", "loinc_code": "1975-2", "unit": "mg/dL"})
    serumBilirubinDirect: str = Field(..., metadata={"official_name": "Bilirubin Direct", "loinc_code": "1968-7", "unit": "mg/dL"})
    serumBilirubinIndirect: str = Field(..., metadata={"official_name": "Bilirubin Indirect", "loinc_code": "1963-8", "unit": "mg/dL"})
    sGPTALT: str = Field(..., metadata={"official_name": "ALT", "loinc_code": "1742-6", "unit": "U/L"})
    sGOTAST: str = Field(..., metadata={"official_name": "AST", "loinc_code": "1920-8", "unit": "U/L"})
    serumAlkalinePhosphatase: str = Field(..., metadata={"official_name": "Alkaline Phosphatase", "loinc_code": "6768-6", "unit": "U/L"})
    serumProtein: str = Field(..., metadata={"official_name": "Total Protein", "loinc_code": "2885-2", "unit": "g/dL"})
    serumAlbumin: str = Field(..., metadata={"official_name": "Albumin", "loinc_code": "1751-7", "unit": "g/dL"})
    globulin: str = Field(..., metadata={"official_name": "Globulin", "loinc_code": "2336-8", "unit": "g/dL"})
    agRatio: str = Field(..., metadata={"official_name": "Albumin/Globulin Ratio", "loinc_code": "2339-2", "unit": "ratio"})

class FBSReportTemplate(BaseModel):
    fastingBloodSugar: str = Field(..., metadata={"official_name": "Glucose [Bld] Fasting", "loinc_code": "1558-6", "unit": "mg/dL"})

class SerumCreatinineReportTemplate(BaseModel):
    serumCreatinine: str = Field(..., metadata={"official_name": "Creatinine", "loinc_code": "2160-0", "unit": "mg/dL"})

class SerumElectrolytesReportTemplate(BaseModel):
    sodium: str = Field(..., metadata={"official_name": "Sodium", "loinc_code": "2951-2", "unit": "mmol/L"})
    potassium: str = Field(..., metadata={"official_name": "Potassium", "loinc_code": "2823-3", "unit": "mmol/L"})
    chloride: str = Field(..., metadata={"official_name": "Chloride", "loinc_code": "2075-0", "unit": "mmol/L"})
    bicarbonate: str = Field(..., metadata={"official_name": "Bicarbonate", "loinc_code": "1963-8", "unit": "mmol/L"})
    calcium: str = Field(..., metadata={"official_name": "Calcium", "loinc_code": "17861-6", "unit": "mg/dL"})
    magnesium: str = Field(..., metadata={"official_name": "Magnesium", "loinc_code": "19123-9", "unit": "mg/dL"})

class LipidProfileReportTemplate(BaseModel):
    totalCholesterol: str = Field(..., metadata={"official_name": "Cholesterol Total", "loinc_code": "2093-3", "unit": "mg/dL"})
    triglycerides: str = Field(..., metadata={"official_name": "Triglycerides", "loinc_code": "2571-8", "unit": "mg/dL"})
    hdl: str = Field(..., metadata={"official_name": "HDL Cholesterol", "loinc_code": "2085-9", "unit": "mg/dL"})
    ldl: str = Field(..., metadata={"official_name": "LDL Cholesterol", "loinc_code": "2089-1", "unit": "mg/dL"})
    vldl: str = Field(..., metadata={"official_name": "VLDL Cholesterol", "loinc_code": "3043-7", "unit": "mg/dL"})
    ldlToHdlRatio: str = Field(..., metadata={"official_name": "LDL/HDL Ratio", "loinc_code": "9830-1", "unit": "ratio"})
    totalCholesterolToHdlRatio: str = Field(..., metadata={"official_name": "Cholesterol/HDL Ratio", "loinc_code": "9832-7", "unit": "ratio"})
    tgToHdlRatio: str = Field(..., metadata={"official_name": "Triglyceride/HDL Ratio", "loinc_code": "50010-2", "unit": "ratio"})
    nonHdlCholesterol: str = Field(..., metadata={"official_name": "Non-HDL Cholesterol", "loinc_code": "43396-1", "unit": "mg/dL"})

class HbA1cReportTemplate(BaseModel):
    hba1c: str = Field(..., metadata={"official_name": "Hemoglobin A1c", "loinc_code": "4548-4", "unit": "%"})
    estimatedAvgGlucose: str = Field(..., metadata={"official_name": "Estimated Average Glucose", "loinc_code": "1557-8", "unit": "mg/dL"})

class ESRReportTemplate(BaseModel):
    esr: str = Field(..., metadata={"official_name": "Erythrocyte Sedimentation Rate", "loinc_code": "4537-8", "unit": "mm/hr"})

class TFTReportTemplate(BaseModel):
    tsh: str = Field(..., metadata={"official_name": "Thyroid Stimulating Hormone", "loinc_code": "3016-3", "unit": "µIU/mL"})
    t3: str = Field(..., metadata={"official_name": "Triiodothyronine (T3)", "loinc_code": "3054-0", "unit": "ng/dL"})
    t4: str = Field(..., metadata={"official_name": "Thyroxine (T4)", "loinc_code": "3026-2", "unit": "µg/dL"})
