# Nodejs Challenge Santex

## Framework used

### Nestjs https://docs.nestjs.com/

Nestjs is a framework that helps you setup a nodejs with Typescrip(if you want) very quickly with some advanced features that also helps you to reduce boilerplate code like, dependency injection, authorization/authentication to name some of the most important.

One of the features shown in the code about dependency injection and Typescript is the ability to completly detach the domain/bussines logic from the actual implementation. In this case we are using an interface DataProvider.ts to return the needed data for the domain, actual implementation is the football-api that the challenge is asking to use, but can easily be changed with another without having to change any piece of code in the domain/bussines logic.

The same principle can be use to detach the database, in this case I choose a widely used relation DB, mysql and Typeorm framwork to intercat with the db. Typeorm can be used with the Repository pattern, which also helps to detach domain/bussines logic from db, allowing us to do several things without changing domain/bussines logic if we need to, like:
- change db implementation
- decorate and incorporate caches
- migrate to another db

#### Tests

Using Typescript and receiving external dependencies of classes like in this project, allows you to easily mock and unit test you classes.

Project currently has integration tests, which are different than unit tests but they are also important and a very usefull way to identify bugs in your code. 


## How to run

The project includes some docker files and a Makefile to make it easy to setup a development envirnonment and have the tests and api running.

For the first time, run `make build-dev`. It will configurate and build the docker environment, install the project, run database migrations and start the api.

## Rate limit of football data org

The solution to the limit of a free api currently is being solve in a not very elegant way, the code is just waiting a minute if we hit the limit, and the trying the requests again. I think there are two possible solutions for this, but this was in my mind the simple one to implement.

### Having several free keys
Have a array of free keys, and store in memory (can be redis if we have more than one node running) a key with an expiration of 1 minute for each key that reaches the limit. If the key exists in the cache, then is not able to be used and we should use another one.

### Only importing data when requested
Importing persons that belongs to a team is a problem for a free api key, because a competition contains several teams, which is why we are reaching the limit of 10 requests per minute. We can not import persons of a team, until team detail is asked. So when a query is made to return persons of a team, we can import the team information there if it not exists, and the return info from db. That will improve the importLeague mutation to be fast and not reach the limit.

## Makefile commands

After `make buid-dev`, any time you need to use this env can be started with `make start`

### Run api for development

run `make dev` to start the api with a watcher so any change in the files will trigger a re-run of the api. Usefull for development

### Tests

test can be run with `make test-e2e` 

### Database migrations

migrations can be run with `make run-migrations`

### Config

.env.docker contains the needed configuration for the docker env. `make config` will simply copy that to `.env` file.
