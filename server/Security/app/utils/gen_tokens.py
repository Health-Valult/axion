import datetime
import uuid
from authlib.jose import jwt
from typing import Literal

def generateTokens(type:Literal["refresh","session"],endpoint:Literal["patient","doctor","hospital"],payload:bytes,key,exp:int):
    print(payload)
    header = {'alg': 'RS256'}
    session_payload = {
        'iss': f'axion::security::auth::login::{endpoint}::{type}',
        'sub': payload,
        "iat": datetime.datetime.now(tz=datetime.timezone.utc),
        "nbf": datetime.datetime.now(tz=datetime.timezone.utc),
        "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=exp),
        "role":endpoint
        }
    return jwt.encode(header, session_payload, key).decode("utf-8")