
from typing import Optional,List
from app.ax_types.util import Json_type
import strawberry

@strawberry.type
class Prescriber:
    display: Optional[str]
    id:Optional[str]

@strawberry.type
class Medication:
    patientID: Optional[str]
    code: Optional[str]
    display: Optional[str]
    dosage: Optional[str]
    route: Optional[str]
    prescriber: Optional[str]
    meta: Optional[Json_type]  # type: ignore


@strawberry.type
class MedicationStack:
    medications:List[Medication] # type: ignore