
from typing import Optional,List
from app.ax_types.util import Json_type
import strawberry


@strawberry.type
class Lab:
    id:Optional[str]
    patientID:Optional[str]
    display:Optional[str]
    timestamp:Optional[str]
    meta:Optional[Json_type] # type: ignore

@strawberry.type
class LabStack:
    labs:List[Lab] # type: ignore