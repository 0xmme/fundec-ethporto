import pytest


@pytest.fixture(scope="function")
def test_campaign(test_app_with_db, monkeypatch):

    async def mock_create_new_campaign(owner_address):
        return "0x00000000000000000000"

    monkeypatch.setattr(
        "app.api.campaigns.router.create_new_campaign", mock_create_new_campaign
    )

    campaign = {
                "name": "Campaign",
                "description": "A good energy community",
                "address": "Porto",
                "activation_date": "2030-01-01 00:00:00",
                "expiration_date": "2030-12-31 00:00:00",
                "asset": "MCK",
                "apy": 8,
                "goal": 10000,
                "owner_address": "0x00000000000000000000",
            }

    response = test_app_with_db.post(
        "/api/campaigns/",
        json=campaign
            
    )
    assert response.status_code == 201

    campaign["id"] = response.json()
    return campaign