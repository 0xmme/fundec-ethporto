import json

def test_unverified_user(test_app_with_db, monkeypatch):

    # Given
    user = {"email": "bigtavadev@gmail.com"}

    # When
    response = test_app_with_db.post(
        "/api/users/send-code/",
        content=json.dumps(user),
    )

    # Then
    response_dict = response.json()

    assert response.status_code == 202
    assert (
        response_dict["detail"]
        == "A code has been sent to this address."
    )