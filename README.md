# kanary

A sample app for experimenting with Kubernetes. Birdwatching-themed 🐤

# Development

You can work on this app locally using Docker Compose or a local Kubernetes cluster. Choose the tooling that works best for you.

## Docker Compose

First, create a file called `.env` in the root of this repo. Then edit it to look like:

```
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=<some password>
```

Note that the password is only used for local development, so no need to get too crazy with it 🙃

Next, run the following commands to build/run the Docker Compose services and bootstrap the database:

```
docker-compose up
docker-compose exec app bash -c "npm i -g knex && cd db && knex migrate:latest && knex seed:run"
```

Now visit [http://localhost:3000](http://localhost:3000), and you should see the app with some seed data!

## Kubernetes

TODO
