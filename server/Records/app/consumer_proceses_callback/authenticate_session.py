from authlib.jose import jwt


def authenticate_session(bearerToken:str):

    #if cacheSession is None:
    #    raise Exception("unable to authenticate")
    token = bearerToken.split()[1]
    try:    
        with open("app\data\keys\public.pem","r") as file:
            key = file.read()
        
        decoded_token = jwt.decode(token,key)
        decoded_token.validate()
        print("decode sucessful")
        return {"user":decoded_token["sub"]}

    except FileNotFoundError:
        print("File not found.")
