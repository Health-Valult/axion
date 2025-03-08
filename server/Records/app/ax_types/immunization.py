from typing import Optional,List
from app.ax_types.util import Json_type
import strawberry


@strawberry.type
class Immunization:
    patient: Optional[str]
    vaccineCode: Optional[str]
    vaccineDisplay: Optional[str]
    status: Optional[str]
    dosage: Optional[str]
    unit: Optional[str]
    site: Optional[str]
    occurrenceDateTime: Optional[str]
    manufacturer:Optional[str]
    meta: Optional[Json_type]  # type: ignore


@strawberry.type
class ImmunizationStack:
    immunizations:List[Immunization] # type: ignore