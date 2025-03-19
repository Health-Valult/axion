from pydantic import BaseModel

class CBCReportTemplate(BaseModel) :
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
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
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
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
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
    crpLevel: str


class LFTReportTemplate(BaseModel) :
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
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
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
    fastingBloodSugar: str


class SerumCreatinineReportTemplate(BaseModel) :
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
    serumCreatinine: str


class SerumElectrolytesReportTemplate(BaseModel) :
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
    sodium: str
    potassium: str
    chloride: str
    bicarbonate: str
    calcium: str
    magnesium: str


class LipidProfileReportTemplate(BaseModel) :
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
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
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
    hba1c: str
    estimatedAvgGlucose: str


class ESRReportTemplate(BaseModel) :
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
    esr: str


class TFTReportTemplate(BaseModel) :
    patientName: str
    referredBy: str
    age: str
    gender:str
    date: str
    investigations: str
    tsh: str
    t3: str
    t4: str



