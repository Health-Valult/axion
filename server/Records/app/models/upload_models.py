from typing import Annotated, Literal, Union
from pydantic import BaseModel, Field
import datetime



class CBCReportTemplate(BaseModel) :
    reportType: Literal["CBC"]
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
    reportType: Literal["UFR"]
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
    reportType: Literal["CRP"]
    crpLevel: str


class LFTReportTemplate(BaseModel) :
    reportType: Literal["LFT"]
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
    reportType: Literal["FBS"]
    fastingBloodSugar: str


class SerumCreatinineReportTemplate(BaseModel) :
    reportType: Literal["SerumCreatinine"]
    serumCreatinine: str


class SerumElectrolytesReportTemplate(BaseModel) :
    reportType: Literal["SerumElectrolytes"]
    sodium: str
    potassium: str
    chloride: str
    bicarbonate: str
    calcium: str
    magnesium: str


class LipidProfileReportTemplate(BaseModel) :
    reportType: Literal["LipidProfile"]
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
    reportType: Literal["HbA1c"]
    hba1c: str
    estimatedAvgGlucose: str


class ESRReportTemplate(BaseModel) :
    reportType: Literal["ESR"]
    esr: str


class TFTReportTemplate(BaseModel) :
    reportType: Literal["TFT"]
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

ReportTemplate = Annotated[
    Union[
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
        TFTReportTemplate],
        Field(discriminator="reportType")
] # type: ignore

class BaseReportTemplate(BaseModel):
    mata:BaseMetaTemplate
    results: ReportTemplate



class SymptomsAndSigns(BaseModel):
    timeStamp:datetime.datetime
    indications:Literal["symptoms","signs"]
    #medications:list[]




"""{
  "prescribedDate": "2025-03-22T09:45:00.000Z",
  "indications": ["diagnosis"],
  "diagnosedCondition": "Type 2 Diabetes Mellitus",
  "medicines": [
    {
      "display": "Metformin",
      "code": "med005",
      "frequency": "BID",
      "mealTiming": "PC",
      "meta": {
        "start": "2025-03-22",
        "end": None
      }
    },
    {
      "name": "Glimepiride",
      "code": "med006",
      "frequency": "OD",
      "mealTiming": "AC",
      "treatmentDuration": {
        "start": "2025-03-22",
        "end": None
      }
    }
  ],
  "doctorName": "Dr. Steven James"
}


{
  "prescribedDate": "2025-03-22T10:00:00.000Z",
  "indications": ["symptoms", "signs"],
  "medicines": [
    {
      "name": "Paracetamol",
      "key": "med001",
      "frequency": "QID",
      "mealTiming": "PC",
      "treatmentDuration": {
        "start": "2025-03-22",
        "end": "2025-03-29"
      }
    },
    {
      "name": "Ibuprofen",
      "key": "med002",
      "frequency": "TID",
      "mealTiming": "CC",
      "treatmentDuration": {
        "start": "2025-03-22",
        "end": "2025-03-25"
      }
    }
  ],
  "doctorName": "Dr. Steven James"
}"""