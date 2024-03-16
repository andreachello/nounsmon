# Wysdom Server

**Stack:** NodeJS, Express, TypeScript, Prisma, MySQL

## Setup

### How to setup Database

1. Sign Up for PlanetScale: Sign up for a PlanetScale account https://planetscale.com/.
2. Create a PlanetScale Database: Follow the PlanetScale documentation to create a new database cluster.
3. Setup your `.env` in `server` using the sample .env to include the PlanetScale database connection URL.
3. [First Time]: Run `npm run db:migrate:create` to create the DB Locally
4. Run `npm run db:migrate:local` to run all Prisma migrations.
5. Run the app (see below)

## Rules

- When defining an API, use the router, controller and service pattern:
    - Routers: Responsible for defining API paths.
    - Controllers: Handles request and response logic.
    - Services: Contains business logic, particularly operations involving databases.
- API structure is always resource-first as illustrated below:

```
project-root/
|-- src/
|   |-- resources/v1/resource
|   |   |-- resource.router.ts
|   |   |-- resource.controller.ts
|   |   |-- resource.service.ts
|-- index.ts
```

## Running the app

```bash
# development
$ npm run dev
```
