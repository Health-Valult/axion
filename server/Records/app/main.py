import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from .models.models import Test
import boto3

app = FastAPI()

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