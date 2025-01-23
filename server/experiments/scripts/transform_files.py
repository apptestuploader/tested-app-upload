import json
import logging
import os
import os.path

import bson
import pydantic
from fastapi.encoders import jsonable_encoder

log = logging.getLogger(__name__)


class Settings(pydantic.BaseSettings):
    raw_directory = "./experiments/data/raw"
    target_directory = "./experiments/data/transformed"


class FilePaths(pydantic.BaseModel):
    raw: str
    transformed: str


def find_files(
    directory_path: str,
    condition: str = ".bson",
) -> list[str]:
    return [
        file_name for file_name in os.listdir(directory_path) if condition in file_name
    ]


def create_paths(
    base_path: str,
    target_path: str,
    file_name: str,
) -> FilePaths:
    return FilePaths(
        raw="/".join([base_path, file_name]),
        transformed="/".join([target_path, file_name]).replace(".bson", ".json"),
    )


def to_json(
    file_paths: FilePaths,
) -> None:
    with open(file_paths.raw, "rb") as file:
        content = file.read()
        base = 0
        items = []
        while base < len(content):
            base, d = bson.decode_document(content, base)
            items.append(d)

    with open(file_paths.transformed, "w") as target:
        json.dump(jsonable_encoder(items), target)


def main():
    s = Settings()
    try:
        os.makedirs(s.target_directory)
    except FileExistsError:
        log.info(f"{s.target_directory} exists, skipping.")

    file_names = find_files(s.raw_directory)
    paths = [
        create_paths(
            base_path=s.raw_directory,
            target_path=s.target_directory,
            file_name=file_name,
        )
        for file_name in file_names
    ]
    for path in paths:
        log.info(f"Transforming {path.raw}")
        to_json(path)
        log.info(f"Saved to {path.transformed}")


if __name__ == "__main__":
    main()
