from typing import Union

from sqlalchemy.orm import Session

from .models import Campaign
from .schemas import CampaignPayloadSchema

# ------ CREATE --------------------------------------------------------------------------
async def add_campaign(payload: CampaignPayloadSchema, db: Session) -> int:

    campaign = Campaign(
        **payload.dict()
    )

    db.add(campaign), db.commit(), db.refresh(campaign)

    return campaign.id


# /----- CREATE --------------------------------------------------------------------------

# ------ READ ----------------------------------------------------------------------------
async def read_all_campaigns(db: Session):
    campaigns = db.query(Campaign).all()
    if campaigns:
        return campaigns
    return []


# /----- READ ----------------------------------------------------------------------------

# ------ UPDATE --------------------------------------------------------------------------

# /----- UPDATE --------------------------------------------------------------------------

# ------ DELETE --------------------------------------------------------------------------
async def delete_campaign_by_id(id: int, db: Session) -> int:
    campaign_query = db.query(Campaign).filter(Campaign.id == id)

    if campaign_query.first() is None:
        return None

    campaign_id = campaign_query.delete(synchronize_session=False)
    db.commit()
    return campaign_id

# /----- DELETE --------------------------------------------------------------------------
