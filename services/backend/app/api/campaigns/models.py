from sqlalchemy import Float, Column, Integer, String, DateTime
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from app.db import Base


class Campaign(Base):
    """
    Represents a crowdlending campaign
    """

    __tablename__ = "campaigns"


    id = Column(
        Integer,
        primary_key=True,
        nullable=False,
    )
    name = Column(String, server_default="", nullable=False)
    description = Column(String, server_default="", nullable=False)
    address = Column(String, server_default="", nullable=False)
    activation_date = Column(DateTime, nullable=False)
    expiration_date = Column(DateTime, nullable=False)
    asset = Column(String, nullable=True)
    apy = Column(Float, nullable=False)
    goal = Column(Float, nullable=False)
    owner_address = Column(String, nullable=True)
    deposit_address = Column(String, nullable=True)
    status = Column(String, server_default="OPEN", nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False
    )

    def __str__(self):
        return f"id: {self.id}, \
            name: {self.name}, \
            description: {self.description}, \
            address: {self.address}, \
            activation_date: {self.activation_date}, \
            expiration_date: {self.expiration_date}, \
            asset: {self.asset}, \
            apy: {self.apy}, \
            goal: {self.goal}, \
            owner_address: {self.owner_address}, \
            deposit_address: {self.deposit_address}, \
            status: {self.status}, \
            created_at: {self.created_at}"
