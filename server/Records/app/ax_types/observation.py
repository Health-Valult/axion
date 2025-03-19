from typing import Any
import strawberry
from  datetime import datetime
from typing import Optional,List
from app.ax_types.util import Json_type


@strawberry.type
class Observation:
    id:Optional[str] = None
    patientID:Optional[str] = None
    labID:Optional[str] = None
    code:Optional[str] = None
    display:Optional[str] = None
    unit:Optional[str] = None
    value:Optional[str] = None
    timestamp:Optional[str] = None
    meta:Optional[Json_type]= None # type: ignore


@strawberry.type
class ObservationStack:
    Observations :List[Observation] # type: ignore


