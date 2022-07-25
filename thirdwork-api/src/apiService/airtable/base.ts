import Airtable from "airtable";
import { AIRTABLE_BASE_ID } from "src/constants";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID
);

export default base;
