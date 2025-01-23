from uuid import UUID

from pydantic import BaseModel


def snake_to_camel(string: str) -> str:
    pascal = "".join(word.capitalize() for word in string.split("_"))
    return f"{pascal[0].lower()}{pascal[1:]}"


class BaseSchema(BaseModel):
    class Config:
        alias_generator = snake_to_camel
        allow_population_by_field_name = (
            True  # TODO: removable when API and tests are generic enough
        )
        json_encoders = {UUID: lambda id_: str(id_)}
