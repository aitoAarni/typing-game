# Improve vocabulary and typing speed at the same time
[Deployed app](https://typing-game-frontend-4p84.onrender.com/)

https://github.com/user-attachments/assets/7ef7b22d-8653-4a5a-9990-1b6849d67fb2

## How to run in development mode

Containers have bind mounts to the src folders, so code is auto updated without rebuilding the container, except if new node_modules are installed. Run the following commands from project root.

````
# Just to run the containers in dev mode
docker compose -f docker-compose.dev.yml up

# Build and start containers
docker compose -f docker-compose.dev.yml up --build

# Stop and remove containers
docker compose -f docker-compose.dev.yml down
````
