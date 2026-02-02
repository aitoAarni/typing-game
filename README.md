# Improve vocabulary and typing speed at the same time
[Deployed app](https://typing-game-frontend-4p84.onrender.com/)

https://github.com/user-attachments/assets/7ef7b22d-8653-4a5a-9990-1b6849d67fb2



## Frontend Files

[Frontend Types](./frontend/src/types/types.ts)

[Frontend TypeGuards](./frontend/src/types/TypeGuards.ts)

[Statistics View](./frontend/src/components/StatisticsView.tsx)

## Backend Overview

The backend of this typing game application is built using **Node.js** with **Express.js** and **TypeScript**, following a layered architecture pattern. It integrates with a **PostgreSQL** database for data persistence and uses **Google OAuth** for authentication. 

#### Key Layers and Components

1. **Entry Point (index.ts)**:
   - Initializes the Express application.
   - Configures global middleware (e.g., CORS, JSON parsing).
   - Mounts feature-specific routers (e.g., `/text`, `/auth`, `/typing-session`, `/recent-words`).
   - Applies global error handling middleware.

2. **Routes (`src/routes/`)**:
   - Each feature has its own router file (e.g., authRoute.ts, `textRoute.ts`).
   - Routers define HTTP endpoints (e.g., POST `/auth/google`) and delegate requests to corresponding controller functions.
   - Acts as the interface between HTTP requests and application logic.

3. **Controllers (`src/controllers/`)**:
   - Handle incoming requests from routes.
   - Perform request validation, extract data from requests, and orchestrate calls to services.
   - Manage responses, including success data or error forwarding to middleware.
   - Example: authControllers.ts verifies Google OAuth tokens, interacts with auth services for user management, and returns JWT tokens.

4. **Services (`src/services/`)**:
   - Contain business logic and domain-specific operations.
   - Interact with the database layer for data retrieval, creation, or updates.
   - Example: authServices.ts queries the database for users by Google ID or creates new users.

5. **Database Layer (`src/database/`)**:
   - **pool.ts**: Manages a connection pool to PostgreSQL using the `pg` library, configured via environment variables (e.g., `DATABASE_URL`).
   - **query.ts**: Provides a utility function (`queryDatabase`) to execute SQL queries with parameterized inputs for security.
   - **`schema.sql`**: Defines the database schema (tables, relationships) for entities like users, typing sessions, and words.

6. **Types and Validation (`src/types/`)**:
   - **types.ts**: Defines TypeScript interfaces and types (e.g., `DatabaseUser`, `TypingSessionRequest`) inferred from Zod schemas.
   - **`typeGuards.ts`**: Contains Zod schemas for runtime validation and type safety (e.g., parsing database results).
   - Enforces type consistency across the application.

7. **Middleware (middleware.ts)**:
   - **`tokenHandler`**: Authenticates requests by verifying JWT tokens in the `Authorization` header, attaching user data to the request object.
   - **`errorHandler`**: Catches and handles errors (e.g., HTTP errors or uncaught exceptions), returning appropriate JSON responses.

8. **Utilities (`src/utils.ts`)**:
   - Helper functions (e.g., `generateToken` for JWT creation, `HTTPError` for custom errors).
   - Shared logic not tied to specific features.

#### Data Flow Example (Authentication Flow)
- **Request**: Client sends POST `/auth/google` with Google credentials.
- **Route**: authRoute.ts forwards to `authGoogle` controller.
- **Controller**: Validates token, calls `getUserByGoogleId` or `createUser` from services.
- **Service**: Queries database via `queryDatabase`.
- **Database**: Executes SQL on PostgreSQL pool.
- **Response**: Controller generates JWT and sends back user data.

#### ASCII Diagram of Architecture
```
[Client (Frontend)]
     |
     | HTTP Requests (e.g., /auth/google)
     v
[Express App (index.ts)]
     |
     +-- Middleware (CORS, JSON, Auth, Error Handling)
     |
     +-- Routes (/auth, /text, /typing-session, /recent-words)
     |    |
     |    +-- Controllers (Request Handling & Validation)
     |         |
     |         +-- Services (Business Logic)
     |              |
     |              +-- Database Layer (Pool, Queries, Schema)
     |
     +-- Types & Utils (Validation, Helpers)
```

#### Component Summary Table

| Component          | Folder/File                  | Purpose                                                                 | Key Technologies/Dependencies |
|--------------------|------------------------------|-------------------------------------------------------------------------|-------------------------------|
| **Entry Point**   | index.ts              | Initializes Express app, mounts routes, starts server.                | Express.js, CORS             |
| **Routes**        | `src/routes/*.ts`           | Define API endpoints and route requests to controllers.               | Express Router               |
| **Controllers**   | `src/controllers/*.ts`      | Handle requests, validate input, call services, send responses.       | Express Request/Response     |
| **Services**      | `src/services/*.ts`         | Implement business logic, interact with database.                     | Custom logic                 |
| **Database**      | `src/database/`             | Manage DB connections, execute queries, define schema.                | pg (PostgreSQL), SQL        |
| **Types**         | `src/types/`                | Define types and schemas for validation.                              | TypeScript, Zod              |
| **Middleware**    | middleware.ts         | Handle authentication, errors, and cross-cutting concerns.            | JWT, Express Middleware      |
| **Utils**         | `src/utils.ts`              | Provide shared utility functions.                                      | JWT, Custom Errors           |


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
