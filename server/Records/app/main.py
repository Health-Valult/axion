import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from .models.models import Test
import boto3
from strawberry.fastapi import GraphQLRouter
import strawberry

@strawberry.type
class Query:
    @strawberry.field
    def observations(self, id:str,patientId) -> JSONResponse:
        


schema = strawberry.Schema(Query)

graphql_app = GraphQLRouter(schema)



app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")


app.post("/axion/data/records/test")
def records_test(data:Test):
    print(data)


def main():
    print("running security services")
    uvicorn.run("app.main:app",port=8000,reload=True)

if __name__ == '__main__':
    main()

#Yn8pnc*Jv"W=X@U - aws pw
#5r%-XBc7-eQXPxZ - aws educate pw
# nfS5iM3WTfb#$yS