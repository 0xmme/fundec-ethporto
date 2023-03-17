from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from app.db import Base


class User(Base):
    """
    Represents a user
    """

    __tablename__ = "users"


    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False)
    code = Column(String, nullable=True)
    is_verified = Column(Boolean, server_default="FALSE", nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    def __str__(self):
        return f"id: {self.id}, \
            email: {self.email}, \
            code: {self.code}, \
            is_verified: {self.is_verified}, \
            created_at: {self.created_at}"