from authlib.jose import jwt
from authlib.jose.errors import InvalidTokenError,ExpiredTokenError

def validate_tokens(token:str):
    try:

        with open("./public.pem","r") as file:
            key = file.read()
        
        decoded_token = jwt.decode(token,key)
        decoded_token.validate()

        return {"token_state":True, "user":decoded_token["sub"]}

    except FileNotFoundError:
        print("File not found.")

    except PermissionError:
        print("Permission denied.")

    except UnicodeDecodeError:
        print("Encoding issue.")

    except InvalidTokenError:
        return {"token_state":False}
    
    except ExpiredTokenError:
        return {"token_state":False}
    
    except Exception as e:
        print(f"An error occurred: {e}")
    

