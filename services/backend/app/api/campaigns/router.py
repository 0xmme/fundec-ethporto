from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db import get_db
from . import crud
from .schemas import CampaignPayloadSchema, CampaignResponseSchema
from .service import read_new_campaign, read_all_campaigns

router = APIRouter()

# ------ POST -------------------------------------------------------------------------
@router.post("/", status_code=status.HTTP_201_CREATED)
async def post_campaign(
    campaign: CampaignPayloadSchema,
    db: Session = Depends(get_db),
):

    deposit_address = await read_new_campaign()
    campaign.deposit_address = deposit_address
    new_campaign = await crud.add_campaign(campaign, db)
    
    return new_campaign

# /----- POST -------------------------------------------------------------------------

# ------ GET --------------------------------------------------------------------------
response_model=List[CampaignResponseSchema]
@router.get("/", response_model=response_model)
async def get_all_campaigns(
    db: Session = Depends(get_db),
) -> response_model:
    campaigns = await crud.read_all_campaigns(db)
    web3_campaigns = await read_all_campaigns()

    result = [obj for obj in campaigns if obj.deposit_address not in web3_campaigns]
    for campaign in result:
        await crud.delete_campaign_by_id(campaign.id, db)

    campaigns = await crud.read_all_campaigns(db)
    return campaigns

# /----- GET --------------------------------------------------------------------------