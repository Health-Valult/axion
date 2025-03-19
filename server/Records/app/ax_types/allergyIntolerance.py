from enum import Enum
from typing import Optional
import strawberry
from typing import Optional,List

from app.ax_types.util import Json_type


@strawberry.enum
class Criticality(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


@strawberry.enum
class Severity(Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"



@strawberry.enum
class Source(Enum):
    PATIENTREPORTED = "patient-reported"
    DOCTORRECORDED = "physician-recorded"


@strawberry.enum
class Status(Enum):
    CONFIRMED = "confirmed"
    SUSPECTED = "suspected"



@strawberry.type
class AllergyIntolerance:
    patientID:Optional[str] = None
    code:Optional[str] = None
    display:Optional[str] = None
    timestamp:Optional[str] = None
    criticality:Optional[Criticality] = None
    severity:Optional[Severity] = None
    category:Optional[str]=None
    active:Optional[bool] = None
    source:Optional[Source] = None
    verificationStatus:Optional[Status] = None
    meta:Optional[Json_type]= None


@strawberry.type
class AllergyIntoleranceStack:
    allergyIntolerances :List[AllergyIntolerance] # type: ignore