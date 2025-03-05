import datetime
import uuid
from authlib.jose import jwt
from typing import Literal

def generateTokens(type:Literal["refresh","session"],endpoint:Literal["patient","doctor","hospital"],payload:bytes,key,exp:int):
    header = {'alg': 'RS256'}
    session_payload = {
        'iss': f'axion::security::auth::login::patient::{type}',
        'sub': str(uuid.UUID(bytes=payload)),
        "iat": datetime.datetime.now(tz=datetime.timezone.utc),
        "nbf": datetime.datetime.now(tz=datetime.timezone.utc),
        "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=exp)
        }
    return jwt.encode(header, session_payload, key)