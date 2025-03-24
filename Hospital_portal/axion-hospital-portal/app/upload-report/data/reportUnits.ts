export const ReportFieldUnits: Record<string, Record<string, string>> = {  
    CBC: {
        hemoglobin: "g/dL",
        totalLeukocyteCount: "cells/mm³",
        neutrophils: "%",
        lymphocytes: "%",
        eosinophils: "%",
        monocytes: "%",
        basophils: "%",
        plateletCount: "lacs/cmm",
        totalRBCCount: "million/cmm",
        hematocrit: "%",
        meanCorpuscularVolume: "fL",
        meanCellHemoglobin: "pg",
        meanCellHemoglobinConcentration: "g/dL",
    },
    
    UFR: {
        quantity: "mL",
        specificGravity: "",
        pH: "pH",
        rbc: "/hpf",
        pusCells: "/hpf",
        epithelialCells: "/hpf",
    },
    
    CRP: {
        crpLevel: "mg/L",
    },
    
    LFT: {
        serumBilirubinTotal: "mg/dL",
        serumBilirubinDirect: "mg/dL",
        serumBilirubinIndirect: "mg/dL",
        sGPTALT: "U/L",
        sGOTAST: "U/L",
        serumAlkalinePhosphatase: "U/L",
        serumProtein: "g/dL",
        serumAlbumin: "g/dL",
        globulin: "g/dL",
        agRatio: "ratio",
    },
    
    FBS: {
        fastingBloodSugar: "mg/dL",
    },
    
    SerumCreatinine: {
        serumCreatinine: "mg/dL",
    },
    
    SerumElectrolytes: {
        sodium: "mmol/L",
        potassium: "mmol/L",
        chloride: "mmol/L",
        bicarbonate: "mmol/L",
        calcium: "mg/dL",
        magnesium: "mg/dL",
    },
    
    LipidProfile: {
        totalCholesterol: "mg/dL",
        triglycerides: "mg/dL",
        hdl: "mg/dL",
        ldl: "mg/dL",
        vldl: "mg/dL",
        ldlToHdlRatio: "ratio",
        totalCholesterolToHdlRatio: "ratio",
        tgToHdlRatio: "ratio",
        nonHdlCholesterol: "mg/dL",
    },
    
    HbA1c: {
        hba1c: "%",
        estimatedAvgGlucose: "mg/dL",
    },
    
    ESR: {
        esr: "mm/hr",
    },
    
    TFT: {
        tsh: "mIU/L",
        t3: "ng/dL",
        t4: "µg/dL",
    },
};
