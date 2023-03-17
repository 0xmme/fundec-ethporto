from enum import Enum

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenType(str, Enum):
    access = "ACCESS"
    refresh = "REFRESH"


class TokenData(BaseModel):
    email: str | None = None
    id: int | None = None
