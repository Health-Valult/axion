from typing import Any
import strawberry
from  datetime import datetime
from typing import Optional,List
from app.ax_types.util import Json_type


@strawberry.type
class Procedure:
    encounterID:Optional[str] = None
    patientID:Optional[str] = None
    id:Optional[str] = None
    code:Optional[str] = None
    display:Optional[str] = None
    date:Optional[str] = None
    meta:Optional[Json_type]= None # type: ignore


@strawberry.type
class ProcedureStack:
    Procedures :List[Procedure] # type: ignore
