import os
import logging
from functools import lru_cache
from pydantic import AnyUrl, BaseSettings


log = logging.getLogger("uvicorn")


class Settings(BaseSettings):
    environment: str = os.getenv('ENVIRONMENT')
    testing: bool = os.getenv('TESTING')
    database_url: AnyUrl = os.getenv("DATABASE_URL")


@lru_cache()
def get_settings() -> BaseSettings:
    log.info("Loading config settings from the environment...")
    return Settings()
