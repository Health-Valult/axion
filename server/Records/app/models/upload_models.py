from typing import Annotated, Literal, Union
from pydantic import BaseModel, Field
from datetime import datetime
from app.models.models import*


class CBCReportTemplate(BaseModel) :

    hemoglobin: str
    totalLeukocyteCount: str
    neutrophils: str
    lymphocytes: str
    eosinophils: str
    monocytes: str
    basophils: str
    plateletCount: str
    totalRBCCount: str
    hematocrit: str
    meanCorpuscularVolume: str
    meanCellHemoglobin: str
    meanCellHemoglobinConcentration: str


class UFRTemplate(BaseModel) :

    quantity: str
    color: str
    transparency: str
    specificGravity: str
    pH: str
    protein: str
    sugar: str
    ketones: str
    bilirubin: str
    rbc: str
    pusCells: str
    epithelialCells: str
    casts: str
    crystals: str
    bacteria: str


class CRPReportTemplate(BaseModel) :

    crpLevel: str


class LFTReportTemplate(BaseModel) :

    serumBilirubinTotal: str
    serumBilirubinDirect: str
    serumBilirubinIndirect: str
    sGPTALT: str
    sGOTAST: str
    serumAlkalinePhosphatase: str
    serumProtein: str
    serumAlbumin: str
    globulin: str
    agRatio: str


class FBSReportTemplate(BaseModel) :

    fastingBloodSugar: str


class SerumCreatinineReportTemplate(BaseModel) :

    serumCreatinine: str


class SerumElectrolytesReportTemplate(BaseModel) :

    sodium: str
    potassium: str
    chloride: str
    bicarbonate: str
    calcium: str
    magnesium: str


class LipidProfileReportTemplate(BaseModel) :

    totalCholesterol: str
    triglycerides: str
    hdl: str
    ldl: str
    vldl: str
    ldlToHdlRatio: str
    totalCholesterolToHdlRatio: str
    tgToHdlRatio: str
    nonHdlCholesterol: str


class HbA1cReportTemplate(BaseModel) :

    hba1c: str
    estimatedAvgGlucose: str


class ESRReportTemplate(BaseModel) :

    esr: str


class TFTReportTemplate(BaseModel) :

    tsh: str
    t3: str
    t4: str

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



