import strawberry


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