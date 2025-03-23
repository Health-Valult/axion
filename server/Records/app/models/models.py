from enum import Enum
from typing import List
from pydantic import BaseModel,Field
from datetime import datetime
import uuid

class Test(BaseModel):
    data_packet:str

class SelectPatient(BaseModel):
    NIC:str

class OTP(BaseModel):
    otp:str
# Medical Data types

# ENUMS AND SUB MODELS

class Criticality(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    
class Severity(Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"

class Source(Enum):
    PATIENTREPORTED = "patient-reported"
    DOCTORRECORDED = "physician-recorded"

class Status(Enum):
    CONFIRMED = "confirmed"
    SUSPECTED = "suspected"

class PARTICIPANT(BaseModel):
    Display:str
    id:str

# OBSERVATION
class ObservationModel(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("observation",frozen=True) 
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    labID:str
    coding_system:str = "LOINC"
    code:str
    display:str
    unit:str
    value:str
    timestamp:datetime
    meta:dict

# LABTEST
class LabTestModel(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("lab-test",frozen=True)
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    coding_system:str = "LOINC"
    code:str
    display:str
    timestamp:datetime
    meta:dict

# ALLERGYINTOLERANCE
class AllergyIntoleranceModel(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("allergy-intolerance",frozen=True)
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    coding_system:str = "SNOMED-CT"
    code:str
    type:str
    category:str
    criticality:Criticality
    display:str
    severity:Severity
    active:bool
    source:Source
    verificationStatus:Status
    meta:dict

# IMMUNIZATION
class Immunization(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("immunization",frozen=True)
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    coding_system:str = "SNOMED-CT"
    code:str
    display:str
    dosage:str
    unit:str
    site:str
    timestamp:datetime
    meta:dict

# MEDICATION
class Medication(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("medication",frozen=True)
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    prescriptionID:str
    patientID:str
    coding_system:str = "RxNorm"
    code:str
    display:str
    frequency:str
    mealTiming:str
    dosage: str
    route: str
    prescriber: str
    meta:dict

# ENCOUNTER
class Encounter(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("encounter",frozen=True)
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    serviceProvider:str
    participants:List[PARTICIPANT]
    timestamp:datetime


# PROCEDURE
class Procedure(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("encounter",frozen=True)
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    coding_system:str = "SNOMED-CT"
    code:str
    display:str
    timestamp:datetime

class Diagnosis(BaseModel):
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    doctorID:str
    name:str
    timestamp:str
    content:str
    treatments:List[str]

class Precription(BaseModel):
    format:str = Field("AxionDataX-1.0",frozen=True) # type: ignore
    resourceType:str = Field("precription",frozen=True)
    id:str = Field(default_factory=lambda:str(uuid.uuid4()))
    patientID:str
    doctorID:str
    timeStamp:datetime
    indications:str

