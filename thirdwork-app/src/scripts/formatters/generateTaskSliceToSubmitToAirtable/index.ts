import { cloneDeep } from "lodash";
import moment from "moment";
import Dates from "../../../types/Dates";

export default function* generateTaskSliceToSubmitToAirtable(
  tasks: any,
) {
  const clonedTasks = cloneDeep(tasks);
  for (let i = 0; i < clonedTasks.length; i += 10) {
    const tasksSlice = clonedTasks
      .slice(i, Math.min(i + 10, clonedTasks.length))
      // @ts-ignore
      .map((t: Record<string, any>) => {
        delete t["Stage Ordinal"];
        delete t["Stage Color"];

        return t;
      });

    if (tasksSlice.length > 0) {
      yield tasksSlice;
    }
  }
}
