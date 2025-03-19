from typing import Optional,List
from app.ax_types.util import Json_type
import strawberry


@strawberry.type
class Immunization:
    patientID: Optional[str]
    code: Optional[str]
    display: Optional[str]
    status: Optional[str]
    dosage: Optional[str]
    unit: Optional[str]
    site: Optional[str]
    timestamp: Optional[str]
    manufacturer:Optional[str]
    meta: Optional[Json_type]  # type: ignore


@strawberry.type
class ImmunizationStack:
    immunizations:List[Immunization] # type: ignore