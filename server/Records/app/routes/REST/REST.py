import datetime
import hmac
import json
import logging
import random
from typing import Annotated, Union
from fastapi.responses import JSONResponse
import pymongo
from starlette.requests import Request
from app.models.upload_models import *
from fastapi import APIRouter,Depends, WebSocketDisconnect, WebSocketException
from fastapi.encoders import jsonable_encoder
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate, Authenticate_WS
from fastapi.websockets import WebSocket
from app.shared.utils.Cache.redis import Body, redis_AX
from app.models.models import *
import requests
from collections import defaultdict

def generate_otp(length=6):
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
route = APIRouter()
connected_clients:dict = {}

logger = logging.getLogger("uvicorn")

DBClient = pymongo.MongoClient(URL)
Terminology_DB = DBClient.get_database("terminology_db")
LIONC_collection = Terminology_DB.get_collection("LIONC")

@route.get(path="/records/get-patient-details",dependencies=[Depends(Authenticate)])
async def get_patient_details(request:Request,credentials:SelectPatient):
    c_uuid = request.state.meta.get("uuid")
    NIC = credentials.NIC
    PatientsCollection:Collection = request.app.state.PatientsCollection

    response = PatientsCollection.find({"NIC":NIC},{"_id":1,"NIC":1,"FirstName":1,"LastName":1,"Telephone":1,"Email":1})
    if not response:
        return JSONResponse(status_code=401,content={"details":"patient not found"})
    
    return JSONResponse(status_code=200,content=response)

@route.get(path="/records/doctor/recent-patients",dependencies=[Depends(Authenticate)])
async def get_recent_patients(request:Request):
    c_uuid = request.state.meta.get("uuid")
    DoctorsCollection:Collection = request.app.state.DoctorsCollection
    PatientsCollection:Collection = request.app.state.PatientsCollection

    patients = DoctorsCollection.find_one({"UserID":c_uuid},{"patients":1})
    data = [list(d.values())[0] for d in list(patients)]
    response = PatientsCollection.find({"UserID":{"$or":data[:6]}},{"_id":1,"NIC":1,"FirstName":1,"LastName":1})

    return JSONResponse(status_code=200,content=response)

@route.get(path="/records/prescription/symptoms-signs",dependencies=[Depends(Authenticate)])
async def get_prescriptions(request:Request):
    c_uuid = request.state.meta.get("uuid")
    PrescriptionsCollection:Collection = request.app.state.PrescriptionsCollection
    prescriptions = PrescriptionsCollection.find({"doctorID":c_uuid,"indications":{"$in": ["symptoms", "diagnosis"]}},{"_id":0})
    
    prescriptions_ls = list(prescriptions)

    return JSONResponse(status_code=200,content=jsonable_encoder(prescriptions_ls))


@route.get(path="/records/prescription/diagnosis",dependencies=[Depends(Authenticate)])
async def get_prescriptions(request:Request):
    c_uuid = request.state.meta.get("uuid")
    PrescriptionsCollection:Collection = request.app.state.PrescriptionsCollection
    prescriptions = PrescriptionsCollection.find({"doctorID":c_uuid,"indications":"diagnosis"},{"_id":0})
    
    group = defaultdict(list)

    for i in prescriptions:
        key = i["diagnosedCondition"]
        group[key].append(i)
    
    grouped_dict = dict(group)

    return JSONResponse(status_code=200,content=jsonable_encoder(grouped_dict))

@route.get(path="/records/notes",dependencies=[Depends(Authenticate)])
async def get_prescriptions(request:Request):
    c_uuid = request.state.meta.get("uuid")
    NotesCollection:Collection = request.app.state.NotesCollection

    notes = NotesCollection.find({"doctorID":c_uuid},{"_id":0})

    note_ls = list(notes)

    return JSONResponse(status_code=200,content=note_ls)


