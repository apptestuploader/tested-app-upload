import logging

import fastapi
from sqlalchemy.orm import Session

from app.crud.auth import store, auth
from app.db.session import get_db
from app.schemas.user import User, UserCreds, UserData
from app.settings import settings

router = fastapi.APIRouter(tags=["auth"])
log = logging.getLogger(__name__)


@router.post(
    "/login",
    status_code=200,
    response_model=UserData,
)
def login(
    response: fastapi.Response,
    user: UserCreds,
    db: Session = fastapi.Depends(get_db),
):
    found_user = auth.read_user(db=db, user=user)
    if found_user is None:
        return fastapi.responses.JSONResponse(
            status_code=403,
            content={"error": "Invalid credentials."},
        )

    session_id, session_value = store.generate_session(
        user=found_user,
    )
    response.set_cookie(
        key="session",
        value=session_value,
        expires=settings.cookie_lifetime_in_seconds,
    )
    response.set_cookie(
        key="user-id",
        value=session_id,
        expires=settings.cookie_lifetime_in_seconds,
    )
    return found_user


@router.get(
    "/validate-session",
    status_code=200,
    response_model=UserData,
)
def validate_session(
    db: Session = fastapi.Depends(get_db),
    user_id: str = fastapi.Cookie(..., alias="user-id"),
):
    return auth.read_user_by_name(db=db, name=user_id)


@router.post("/register", status_code=200)
def register(
    user: User,
    secret: str = fastapi.Body(...),
    db: Session = fastapi.Depends(get_db),
):
    if secret == settings.register_secret.get_secret_value():
        user = auth.create_user(db=db, user=user)
        return {"message": f"{user.name} registered."}

    return None


async def require_cookie(request: fastapi.Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    path = request.scope.get("path")

    accessible_api = {
        "/api/login",
    }
    dev_routes = {
        "/api/register",
        "/openapi.json",
        "/docs",
    }

    whitelist = {
        *accessible_api,
        *dev_routes,
    }

    if path in whitelist:
        return await call_next(request)

    user = request.cookies.get("user-id")
    session_value = request.cookies.get("session")
    correct_session = store.validate_session(
        session_id=user,
        value=session_value,
    )

    if correct_session:
        return await call_next(request)

    return fastapi.responses.JSONResponse(
        status_code=403,
        content={"error": "Unauthorized"},
    )
