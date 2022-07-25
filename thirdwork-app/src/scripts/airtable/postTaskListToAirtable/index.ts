import { cloneDeep } from "lodash";
import moment from "moment";
import { TaskListItem } from "../../../types/TaskList";
import getLoggedInUserRecordID from "../../misc/getLoggedInUserRecordID";
import base from "../base";

const postTaskListToAirtable = async (
  workflowRecordID: string,
  taskList: TaskListItem
): Promise<any> =>
  new Promise((resolve, reject) => {
    const clonedTaskListFromAirtable = cloneDeep(taskList.taskListFromAirtable);
    // Delete computed fields
    delete clonedTaskListFromAirtable["Record ID"];
    delete clonedTaskListFromAirtable["Workflow ID"];

    base("Task List Instances").create(
      [
        {
          fields: {
            ...clonedTaskListFromAirtable,
            "Travel Agent": [getLoggedInUserRecordID()],
            Workflow: [workflowRecordID],
            "Consultation Date": taskList.dates.consultationDate,
            "Onboarding Date": taskList.dates.onboardingDate,
            "Deposit Date": taskList.dates.depositDate,
            "Final Payment Date": taskList.dates.finalPaymentDate,
            "Departure Date": taskList.dates.departureDate,
            "Return Date": taskList.dates.returnDate,
            "Start Date": moment().format("YYYY-MM-DD"),
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

export default postTaskListToAirtable;
