import json

import os

class Patient():
    allergyintolerance:dict

    def __init__(self):
        pass
    
    def load_data(dir_path:str):
        dir_items = os.listdir(dir_path)
        data = read_json()



def main():
    with open(r"D:\dev\Projects\axion\server\Test\synthetic\synthea\output\fhir\Observation.ndjson","r") as file:
        for lines in file:
            json_file = json.loads(lines)
            print(json_file)

if __name__ == "__main__":
    main()