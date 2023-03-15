# ------ POST --------------------------------------------------------------------------
def test_post_campaign(test_campaign):
    assert test_campaign["id"]

# /----- POST --------------------------------------------------------------------------

# ------ GET ---------------------------------------------------------------------------
def test_get_all_campaigns(test_app_with_db, test_campaign):
    # Given
    # When
    response = test_app_with_db.get(
        f"/api/campaigns/"
    )

    # Then
    response_dict = response.json()
    assert response.status_code == 200
    assert len(response_dict) == 1

# /----- GET ---------------------------------------------------------------------------