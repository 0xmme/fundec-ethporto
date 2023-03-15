import os

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import Settings, get_settings
from app.db import Base, get_db
from app.main import create_application

DATABASE_TEST_URL = os.environ.get("DATABASE_TEST_URL")


def get_settings_override():
    return Settings(environment="test", testing=True, database_url=DATABASE_TEST_URL)

engine = create_engine(DATABASE_TEST_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def test_app():
    # set up
    app = create_application()
    app.dependency_overrides[get_settings] = get_settings_override

    with TestClient(app) as test_client:

        # testing
        yield test_client


@pytest.fixture(scope="function")
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="function")
def test_app_with_db(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()

    app = create_application()
    app.dependency_overrides[get_settings] = get_settings_override
    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        # testing
        yield test_client