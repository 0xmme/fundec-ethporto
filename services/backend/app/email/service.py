from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import EmailStr

from .template import create_html_email_verification

conf = ConnectionConfig(
    MAIL_USERNAME="fundeco.ethporto@outlook.com",
    MAIL_PASSWORD="r2Jt3ogH37Vm%R@F",
    MAIL_FROM="fundeco.ethporto@outlook.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.office365.com",
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
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

    return True
