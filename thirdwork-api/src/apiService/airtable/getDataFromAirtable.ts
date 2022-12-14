import Airtable from "airtable";
import { AIRTABLE_BASE_ID } from "src/constants";

interface RequiredParams {
  tableName: string;
  filterByFormula?: string;
  view?: string;
  baseId?: string;
  sort?: { field: string; direction: "desc" | "asc" }[];
}

export default async function getDataFromAirtable({
  tableName,
  filterByFormula = "",
  view = "Grid View",
  baseId = AIRTABLE_BASE_ID,
  sort,
}: RequiredParams): Promise<{ data: any[] }> {
  const data = await new Promise<any[]>((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      baseId
    );

    const data: any[] = [];
    const selectOptions = {
      filterByFormula,
      view,
    };
    if (sort) {
      selectOptions.sort = sort;
    }

    base(tableName)
      .select(selectOptions)
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            data.push(record.fields);
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(data);
        }
      );
  });

  return { data };
}
