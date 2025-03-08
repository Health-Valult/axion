from typing import Any
import strawberry
from  datetime import datetime
from typing import Optional,List
from app.ax_types.util import Json_type,nd_Json_type


@strawberry.type
class Encounter:
    patient:Optional[str] = None
    id:Optional[str] = None
    serviceProvider:Optional[str] = None
    type:Optional[str] = None
    typeCode:Optional[str] = None
    reason:Optional[str] = None
    reasonCode:Optional[str] = None
    participants:Optional[nd_Json_type] = None # type: ignore
    period:Optional[Json_type]= None # type: ignore
    meta:Optional[Json_type]= None # type: ignore


@strawberry.type
class EncounterStack:
    Procedures :List[Encounter] # type: ignore