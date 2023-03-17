from datetime import datetime
from typing import Optional
from pydantic import EmailStr

from app.api.schemas import OrmBaseModel

# ------ ENUMS --------------------------------------------------------------------------

# /----- ENUMS --------------------------------------------------------------------------


# ------ SCHEMAS ------------------------------------------------------------------------
class UserSchema(OrmBaseModel):
    email: EmailStr
    code: Optional[str]
    is_verified: Optional[bool]
    created_at: datetime


class UserPayloadSchema(OrmBaseModel):
    email: EmailStr


class UserUpdatePayloadSchema(OrmBaseModel):
    code: Optional[str]
    is_verified: Optional[bool]


class UserResponseSchema(UserSchema):
    id: int

# /----- SCHEMAS ------------------------------------------------------------------------