import { Task } from "../components/TaskDetailsModal";
import { API_URL } from "../constants";
import getJWTToken from "./getJWTToken";
import axios from "axios";
import { cloneDeep } from "lodash";

const updateTaskInstanceInAirtable = async (
  task: Task,
  userSpecifiedDueDate?: string
): Promise<any> => {
  if (task["Due Date"] !== userSpecifiedDueDate) {
    task["Custom Due Date"] = userSpecifiedDueDate as string;
  }

  const clonedUpdatedFields = cloneDeep(task);
  // Delete computed fields
  // @ts-ignore
  delete clonedUpdatedFields["Start Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Consultation Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Onboarding Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Deposit Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Final Payment Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Departure Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Return Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Stage Ordinal"];
  // @ts-ignore
  delete clonedUpdatedFields["Stage Color"];
  // @ts-ignore
  delete clonedUpdatedFields["Record ID (from Travel Agent)"];
  // @ts-ignore
  delete clonedUpdatedFields["Record ID"];
  // @ts-ignore
  delete clonedUpdatedFields["Client Name"];
  // @ts-ignore
  delete clonedUpdatedFields["Trip Name"];
  // @ts-ignore
  delete clonedUpdatedFields["Due Date"];
  // @ts-ignore
  delete clonedUpdatedFields["Arrival City"];

  const response = await axios.patch(
    `${API_URL}/api/airtable/tasks?recordId=${
      task["Record ID"]
    }&jwtToken=${getJWTToken()}`,
    { fields: clonedUpdatedFields }
  );

  return response.data;
};

export default updateTaskInstanceInAirtable;
