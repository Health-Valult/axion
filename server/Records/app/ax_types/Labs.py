
from typing import Optional,List
from app.ax_types.util import Json_type
import strawberry


@strawberry.type
class Lab:
    id:Optional[str] = None
    patientID:Optional[str] = None
    display:Optional[str] = None
    code:Optional[str]  = None
    timestamp:Optional[str] = None
    meta:Optional[Json_type] = None # type: ignore

@strawberry.type
class LabStack:
    labs:List[Lab] # type: ignore