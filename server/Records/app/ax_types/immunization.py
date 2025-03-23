from typing import Optional,List
from app.ax_types.util import Json_type
import strawberry


@strawberry.type
class Immunization:
    patientID: Optional[str] = None
    code: Optional[str] = None
    display: Optional[str] = None
    dosage: Optional[str] = None
    unit: Optional[str] = None
    site: Optional[str] = None
    timestamp: Optional[str] = None
    meta: Optional[Json_type] = None  # type: ignore


@strawberry.type
class ImmunizationStack:
    immunizations:List[Immunization] # type: ignore