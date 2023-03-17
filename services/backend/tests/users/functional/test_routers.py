def test_send_code(test_unverified_user):
    assert test_unverified_user


def test_verify_code(
    test_app_with_db, test_unverified_user
):
    # Given
    email = test_unverified_user["email"]
    code = test_unverified_user["code"]

    # When
    response = test_app_with_db.post(
        f"/api/users/verify-code/",
        params={
            "email": email,
            "code": code,
        }
    )

    # Then
    response_dict = response.json()
    assert response.status_code == 201
    assert response_dict["access_token"]
    assert response_dict["user"]["email"] == email
    assert response_dict["user"]["is_verified"] == True
