from typing import Literal
from authlib.jose import jwt,JsonWebToken
from app.utils.redis import redis_AX
from authlib.jose.errors import ExpiredTokenError
import os

def authenticate_session(bearerToken:str,Red:redis_AX=None,refresh_token:bool=False):

    try:    

        key = os.path.join("app","data","keys","refresh_public.pem") if refresh_token else os.path.join("app","data","keys","public.pem")
        print(key)
        with open(key,"r") as file:
            key = file.read()

        if not refresh_token:    
            bearerToken = bearerToken.split()[1]
        print(bearerToken)
        decoded_token = jwt.decode(bearerToken,key)
        decoded_token.validate()

        uuid = decoded_token.get("sub")
        role = decoded_token.get("role")
        if refresh_token and Red is not None:
            print(uuid)
            if not Red.validate_token(uuid,"refresh"):
                return {
                    "status":"err",
                    "description":"refresh token is invalid"
                }
            
        return {
            "uuid":uuid,
            "role":role
            }

    except FileNotFoundError:
        print("File not found.")
