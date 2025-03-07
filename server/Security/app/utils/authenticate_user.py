from argon2 import PasswordHasher
from fastapi.responses import JSONResponse
from pymongo.collection import Collection
from app.models.user import Userlg
from app.utils.gen_tokens import generateTokens
from app.utils.redis import redis_AX
from typing import Literal
import uuid

hasher = PasswordHasher()

with open('./app/data/keys/private.pem', 'r') as file:
        private_key = file.read()

with open('./app/data/keys/refresh_private.pem', 'r') as file:
        refresh_private_key = file.read()

def authenticate(collection:Collection, cred:Userlg, endpoint:Literal["patient","doctor","hospital"], Red:redis_AX = None):
    emailExists = collection.find_one({"Email":cred.Email})
    if emailExists is None:
        return JSONResponse(status_code=404, content={"details":"user does not exist"})
    
    hashed_password = emailExists["Password"]
    password_is_valid = hasher.verify(password=cred.Password,hash=hashed_password)

    if not password_is_valid:
        return JSONResponse(status_code=401, content={"details":"password is invalid"})
    uuid_str = str(uuid.UUID(bytes = emailExists["UserID"]))
    session_token = generateTokens(type="session",endpoint=endpoint,payload=uuid_str,key=private_key,exp=60)
    refresh_token = generateTokens(type="session",endpoint=endpoint,payload=uuid_str,key=refresh_private_key,exp=10080)

    Red.set_token(token = refresh_token,key = uuid_str,ttl=10080,token_type="refresh")

    return JSONResponse(status_code=200, content={"session_token":session_token, "refresh_token":refresh_token})