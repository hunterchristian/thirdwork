import base from "../base";
import moment from "moment";
import queryParams from "../../misc/queryParams";
import getLoggedInUserRecordID from "../../misc/getLoggedInUserRecordID";
import { TaskListItem } from "../../../types/TaskList";

const updateWorkflowInAirtable = async (
  tripName: string,
  selectedClient: any,
  location: any,
  locationCoordinates: any,
  totalTravellerCount: number,
  notes: any
): Promise<any> =>
  new Promise((resolve, reject) => {
    base("Trips").update(
      [
        {
          id: queryParams.recordId,
          fields: {
            "Trip Name": tripName,
            Client: selectedClient ? [selectedClient["Record ID"]] : [],
            "Arrival City": location?.description || "",
            "Trip Start Date": null,
            "Trip End Date": null,
            "Travel Agent": [getLoggedInUserRecordID()],
            Latitude: locationCoordinates
              ? locationCoordinates.lat.toString()
              : "",
            Longitude: locationCoordinates
              ? locationCoordinates.lng.toString()
              : "",
            "Total Traveller Count": totalTravellerCount,
            Notes: notes,
          },
        },
      ],
      function (err: any, records: any) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(records[0].fields);
      }
    );
  });

export default updateWorkflowInAirtable;
