import functools
from typing import Generator

import sqlalchemy_utils
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.settings import settings


def fix_uri(uri: str):
    heroku_default = "postgres://"
    correct_connection = "postgresql+psycopg2://"
    if uri.startswith(heroku_default):
        return uri.replace(heroku_default, correct_connection, 1)
    return uri


@functools.cache
def engine():
    return create_engine(fix_uri(settings.database_uri))


@functools.cache
def get_session():

    return sessionmaker(autocommit=False, autoflush=False, bind=engine())


def get_db() -> Generator:
    db = get_session()()

    try:
        yield db
    finally:
        db.close()


def validate_database():
    if not sqlalchemy_utils.database_exists(engine().url):
        sqlalchemy_utils.create_database(engine().url)
