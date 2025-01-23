export $(cat deploy/.env | xargs)

make build-prod

docker tag tea-shop-postgresql_client:latest "$REGISTRY_ADDRESS/client"
docker tag tea-shop-postgresql_server:latest "$REGISTRY_ADDRESS/server"

docker login -u "$REGISTRY_USERNAME" -p "$REGISTRY_PASSWORD" "$REGISTRY_ADDRESS"

docker push "$REGISTRY_ADDRESS"/client:
docker push "$REGISTRY_ADDRESS"/server

