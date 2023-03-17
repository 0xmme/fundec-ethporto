from typing import List
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from jose import jwt
from pydantic import EmailStr

from .template import create_html_email_verification


conf = ConnectionConfig(
    MAIL_USERNAME="fundeco.ethporto@gmail.com",
    MAIL_PASSWORD="fundecoeth",
    MAIL_FROM="fundeco.ethporto@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)


async def send_email_with_code(email: EmailStr, code: str) -> bool:
    subject = "FundECO Account Verification"
    body = create_html_email_verification(code)

    message = MessageSchema(
        subject=subject,
        recipients=[email],
        body=body,
        subtype=MessageType.html,
    )

    try:
        fm = FastMail(conf)
        await fm.send_message(message)

    except Exception:
        return False

    return True
