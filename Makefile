default: d
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.override.yml \
		-f black.yml \
		-f labels.yml \
		up \
		-d

build:
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.override.yml \
		-f black.yml \
		-f labels.yml \
		build

d:
	docker-compose down --remove-orphans

prod: d
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d

build-prod: d
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml build


headless: d
	@echo "Starting client-less mode."
	docker-compose up -d server db


client-lite: d headless
	@echo "Starting docker-less client."
	cd client && \
 	yarn start

server-tests:
	docker-compose exec server "python" "-m" "pytest" "tests"

nx:
	docker-compose -f jupyter.yml -f black.yml up