from typing import Annotated, Literal, Union
from pydantic import BaseModel, Field
from datetime import datetime
from app.models.models import*
from app.models.updated_models import *

"""class CBCReportTemplate(BaseModel):
    hemoglobin: str = Field(..., metadata={"official_name": "Hemoglobin", "loinc_code": "718-7"})
    totalLeukocyteCount: str = Field(..., metadata={"official_name": "Leukocytes", "loinc_code": "6690-2"})
    neutrophils: str = Field(..., metadata={"official_name": "Neutrophils", "loinc_code": "770-8"})
    lymphocytes: str = Field(..., metadata={"official_name": "Lymphocytes", "loinc_code": "731-0"})
    eosinophils: str = Field(..., metadata={"official_name": "Eosinophils", "loinc_code": "711-2"})
    monocytes: str = Field(..., metadata={"official_name": "Monocytes", "loinc_code": "742-7"})
    basophils: str = Field(..., metadata={"official_name": "Basophils", "loinc_code": "706-2"})
    plateletCount: str = Field(..., metadata={"official_name": "Platelet Count", "loinc_code": "777-3"})
    totalRBCCount: str = Field(..., metadata={"official_name": "Red Blood Cell Count", "loinc_code": "789-8"})
    hematocrit: str = Field(..., metadata={"official_name": "Hematocrit", "loinc_code": "4544-3"})
    meanCorpuscularVolume: str = Field(..., metadata={"official_name": "Mean Corpuscular Volume", "loinc_code": "787-2"})
    meanCellHemoglobin: str = Field(..., metadata={"official_name": "Mean Corpuscular Hemoglobin", "loinc_code": "785-6"})
    meanCellHemoglobinConcentration: str = Field(..., metadata={"official_name": "Mean Corpuscular Hemoglobin Concentration", "loinc_code": "786-4"})


class UFRTemplate(BaseModel):
    quantity: str = Field(..., metadata={"official_name": "Quantity", "loinc_code": "5767-9"})
    color: str = Field(..., metadata={"official_name": "Color of Urine", "loinc_code": "5778-6"})
    transparency: str = Field(..., metadata={"official_name": "Urine Clarity", "loinc_code": "5780-2"})
    specificGravity: str = Field(..., metadata={"official_name": "Specific Gravity", "loinc_code": "5811-5"})
    pH: str = Field(..., metadata={"official_name": "Urine pH", "loinc_code": "2756-5"})
    protein: str = Field(..., metadata={"official_name": "Urine Protein", "loinc_code": "5804-0"})
    sugar: str = Field(..., metadata={"official_name": "Urine Glucose", "loinc_code": "5792-7"})
    ketones: str = Field(..., metadata={"official_name": "Urine Ketones", "loinc_code": "5797-6"})
    bilirubin: str = Field(..., metadata={"official_name": "Urine Bilirubin", "loinc_code": "5802-4"})
    rbc: str = Field(..., metadata={"official_name": "Urine Red Blood Cells", "loinc_code": "58445-8"})
    pusCells: str = Field(..., metadata={"official_name": "Urine White Blood Cells", "loinc_code": "5821-4"})
    epithelialCells: str = Field(..., metadata={"official_name": "Urine Epithelial Cells", "loinc_code": "58439-1"})
    casts: str = Field(..., metadata={"official_name": "Urine Casts", "loinc_code": "5809-9"})
    crystals: str = Field(..., metadata={"official_name": "Urine Crystals", "loinc_code": "58441-7"})
    bacteria: str = Field(..., metadata={"official_name": "Urine Bacteria", "loinc_code": "5822-2"})


class CRPReportTemplate(BaseModel):
    crpLevel: str = Field(..., metadata={"official_name": "C-Reactive Protein", "loinc_code": "1988-5"})


class LFTReportTemplate(BaseModel):
    serumBilirubinTotal: str = Field(..., metadata={"official_name": "Bilirubin Total", "loinc_code": "1975-2"})
    serumBilirubinDirect: str = Field(..., metadata={"official_name": "Bilirubin Direct", "loinc_code": "1968-7"})
    serumBilirubinIndirect: str = Field(..., metadata={"official_name": "Bilirubin Indirect", "loinc_code": "1963-8"})
    sGPTALT: str = Field(..., metadata={"official_name": "ALT", "loinc_code": "1742-6"})
    sGOTAST: str = Field(..., metadata={"official_name": "AST", "loinc_code": "1920-8"})
    serumAlkalinePhosphatase: str = Field(..., metadata={"official_name": "Alkaline Phosphatase", "loinc_code": "6768-6"})
    serumProtein: str = Field(..., metadata={"official_name": "Total Protein", "loinc_code": "2885-2"})
    serumAlbumin: str = Field(..., metadata={"official_name": "Albumin", "loinc_code": "1751-7"})
    globulin: str = Field(..., metadata={"official_name": "Globulin", "loinc_code": "2336-8"})
    agRatio: str = Field(..., metadata={"official_name": "Albumin/Globulin Ratio", "loinc_code": "2339-2"})


class FBSReportTemplate(BaseModel):
    fastingBloodSugar: str = Field(..., metadata={"official_name": "Glucose [Bld] Fasting", "loinc_code": "1558-6"})


class SerumCreatinineReportTemplate(BaseModel):
    serumCreatinine: str = Field(..., metadata={"official_name": "Creatinine", "loinc_code": "2160-0"})


class SerumElectrolytesReportTemplate(BaseModel):
    sodium: str = Field(..., metadata={"official_name": "Sodium", "loinc_code": "2951-2"})
    potassium: str = Field(..., metadata={"official_name": "Potassium", "loinc_code": "2823-3"})
    chloride: str = Field(..., metadata={"official_name": "Chloride", "loinc_code": "2075-0"})
    bicarbonate: str = Field(..., metadata={"official_name": "Bicarbonate", "loinc_code": "1963-8"})
    calcium: str = Field(..., metadata={"official_name": "Calcium", "loinc_code": "17861-6"})
    magnesium: str = Field(..., metadata={"official_name": "Magnesium", "loinc_code": "19123-9"})


class LipidProfileReportTemplate(BaseModel):
    totalCholesterol: str = Field(..., metadata={"official_name": "Cholesterol Total", "loinc_code": "2093-3"})
    triglycerides: str = Field(..., metadata={"official_name": "Triglycerides", "loinc_code": "2571-8"})
    hdl: str = Field(..., metadata={"official_name": "HDL Cholesterol", "loinc_code": "2085-9"})
    ldl: str = Field(..., metadata={"official_name": "LDL Cholesterol", "loinc_code": "2089-1"})
    vldl: str = Field(..., metadata={"official_name": "VLDL Cholesterol", "loinc_code": "3043-7"})
    ldlToHdlRatio: str = Field(..., metadata={"official_name": "LDL/HDL Ratio", "loinc_code": "9830-1"})
    totalCholesterolToHdlRatio: str = Field(..., metadata={"official_name": "Cholesterol/HDL Ratio", "loinc_code": "9832-7"})
    tgToHdlRatio: str = Field(..., metadata={"official_name": "Triglyceride/HDL Ratio", "loinc_code": "50010-2"})
    nonHdlCholesterol: str = Field(..., metadata={"official_name": "Non-HDL Cholesterol", "loinc_code": "43396-1"})


class HbA1cReportTemplate(BaseModel):
    hba1c: str = Field(..., metadata={"official_name": "Hemoglobin A1c", "loinc_code": "4548-4"})
    estimatedAvgGlucose: str = Field(..., metadata={"official_name": "Estimated Average Glucose", "loinc_code": "1557-8"})


class ESRReportTemplate(BaseModel):
    esr: str = Field(..., metadata={"official_name": "Erythrocyte Sedimentation Rate", "loinc_code": "4537-8"})


class TFTReportTemplate(BaseModel):
    tsh: str = Field(..., metadata={"official_name": "Thyroid Stimulating Hormone", "loinc_code": "3016-3"})
    t3: str = Field(..., metadata={"official_name": "Triiodothyronine (T3)", "loinc_code": "3054-0"})
    t4: str = Field(..., metadata={"official_name": "Thyroxine (T4)", "loinc_code": "3026-2"})

"""
class BaseMetaTemplate(BaseModel):
  patientNIC: str
  date: str
  time: str
  practitioner: str
  clinic: str
  recorder: str
  instructions:str





class BaseReportTemplate(BaseModel):
    mata:BaseMetaTemplate
    results: Union[
        CBCReportTemplate,
        UFRTemplate,
        LFTReportTemplate,
        CRPReportTemplate,
        FBSReportTemplate,
        SerumCreatinineReportTemplate,
        SerumElectrolytesReportTemplate,
        LipidProfileReportTemplate,
        HbA1cReportTemplate,
        ESRReportTemplate,
        TFTReportTemplate]
    
class Indications(Enum):
    SYMPTOMS = "symptoms"
    SIGNS = "signs"

class MedicationUploadModel(BaseModel):
    display:str
    frequency:str
    mealTiming:str
    dosage: str
    route: str
    prescriber: str
    meta:dict

class SymptomsAndSigns(BaseModel):
    timeStamp:datetime
    indications:Indications
    doctorName:str
    medications:list[
        MedicationUploadModel
    ]
    note:str
class Diagnosis(BaseModel):
    timeStamp:datetime
    indications:str = "diagnosis"
    doctorName:str
    doctorID:str
    medications:list[
        MedicationUploadModel
    ]
    note:str



