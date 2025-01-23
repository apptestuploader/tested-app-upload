# TEA-SHOP-POSTGRESQL

This is implementation of lovely backend for POS system for lovely Czajownia using [Fastapi](
https://fastapi.tiangolo.com
), PostgreSQL and [gitmoji](https://gitmoji.dev)

## Quickstart
### Docker setup
#### Linux
Copy server example environment
```shell
cp server/.env.example server/.env
```

Assuming you have installed the Docker and Docker-compose

```shell
sudo docker-compose up --build
```

#### Windows

Assuming you have installed the Docker for Windows.

```shell
docker-compose up --build
```


#### What did I start?

* PostgreSQL database at http://localhost:5432.
* Python backend build on FastAPI at http://localhost:8000 and documentation at
  http://localhost:8000/docs.
* React client at http://localhost:3000.

### Remote mode
To run `client` only you can use remote server and database.

1. For initial setup run:
```bash
cd client 
cp .env.example .env
```

2. You should be ready to go with:
```bash
yarn start
```