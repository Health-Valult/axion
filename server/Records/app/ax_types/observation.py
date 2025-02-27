from typing import Any
import strawberry
from  datetime import datetime
from typing import Optional,List

Json_type = strawberry.scalar(
    dict,
    name="Json",
    description="json data types"
)

nd_Json_type = strawberry.scalar(
    list[dict],
    name="nd_Json",
    description="json data types"
)

@strawberry.type
class Observation:
    encounter:Optional[str] = None
    patient:Optional[str] = None
    code:Optional[str] = None
    display:Optional[str] = None
    unit:Optional[str] = None
    value:Optional[str] = None
    timestamp:Optional[str] = None
    meta:Optional[Json_type]= None

    def read_from_json():
        pass
    def write_to_json():
        pass
    
@strawberry.type
class ObservationStack:
    Observations :List[Observation] # type: ignore


