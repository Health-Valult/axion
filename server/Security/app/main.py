from typing import Union
import uvicorn
from fastapi import FastAPI
from .models.user import User

app = FastAPI()


@app.post("/axion/auth/login")
def login(user:User):
    print(user)
    return


def main():
    print("running security services")
    uvicorn.run("app.main:app",port=8000,reload=True)

if __name__ == '__main__':
    main()