@route.post(path="/records/notes",dependencies=[Depends(Authenticate)])
async def get_prescriptions(request:Request,note:str):
    c_uuid = request.state.meta.get("uuid")
    NotesCollection:Collection = request.app.state.NotesCollection
    note_ = Notes(
        doctorID=c_uuid,
        note=note
    )
    
    NotesCollection.insert_one(note_.model_dump())
    
    return JSONResponse(status_code=200,content={"details":"note saved sucessfully"})



@route.post(path="/records/upload/{type}")
async def upload_report(request:Request,type:str,report:BaseReportTemplate):

    collection:Collection = request.app.state.PatientsCollection
    LabsCollection:Collection = request.app.state.LabsCollection
    ObservationCollection:Collection = request.app.state.ObservationCollection

    NIC = report.mata.patientNIC

    credentials = collection.find_one({"NIC":NIC},{"_id":0,"UserID":1})

    patientID = "2cd9916f-67e2-5ea1-9971-7a488239c83f" #credentials.get("UserID")
    
    clinic = report.mata.clinic
    practitioner = report.mata.practitioner
    recorder = report.mata.recorder
    instructions = report.mata.instructions
    datetime_str = f"{report.mata.date} {report.mata.time}"
    timestamp = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M")
    reportFiealds = report.results

    labs = LabTestModel(
        patientID=patientID,
        display=type,
        timestamp=timestamp,
        meta={
                "clinc":clinic,
                "practitioner":practitioner,
                "recorder":recorder,
                "instructions":instructions
            }
    )
    labsID = labs.id
    LabsCollection.insert_one(labs.model_dump())

    for name, meta in reportFiealds.model_fields.items():
        value = getattr(reportFiealds,name)
        observation = ObservationModel(
            patientID=patientID,
            labID=labsID,
            value=value,
            code=meta.json_schema_extra.get("metadata").get("loinc_code"),
            display=meta.json_schema_extra.get("metadata").get("official_name"),
            unit=meta.json_schema_extra.get("metadata").get("unit"),
            timestamp=timestamp,
            meta={
                "clinc":clinic,
                "practitioner":practitioner,
                "recorder":recorder,
                "instructions":instructions
            }
        )
        
        ObservationCollection.insert_one(observation.model_dump())

    return JSONResponse(status_code=200,content={"Details":"report upload sucessful"})




@route.post(path="/records/select-patient",dependencies=[Depends(Authenticate)])
async def verify_doctor(request:Request,pateint:SelectPatient):

    collection:Collection = request.app.state.PatientsCollection
    cache:redis_AX = request.app.state.Cache

    c_uuid = request.state.meta.get("uuid")

    NIC = pateint.NIC
    credentials = collection.find_one({"NIC":NIC},{"_id":0,"Email":1,"UserID":1})

    logger.info(credentials)

    if not credentials:
        return JSONResponse(status_code=401,content={"Details":"patient does not exist"})

    EMAIL = credentials.get("Email")
    UUID = credentials.get("UserID")

    name = f"otp::verify:records::request::{UUID}"
    otp = generate_otp()
    payload = {
        "uuid":c_uuid,
        "type":"email",
        "NIC":NIC,
        "otp":otp
    }
    cache.set_item(name=name,payload=payload)
    body = Body(
        task="send-email",
        body={
        "email":EMAIL,
        "subject":"Axion Verification OTP",
        "body":f"your otp is {otp}"
    })
    
    cache.scarletSender("notification",body=body)
    return JSONResponse(status_code=200,content={"Details":"pending verification status"})






