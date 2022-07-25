import { NextApiRequest, NextApiResponse } from "next";
import base from "src/apiService/airtable/base";
import validateUser from "src/apiService/softr/validateUser";
import cors from "cors";
import runMiddleware from "src/utils/runMiddleware";
import { withSentry } from "@sentry/nextjs";
import corsOptions from "../../../apiService/corsOptions";
import getDataFromAirtable from "src/apiService/airtable/getDataFromAirtable";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await runMiddleware(req, res, cors(corsOptions));

  const isValidUser = await validateUser(req.query.jwtToken as string);
  if (!isValidUser) {
    res.status(401).send("Unauthorized");
    return;
  }

  switch (req.method) {
    case "GET": {
      if (!req.query.loggedInUserRecordId) {
        res.status(400).send("Bad request");
        return;
      }

      const { data: user } = await getDataFromAirtable({
        tableName: "Users",
        filterByFormula: `{Record ID} = "${req.query.loggedInUserRecordId}"`,
        view: "Grid view",
      });

      if (user.length === 0) {
        console.error(
          `Could not find user with record ID ${req.query.loggedInUserRecordId}`
        );
        res.status(400).send("Bad request");
        return;
      }

      if (!user[0]["Freelancer Profile"]) {
        console.log(
          `Could not find freelancer profile for user with record ID ${req.query.loggedInUserRecordId}`
        );
        // Prompt the client to create a profile via POST
        res.status(404).send("Freelancer profile not found");
        return;
      }

      const { data: freelancerProfile } = await getDataFromAirtable({
        tableName: "Freelancer Profile",
        filterByFormula: `{Record ID} = "${user[0]["Freelancer Profile"][0]}"`,
        view: "Grid view",
      });

      const { data: projects } = await getDataFromAirtable({
        tableName: "Projects",
        filterByFormula: `{Record ID (from Freelancer)} = "${req.query.loggedInUserRecordId}"`,
        view: "Grid view",
      });

      freelancerProfile[0]["Projects"] = projects;

      res.json(freelancerProfile);

      break;
    }
    case "POST": {
      const fields = req.body.fields;
      if (!fields) {
        res.status(400).send("Bad Request");
        return;
      }

      base("Freelancer Profile").create(
        [
          {
            fields,
          },
        ],
        function (err: any, records: any) {
          if (err) {
            console.error(err);
            res.status(500).send("Error updating profile");
            return;
          }
          res.json([records[0].fields]);
        }
      );

      break;
    }
    case "PATCH": {
      const fields = req.body.fields;
      if (!fields || !req.query.recordId) {
        res.status(400).send("Bad Request");
        return;
      }

      base("Freelancer Profile").update(
        [
          {
            id: req.query.recordId,
            fields,
          },
        ],
        function (err: any, records: any) {
          if (err) {
            console.error(err);
            res.status(500).send("Error updating profile");
            return;
          }
          res.json(records[0].fields);
        }
      );

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
