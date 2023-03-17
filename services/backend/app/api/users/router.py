from fastapi import HTTPException, Depends, APIRouter, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.email.service import send_email_with_code
from app.auth.oauth2 import create_token, TokenType
from .schemas import UserPayloadSchema, UserUpdatePayloadSchema
from . import crud
from .utils import create_code

router = APIRouter()

@router.post("/send-code/", status_code=status.HTTP_202_ACCEPTED)
async def send_code(payload: UserPayloadSchema, db: Session = Depends(get_db)):
    user = await crud.read_user_by_email(payload.email, db)

    if not user:
        user = await crud.add_user(payload, db)

    code = create_code()
    update_payload = UserUpdatePayloadSchema(code=code)
    await crud.update_user_by_id(user.id, update_payload, db)

    await send_email_with_code(payload.email, code)
    return {"detail": "A code has been sent to this address."}


@router.post("/verify-code/", status_code=201,)
async def verify_code(email: str, code: str, db: Session = Depends(get_db)):
    user = await crud.read_user_by_email(email, db)
    if not user:
        raise HTTPException(status_code=400, detail="Email not found")

    if not user.code == code:
        raise HTTPException(status_code=400, detail="Invalid code")

    token_payload = {"id": user.id, "email": user.email}
    token = create_token(token_payload, TokenType.access)
    return {"access_token": token, "token_type": "bearer"}