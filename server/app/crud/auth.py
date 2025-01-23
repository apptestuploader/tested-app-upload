import datetime
from typing import Tuple

import bcrypt
import pydantic
from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.db.redis import r
from app.models import models
from app.schemas.user import User, UserCreds
from app.settings import settings


class SessionStore:
    def generate_session(self, user: models.User) -> Tuple[str, str]:
        encoding = "utf-8"
        session_value = bcrypt.hashpw(
            bytes(
                f"{user.password};{datetime.datetime.now().timestamp()}",
                encoding,
            ),
            salt=bcrypt.gensalt(rounds=15),
        ).decode(encoding)

        r.set(
            f"session:{user.name}",
            session_value,
            ex=settings.cookie_lifetime_in_seconds,
        )

        return user.name, session_value

    def validate_session(self, session_id: str, value: str) -> bool:
        try:
            session_value = r.get(f"session:{session_id}")
            return session_value == value
        except Exception:
            return False


store = SessionStore()


class Auth:
    def read_user(self, db: Session, user: UserCreds):
        found_user = (
            db.query(models.User)
            .where(
                and_(
                    models.User.name == user.name,
                )
            )
            .first()
        )
        if found_user is None:
            return None
        if self._passwords_matches(
            password_stored=found_user.password,
            password_sent=user.password,
        ):
            return found_user

    def read_user_by_name(self, db: Session, name: str):
        found_user = (
            db.query(models.User)
            .where(
                and_(
                    models.User.name == name,
                )
            )
            .first()
        )
        return found_user

    def create_user(self, db: Session, user: User):
        user_object = models.User(
            name=user.name,
            password=self._encrypt_password(user.password),
            language=user.language,
        )
        db.add(user_object)
        db.commit()
        db.refresh(user_object)
        return user_object

    def _encrypt_password(self, password: pydantic.SecretStr) -> str:
        encoding = "utf-8"
        return bcrypt.hashpw(
            password=bytes(
                password.get_secret_value(),
                encoding,
            ),
            salt=bcrypt.gensalt(rounds=10),
        ).decode(encoding)

    def _passwords_matches(
        self, password_stored: str, password_sent: pydantic.SecretStr
    ) -> bool:
        encoding = "utf-8"
        return bcrypt.checkpw(
            password=bytes(
                password_sent.get_secret_value(),
                encoding,
            ),
            hashed_password=bytes(
                password_stored,
                encoding,
            ),
        )


auth = Auth()
