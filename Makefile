stop:
	docker-compose down -v

start: stop
	docker-compose up -d

install:
	docker exec -it football-data-app sh -c "npm run start:dev"

prebuild:
	npm run prebuild

build: prebuild
	npm run build

run-migrations:
	docker exec -it football-data-app sh -c "npm run migration:run"

test-e2e:
	docker exec -it football-data-app sh -c "npm run test:e2e"

dev: 
	docker exec -it football-data-app sh -c "npm run start:dev"
	