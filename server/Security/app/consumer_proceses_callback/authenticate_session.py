from typing import Literal
from authlib.jose import jwt
from app.utils.redis import redis_AX
from authlib.jose.errors import ExpiredTokenError
import os

def authenticate_session(bearerToken:str,Red:redis_AX=None,refresh_token:bool=False):

    try:    

        key = os.path.join("app","data","keys","refresh_public.pem") if refresh_token else os.path.join("app","data","keys","public.pem")

        with open(key,"r") as file:
            key = file.read()

        if not refresh_token:    
            bearerToken = bearerToken.split()[1]

        decoded_token = jwt.decode(bearerToken,key)
        decoded_token.validate()

        user = decoded_token["sub"]

        if refresh_token and Red is not None:
            if not Red.validate_token(user):
                raise ExpiredTokenError
            
        return {"user":user}

    except FileNotFoundError:
        print("File not found.")