@route.post(path="/records/verify-request",dependencies=[Depends(Authenticate)])
async def verify_doctor_request(request:Request,cred:OTP):

    cache:redis_AX = request.app.state.Cache
    c_otp = cred.otp
    c_uuid = request.state.meta.get("uuid")
    collection:Collection = request.app.state.DoctorsCollection
   
    name = f"otp::verify:records::request::{c_uuid}"
    otp_payload = cache.get_item(name=name)
    logger.warning(otp_payload)
    if not otp_payload:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})
    try:
        otp = otp_payload.get(b"otp").decode()
        requester = otp_payload.get(b"uuid").decode()
    except Exception as e:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})
    
    if otp is None:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})
    
    if not hmac.compare_digest(otp,c_otp):
        return JSONResponse(status_code=200,content={"msg":"otp invalid"})
    
    # TODO future extensive record viewing


    new_patients = {
        "UserID":c_uuid
    }

    collection.update_one(
        {"UserID":requester},
          {"$addToSet": {"patients": {"$each": [new_patients]}}}
    )


    payload = {"patient":c_uuid}
    name = f"verified::doc::{requester}"

    cache.set_item(name=name,payload=payload,ttl=60)

    return JSONResponse(status_code=200,content={"msg":"otp verified"})


@route.post(path="/records/add-prescription",dependencies=[Depends(Authenticate)])
async def add_prescriptions(request:Request,prescriptionData:SymptomsSignsDiagnosis):
    c_uuid = request.state.meta.get("uuid")

    PrescriptionsCollection:Collection = request.app.state.PrescriptionsCollection
    Medicationscollection:Collection = request.app.state.MedicationsCollection

    cache:redis_AX = request.app.state.Cache
    try:
        patient ="2cd9916f-67e2-5ea1-9971-7a488239c83f" #get_patient(uuid=Doctor,CACHE=cache)
        
    except Exception as e:
        return JSONResponse(status_code=403,content={"Details":"patient not available"})
    prescription = Precription(
        doctorID=c_uuid,
        patientID=patient,
        indications=prescriptionData.indications,
        diagnosedConditions=getattr(prescriptionData, "diagnosedCondition", None),
        timeStamp=prescriptionData.timeStamp,
        notes=prescriptionData.note
    )
    precriptionID = prescription.id
    document = prescription.model_dump()
    PrescriptionsCollection.insert_one(document=document)

    for meds in prescriptionData.medications:
        data = requests.get(
        "https://rxnav.nlm.nih.gov/REST/approximateTerm.json",
        params={"term": f"{meds.display}", "maxEntries": 1}
        )
        data = data.json()
        candidates = data['approximateGroup']['candidate']
        code = candidates[0].get("rxcui")
        medication = Medication(
            prescriptionID=precriptionID,
            patientID=patient,
            prescriber=c_uuid,
            code=code,
            display=meds.display,
            frequency=meds.frequency,
            mealTiming=meds.mealTiming,
            dosage=meds.dosage,
            route=meds.route,
            meta=meds.meta
        )
        document = medication.model_dump()
        Medicationscollection.insert_one(document=document)
        logger.warning(medication)

    logger.warning(prescription)
    return JSONResponse(status_code=200,content={"Details":"prescription added"})



@route.websocket("/records/search",)
async def websocket_endpoint(websocket: WebSocket):
    
    await websocket.accept()
    token = websocket.query_params.get("token")
    
    if token is None:
        raise WebSocketException(code=1008, reason="session token not sent")
    c_uuid,role = await Authenticate_WS(webSocket=websocket,token=token)

    pt:Collection = websocket.app.state.PatientsCollection


    print(f"WebSocket Client Connected: {websocket.client}")

    try:
        while True:
            text = await websocket.receive_json()  
            logger.warning(text)
            prefix = text.get("packet")
            logger.warning(prefix)
            auto = pt.find({ "NIC": { "$regex": f"^{prefix}", "$options": 'i' } },{"_id":0,"NIC":1,"FirstName":1})
            auto_list = list(auto)
            logger.warning(auto_list)
            response = {
                "packet":auto_list
            }
            
            await websocket.send_json(response)

    except WebSocketDisconnect:
        print(f"WebSocket Disconnected: {websocket.client}")


