from datetime import datetime

from app.api.users.models import User


def test_models(session):
    # Given
    data = {
        "email": "test@test.com",
    }

    # When
    user = User(**data)
    session.add(user), session.commit(), session.refresh(user)

    # Then
    assert user.id
    assert user.created_at
    assert not user.is_verified
    for key, value in data.items():
        assert getattr(user, key) == value
