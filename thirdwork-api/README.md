# Development

## Required environment variables
- `DATABASE_URL`: the database connection string for the PlanetScale database
- `SHADOW_DB_URL`: the shadow DB connection string for the PlanetScale database
- `ENV`: set to 'local' for local development
- `AIRTABLE_API_KEY`: your API key for accessing Airtable data. Generate this via the account page in Airtable.

## How to start the development server for the app
- `npm i`
- `npm start`

## How to view the contents of the PlanetScale database
- `npm run prisma-studio`

# Resources

## Prisma

- [Prisma & Planetscale Issues](https://github.com/prisma/prisma/issues/7292)
- [Prisma Shadow Database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database)
- [Deploying Prisma & Planetscale](https://davidparks.dev/blog/planetscale-deployment-with-prisma/)
- [Data Modeling](https://www.prisma.io/dataguide/datamodeling)

## Next.js

[Next.js](https://github.com/zeit/next.js) is a framework for server-rendered React apps.
