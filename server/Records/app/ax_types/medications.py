
from typing import Optional,List
from app.ax_types.util import Json_type
import strawberry

@strawberry.type
class Prescriber:
    display: Optional[str] = None
    id:Optional[str] = None

@strawberry.type
class Medication:
    patientID: Optional[str] = None
    code: Optional[str] = None
    display: Optional[str] = None
    dosage: Optional[str] = None
    route: Optional[str] = None
    prescriber: Optional[str] = None
    meta: Optional[Json_type] = None  # type: ignore


@strawberry.type
class MedicationStack:
    medications:List[Medication] # type: ignore