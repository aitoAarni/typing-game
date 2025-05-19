# Improve vocabulary and typing speed at the same time

## How to run in development mode

Containers have bind mounts to the src folders, so code is auto updated without rebuilding the container

````
# Just to run the containers
docker compose up

# Build and start containers in foreground with logs
docker compose up --build

# OR start in background
docker compose up -d --build

# Stop and remove containers
docker compose down```
````
