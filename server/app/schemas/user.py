import pydantic


class UserCreds(pydantic.BaseModel):
    name: str
    password: pydantic.SecretStr


class UserData(pydantic.BaseModel):
    name: str
    language: str

    class Config:
        orm_mode = True


class User(UserCreds, UserData):
    pass
