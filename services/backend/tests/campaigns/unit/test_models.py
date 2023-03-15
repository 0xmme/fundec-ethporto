from datetime import datetime

from app.api.campaigns.models import Campaign


def test_models(session):
    # Given
    data = {
        "name": "Campaign",
        "description": "A good energy community",
        "address": "Porto",
        "activation_date": datetime(2030, 1, 1, 0, 0, 0),
        "expiration_date": datetime(2022, 12, 31, 0, 0, 0),
        "asset": "MOCK",
        "apy": 8,
        "goal": 10000,
        "owner_address": "0x00000000000000000000",
        "deposit_address": "0x00000000000000000000",
        "status": "OPEN",
    }



    # When
    campaign = Campaign(**data)
    session.add(campaign), session.commit(), session.refresh(campaign)

    # Then
    assert campaign.id
    for key, value in data.items():
        assert getattr(campaign, key) == value
