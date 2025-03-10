import uuid
from fastapi.responses import JSONResponse
from starlette.requests import Request
from app.consumer_proceses_callback import authenticate_session
from app.utils.reset_pw import _password_reset
from app.utils.delete_profile import _delete_profile
from app.utils.get_profile import _get_profile
from app.models.user import*
from fastapi import APIRouter,FastAPI
from pymongo.collection import Collection




route = APIRouter()

@route.post("/axion/user/reset-password")
def reset_password(request:Request,cred:Password):

    state:FastAPI = request.app

    p_collection:Collection = state.state.PatientsCollection
    d_collection:Collection = state.state.DoctorsCollection
    h_collection:Collection = state.state.HospitalCollection

    cache = state.state.Cache

    new_pw = cred.New
    old_pw = cred.Old
    print(new_pw)
    print(old_pw)
    token = token = request.headers.get('authorization')
    session = authenticate_session(token,Red=cache)
    c_uuid,role = session.get("uuid"),session.get("role")
    if new_pw == old_pw:
        return JSONResponse(status_code=406,content={"msg":"Old password cannot be the same as new password"})

    if role == "patient":
        return _password_reset(collection=p_collection,c_uuid=uuid.UUID(c_uuid),old_pw=old_pw,new_pw=new_pw)
    
    if role == "doctor":
        return _password_reset(collection=d_collection,c_uuid=uuid.UUID(c_uuid),old_pw=old_pw,new_pw=new_pw,)

    if role == "hospital":
        return _password_reset(collection=h_collection,c_uuid=uuid.UUID(c_uuid),old_pw=old_pw,new_pw=new_pw)
    



@route.get("/axion/user/profile")
def get_profile(request:Request):

    state:FastAPI = request.app

    p_collection:Collection = state.state.PatientsCollection
    d_collection:Collection = state.state.DoctorsCollection
    h_collection:Collection = state.state.HospitalCollection

    cache = state.state.Cache

    token = token = request.headers.get('authorization')
    session = authenticate_session(token,Red=cache)
    c_uuid,role = session.get("uuid"),session.get("role")

    if role == "patient":
        return _get_profile(collection=p_collection,c_uuid=uuid.UUID(c_uuid),)
    
    if role == "doctor":
        return _get_profile(collection=d_collection,c_uuid=uuid.UUID(c_uuid),)

    if role == "hospital":
        return _get_profile(collection=h_collection,c_uuid=uuid.UUID(c_uuid),)
    

@route.post("/axion/user/profile/delete")
def delete_profile(request:Request,cred:Delete):

    state:FastAPI = request.app

    p_collection:Collection = state.state.PatientsCollection
    d_collection:Collection = state.state.DoctorsCollection
    h_collection:Collection = state.state.HospitalCollection

    cache = state.state.Cache

    password = cred.Password
    nic = cred.NIC

    token = token = request.headers.get('authorization')
    session = authenticate_session(token,Red=cache)
    c_uuid,role = session.get("uuid"),session.get("role")

    if role == "patient":
        return _delete_profile(collection=p_collection,c_uuid=uuid.UUID(c_uuid),nic=nic,pw=password)
    
    if role == "doctor":
        return _delete_profile(collection=d_collection,c_uuid=uuid.UUID(c_uuid),nic=nic,pw=password)

    if role == "hospital":
        return _delete_profile(collection=h_collection,c_uuid=uuid.UUID(c_uuid),nic=nic,pw=password)
