from typing import Union
import uvicorn
from fastapi import FastAPI
from .models.user import User
from jose import jwt
app = FastAPI()


@app.post("/axion/auth/signup")
def signup(user:User):
    print(user.Telephone)

def main():
    print("running security services")
    uvicorn.run("app.main:app",port=8000,reload=True)

if __name__ == '__main__':
    main()