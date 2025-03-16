from pydantic import BaseModel


class Notification(BaseModel):
    user_id: str | None = None # If None, it's a global notification
    message: str
    type: str  # e.g., "alert", "reminder"
    is_global: bool = False
    phone_number: str | None = None
    email: str | None = None