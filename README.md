# kanary

A sample app for experimenting with Kubernetes. Birdwatching-themed 🐤

# Development

To build the Docker image:

```
docker build . -t rbrtmrtn/kanary
```

To run the Docker container:

> Note: this assumes Postgres is running on the host on port 5432.

```
docker run \
  -d \
  -p 3000:3000 \
  -e PGHOST=host.docker.internal \
  -e PGDATABASE=kanary \
  -e PGUSER=<user> \
  --rm \
  rbrtmrtn/kanary
```
