import Dates from "./Dates";
import { TaskListInstance } from "./Workflow";

export interface TaskListItem {
  taskListFromAirtable: TaskListInstance;
  dates: Dates;
  "N Dates": string[];
}
