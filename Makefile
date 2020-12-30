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

dev: start install
	docker exec -it football-data-app sh -c "npm run start:dev"
	