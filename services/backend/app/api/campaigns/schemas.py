from datetime import datetime
from enum import Enum
from typing import Optional

from app.api.schemas import OrmBaseModel

# ------ ENUMS --------------------------------------------------------------------------
class AssetType(str, Enum):
    MCK = "MCK"

class StatusType(str, Enum):
    open = "OPEN"
    launched = "LAUNCHED"
    closed = "CLOSED"


# /----- ENUMS --------------------------------------------------------------------------


# ------ SCHEMAS ------------------------------------------------------------------------
class CampaignSchema(OrmBaseModel):
    name: str
    description: str
    address: str
    activation_date: datetime
    expiration_date: datetime
    asset: AssetType
    apy: float
    goal: float
    owner_address: str
    deposit_address: str
    status: StatusType
    created_at: datetime


class CampaignPayloadSchema(OrmBaseModel):
    name: str
    description: str
    address: str
    activation_date: datetime
    expiration_date: datetime
    asset: AssetType
    apy: float
    goal: float
    owner_address: str
    deposit_address: Optional[str]


class CampaignResponseSchema(CampaignSchema):
    id: int

# /----- SCHEMAS ------------------------------------------------------------------------