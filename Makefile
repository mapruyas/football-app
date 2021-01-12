stop:
	docker-compose down -v

start: stop
	docker-compose up -d

config: 
	cp .env.docker .env

install:
	docker exec -it football-data-app sh -c "npm install"

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

build-dev: config start install run-migrations dev
	echo "finished"
	