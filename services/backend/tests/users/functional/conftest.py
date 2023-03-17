import json

import pytest
from app.api.users.utils import create_code
@pytest.fixture(scope="function")
def test_unverified_user(test_app_with_db, monkeypatch):
    # Given
    async def mock_send_verification_email(email, user_type):
        return True
    
    code = create_code()
    def create_mock_code():
        return code

    monkeypatch.setattr(
        "app.api.users.router.send_email_with_code",
        mock_send_verification_email,
    )

    monkeypatch.setattr(
        "app.api.users.router.create_code",
        create_mock_code,
    )

    user = {"email": "test@test.com"}

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
    user["code"] = code
    return user