from typing import List, Union

from sqlalchemy.orm import Session

from app.auth.utils import Hash

from .models import User
from .schemas import UserPayloadSchema, UserUpdatePayloadSchema


# ------ CREATE --------------------------------------------------------------------------
async def add_user(payload: UserPayloadSchema, db: Session) -> User:

    user = User(**payload.dict())

    db.add(user), db.commit(), db.refresh(user)
    return user


# /----- CREATE --------------------------------------------------------------------------

# ------ READ ----------------------------------------------------------------------------
async def read_user_by_email(email: str, db: Session) -> User:
    user = db.query(User).filter(User.email == email).first()
    if user:
        return user
    return None


# /----- READ ----------------------------------------------------------------------------

# ------ UPDATE --------------------------------------------------------------------------
async def update_user_by_id(
    user_id: int, payload: UserUpdatePayloadSchema, db: Session
) -> Union[dict, None]:

    user = db.query(User).filter(User.id == user_id).first()

    updated_user = payload.dict(exclude_unset=True)
    for key, value in updated_user.items():
        setattr(user, key, value)

    db.add(user), db.commit(), db.refresh(user)
    return user