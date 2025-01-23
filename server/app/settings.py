import pydantic


class Settings(pydantic.BaseSettings):
    database_uri: str
    register_secret: pydantic.SecretStr
    redis_host: str
    redis_port: int
    cookie_lifetime_in_seconds: int = 60 * 60 * 24  # day


settings = Settings()
