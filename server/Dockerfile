FROM --platform=linux/amd64 python:3.10-slim

WORKDIR /app/
RUN apt-get update
RUN apt-get install -y curl
RUN python -m pip install --upgrade pip
ARG POETRY_URL=https://install.python-poetry.org
ENV YOUR_ENV=${YOUR_ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_HOME=/py-poetry \
  POETRY_VIRTUALENVS_CREATE=0 \
  POETRY_VERSION=1.3.1
RUN curl -sSL "${POETRY_URL}" | python
ENV PATH="${POETRY_HOME}/bin:$PATH"

RUN pip install tinycss2==1.1.1
RUN pip install psutil==5.9.1
RUN pip install pandocfilters==1.5.0
RUN pip install packaging==21.3
RUN pip install nbclient==0.6.4
RUN pip install mistune==0.8.4
RUN pip install jupyterlab-pygments==0.2.2
RUN pip install jinja2==3.1.2
RUN pip install ipython==8.4.0
RUN pip install defusedxml==0.7.1
RUN pip install debugpy==1.6.0
RUN pip install bleach==6.0.0

COPY ./pyproject.toml ./poetry.lock ./
RUN poetry install --no-root

COPY . ./

EXPOSE 8000

CMD alembic upgrade head && python -m app.start
