import logging
import os
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
import bson
from fastapi.responses import JSONResponse
from pymongo.collection import Collection
from app.models.models import Userlg
from app.utils.gen_tokens import generateTokens
from app.shared.utils.Cache.redis import redis_AX
from typing import Literal
import uuid
from geopy.distance import geodesic
from geopy.geocoders import Nominatim
from datetime import datetime,timezone
import math

import  googlemaps

logger = logging.getLogger("uvicorn")

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API")

if not GOOGLE_MAPS_API_KEY:
    logger.critical("Unable to load environment variable : GOOGLE_MAPS_API_KEY")

gmaps = googlemaps.Client(GOOGLE_MAPS_API_KEY)

hasher = PasswordHasher()

with open('./app/data/keys/private.pem', 'r') as file:
        private_key = file.read()

with open('./app/data/keys/refresh_private.pem', 'r') as file:
        refresh_private_key = file.read()

def authenticate(collection:Collection, cred:Userlg, endpoint:Literal["patient","doctor","hospital"], Red:redis_AX = None,state = None):
    user = collection.find_one({"Email":cred.Email},{"_id":0,"prevLogin":1,"Password":1,"UserID":1,"Email":1})
    if user is None:
        return JSONResponse(status_code=404, content={"details":"user does not exist"})
    
    hashed_password = user.get("Password")

    lat = cred.Location.Latitude
    lon = cred.Location.Longitude

    loginLocation:dict = user.get("prevLogin")

    loginTime = datetime.now(tz=timezone.utc)

    if bool(loginLocation):
        prevLat = loginLocation.get("Latitude")
        prevLon = loginLocation.get("Longitude")
        timeStamp = datetime.strptime(loginLocation.get("Time"),"%Y-%m-%dT%H:%M:%S.%f%z")
        


        newCoords = (lat,lon)
        oldCoords = (prevLat,prevLon)

        orthodromicDistance = geodesic(newCoords,oldCoords).km
        differance = loginTime - timeStamp

        speed_threshhold = 250

        time_hours = differance.total_seconds() / 3600

        speed = orthodromicDistance/time_hours

        if speed > speed_threshhold:

            location = gmaps.reverse_geocode(newCoords, enable_address_descriptor=True)

            email = user.get("Email")
            body = {
            "email":email,
            "subject":"New login attempt",
            "body":f"new login at {location}"
            }

            #response = state.sender_task.send_and_await("notification","send-email",body=body)

    locationDataPacket = {
        "Latitude":lat,
        "Longitude":lon,
        "Time":loginTime.isoformat()
    }

    collection.update_one(
        { "Email": cred.Email}, 
        { "$set": { "prevLogin": locationDataPacket} }
    )

    try:
        password_is_valid = hasher.verify(password=cred.Password,hash=hashed_password)

    except VerificationError:
        return JSONResponse(status_code=401, content={"details":"password is invalid"})
    
    if not password_is_valid:
        return JSONResponse(status_code=401, content={"details":"password is invalid"})
    uuid_str = user.get("UserID")
    session_token = generateTokens(type="session",endpoint=endpoint,payload=uuid_str,key=private_key,exp=60)
    refresh_token = generateTokens(type="session",endpoint=endpoint,payload=uuid_str,key=refresh_private_key,exp=10080)

    Red.set_token(token = refresh_token,key = uuid_str,ttl=10080,token_type="refresh")

    return JSONResponse(status_code=200, content={"session_token":session_token, "refresh_token":refresh_token})