def individual_serial(log) -> dict:
    return {
        "id": str(log["_id"]),
        "Requester": log["Requester"],
        "token": log["token"],
        "body": log["body"],
        "timeStamp": log["timeStamp"]
    }

def multiple_serial(logs) -> list:
    return [individual_serial(log) for log in logs]