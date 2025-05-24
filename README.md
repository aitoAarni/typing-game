# Improve vocabulary and typing speed at the same time

## How to run in development mode

Containers have bind mounts to the src folders, so code is auto updated without rebuilding the container, except if new node_modules are installed. Run the following commands from project root.

````
# Just to run the containers in dev mode
docker compose -f docker-compose.dev.yml up

# Build and start containers
docker compose -f docker-compose.dev.yml up --build

# Stop and remove containers
docker compose -f docker-compose.dev.yml down```
````
