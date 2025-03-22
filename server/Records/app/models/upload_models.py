from typing import Annotated, Literal, Union
from pydantic import BaseModel, Field




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
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str

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


