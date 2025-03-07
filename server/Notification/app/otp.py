import pyotp

OTP_EXPIRY_SECONDS = 30 

def generate_otp():
    totp = pyotp.TOTP(pyotp.random_base32(), interval=OTP_EXPIRY_SECONDS)
    return totp.now(), totp.secret
