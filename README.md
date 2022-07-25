# Thirdwork Tech Stack

<aside>
💡 This is meant to give you an overview of our tech stack so you can have a high level concept of the project. Use this guide as a reference and go back to this when needed.

</aside>

## Front End

### React

> A JavaScript library for building user interfaces.

Official Docs: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)

Key Concepts:

- Declarative
- Component-Based

### TypeScript

> TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

Official Docs: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

### Material UI

> Material UI is a library of React UI components that implements Google's Material Design.

Official Docs: [https://mui.com/material-ui/getting-started/overview/](https://mui.com/material-ui/getting-started/overview/)

Key Concept:

- Customizability
- Trusted

---

## Back End

### NextJS

> Next.js is a [React](<https://en.wikipedia.org/wiki/React_(web_framework)>) framework that enables several extra features, including [server-side rendering](https://en.wikipedia.org/wiki/Server-side_scripting)
> and generating [static websites](https://en.wikipedia.org/wiki/Static_web_page)

We are currently only using the /api folder within NextJS, but NextJS is intended to be the long-term home of the app. This means that everything within the /thirdwork-app folder (which is a create-react-app project) will be migrated to the NextJS project eventually. Having these two parts of the app separate allows us to inject custom React components into no-code platforms like Softr, where we can leverage their no-code dashboards and account management functions.

Offical Docs: [https://nextjs.org/docs](https://nextjs.org/docs)

Key Concept:

- File-Based Routing
- Server Side Rendering (SSR)

---

## Database

There are two parts of our database:

1. PlanetScale, a MySql/Vitess database service which houses all data that would otherwise exceed the 50,000 row limit of Airtable.
2. Airtable, a spreadsheet-database hybrid that supports rapid iteration with regard to product requirements.

### Airtable

> Airtable is a spreadsheet-database hybrid, with the features of a [database](https://en.wikipedia.org/wiki/Database) but applied to a [spreadsheet](https://en.wikipedia.org/wiki/Spreadsheet)

Official Docs: [https://airtable.com/api](https://airtable.com/api)

### PlanetScale

PlanetScale is the most scalable MySQL platform. With horizontal sharding and unlimited connections, you can harness the power of Vitess without hiring a team of engineers.
PlanetScale provides secure connection strings for your database branches. Non-blocking schema changes. Deploy and revert schema changes without downtime or locking.

Official Docs: [https://planetscale.com/docs](https://planetscale.com/docs)

### Prisma

> Prisma is an open source next-generation ORM. It consists of the following parts:

- Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
- Prisma Migrate: Migration system
- Prisma Studio: GUI to view and edit data in your database

Official Docs: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)

### How to get the Prisma & PlanetScale Database start and running

1. Create a PlanetScale account.
   For signing up, https://auth.planetscale.com/sign-up
2. Create a database. This will be used as the actual database
   Refer to https://planetscale.com/docs/tutorials/planetscale-quick-start-guide for more details
3. Copy the database URL. In our top-level backend environment ".env" file add another line, DATABASE_URL="YOUR_DATBASE_URL"
4. Create another database. This will be used as the shadow database
5. Copy the database URL. In our top-level backend environment ".env" file add another line, SHADOW_DB_URL="YOUR_DATBASE_URL"
   To know more about shadow database, refer to https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database
6. Run the following command, `npx prisma db push`.
   To know more about what it does, refer to https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push

### How to migrate data from Airtable to PlanetScale

1. Export the table needs to be migrated in Airtable as a CSV file
2. Place the file into `thirdwork-api/prisma/airtable-import/csv-files`
3. Modify the `ingest-csv.ts` file to target the newly added file
4. Run npm run ingest-csv to start the migration prcoess

---

## Deployment

### Vercel

> Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.

Official Docs: [https://vercel.com/docs](https://vercel.com/docs)

## Setting Up Dev Base, Domains & Applications

## Create a Dev Copy of the AirTable Base:

- Select this toggle for step-by-step instructions:
  1. Login to [airtable.com](http://airtable.com).

  2. Make sure you have been added the “Thirdwork WorkSpace” on Airtable.
  3. Select the dropdown menu on the Base to be duplicated.
  4. Select “Duplicate base” in the base’s modal.
  5. Select the dropdown menu on the “Prod Copy” that has just been created.
  6. Change the suffix of the base title from “Prod copy” to “Dev”.

  7. We now have a Dev copy of the Airtable base, ready for use in our Development lifecycle!

## Add a base.ts file to a project:

- Select this toggle for step-by-step instructions:
  1. Use this code as example:
  ```jsx
  import Airtable from "airtable";

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.ENV === "dev"
      ? "insert_dev_base_id_here"
      : "insert_prod_base_id_here"
  );

  export default base;
  ```
  1. Retrieve the base id from the url of said base (remember to get both prod and dev base ids):
  1. Add the base.ts file with our ternary statement here:
  ```jsx
  thirdwork / project-api / src / apiService / airtable / base.ts;
  ```
  1. You’re all set! Base’s will now switch based on whether or not “dev” is assigned to the ENV variable.

## Create a Vercel domain that previews the dev branch on Github:

- Select this toggle for step-by-step instructions:
  1. Login to [Vercel.com](http://Vercel.com).

  1. Make sure you have been added the “Sequnse Team” on Vercel.
  1. Select the Vercel deployment that needs a ‘dev’ domain created.
  1. Select “View Domains”.
  1. Copy the production url into the “Add” text field and add “-dev” _before_ “.vercel.app”.
  1. Select “Edit” on the newly created domain that includes “-dev”.
  1. Locate the “Git Branch” text field.
  1. Type “dev” into the text field and select “Save”.
  1. You should now see your new domain that is “Assigned to dev branch”.
  1. You’re all set! Repeat this process for both the “app” *and “*api” deployments.

## Add component-scripts.ts that includes ternary for Prod vs. Dev:

- Select this toggle for step-by-step instructions:
  1. Use this code as example:
  ```jsx
  import { NextApiRequest, NextApiResponse } from "next";
  import getDataFromAirtable from "src/apiService/airtable/getDataFromAirtable";
  import validateUser from "src/apiService/softr/validateUser";
  import cors from "cors";
  import runMiddleware from "src/utils/runMiddleware";
  import { withSentry } from "@sentry/nextjs";
  import corsOptions from "../../apiService/corsOptions";
  import base from "src/apiService/airtable/base";
  import axios from "axios";

  async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    await runMiddleware(req, res, cors(corsOptions));

    switch (req.method) {
      case "GET": {
        if (!req.query.fileName) {
          res.status(400).send("Bad Request");
          return;
        }
        const assetManifest = await axios.get(
          process.env.ENV === "dev"?
          "https://thirdwork-app-dev.vercel.app/asset-manifest.json" :
          "https://thirdwork-app.vercel.app/asset-manifest.json"
        );
        const componentInitScriptPath =
          assetManifest.data.files[req.query.fileName as string];

        const componentInitScript = await axios.get(
          process.env.ENV === "dev"?
          `https://thirdwork-app-dev.vercel.app${componentInitScriptPath}` :
          `https://thirdwork-app.vercel.app${componentInitScriptPath}`
        );

        res.status(200).send(componentInitScript.data);
        break;
      }
      default: {
        console.error(
          `Unsupported method type ${req.method} made to endpoint ${req.url}`
        );
        res.status(404).end();
        break;
      }
    }
  }

  export default withSentry(handler);
  ```
  1. Retrieve Vercel deployment domains for both Prod and Dev deployments:
  1. Add the component-scripts.ts file with our ternary statement here:
  ```jsx
  thirdwork / thirdwork-api / src / pages / api / component-scripts.ts;
  ```
  1. You’re all set! The deployment URL will now switch based on whether or not “dev” is assigned to the ENV variable.

## Create a Dev Softr Application:

- Select this toggle for step-by-step instructions:
  1. Login to Softr.
  1. Locate the Prod application you would like to duplicate and select the ellipsis menu for more options.

  1. Select “Duplicate”.

  1. In the top-left corner, change the name to “[application name] - Dev”.
  1. Select “Settings”.
  1. Select “Custom Code”.
  1. Select the expand icon.
  1. Edit the script-src and link-href links to include “-dev” to match the dev domain created on the Vercel deployment of the project’s API.
  1. Select the orange “Save” button.
  1. In the top-right corner, select “Publish” and confirm by selecting the second “Publish” button
  1. Test the dev application with the testing link provided.
  1. You’re all set! We now have a duplicate copy of the production application for development 🎉
