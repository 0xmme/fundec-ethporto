from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from .schemas import TokenData, TokenType

SECRET_KEY = "6c3ed9cf14360a2fe6f5c487dfe9c1f8bf0bddc6aefef3136fd3c6fdf35a55ad"
REFRESH_SECRET_KEY = "753778214125442A472D4B614E645267556B58703273357638792F423F452848"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24
REFRESH_TOKEN_EXPIRES_IN = 60 * 24 * 7

def create_token(
    data: dict, type: TokenType, expires_delta: timedelta | None = None
) -> str:

    if type == TokenType.refresh:
        minutes = REFRESH_TOKEN_EXPIRES_IN
        secret_key = REFRESH_SECRET_KEY
    else:
        minutes = ACCESS_TOKEN_EXPIRE_MINUTES
        secret_key = SECRET_KEY

    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str, type: TokenType) -> TokenData:
    if type == TokenType.refresh:
        secret_key = REFRESH_SECRET_KEY
    else:
        secret_key = SECRET_KEY

    try:
        data = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        token_data = TokenData(**data)

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token_data
