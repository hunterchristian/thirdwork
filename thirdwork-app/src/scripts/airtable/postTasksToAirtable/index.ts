import Dates from "../../../types/Dates";
import getLoggedInUserRecordID from "../../misc/getLoggedInUserRecordID";
import base from "../base";

const postTasksToAirtable = async (
  workflowRecordID: string,
  taskListID: string,
  tasks: any[]
): Promise<{ fields: any }[]> =>
  new Promise((resolve, reject) => {
    base("Task Instances").create(
      tasks.map((t: any) => ({
        fields: {
          ...t,
          "Travel Agent": [getLoggedInUserRecordID()],
          Workflow: [workflowRecordID],
          "Task List Instance": [taskListID],
          Status: "Todo",
        },
      })),
      function (err: any, records: any) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(records);
      }
    );
  });

export default postTasksToAirtable;
