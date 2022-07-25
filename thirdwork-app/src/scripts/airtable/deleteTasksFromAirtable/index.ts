import base from "../base";

const deleteTasksFromAirtable = async (taskIds: string[]) =>
  new Promise<void>((resolve, reject) => {
    base("Task Instances").destroy(taskIds, function (err, deletedRecords) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log("Deleted", deletedRecords?.length, "records");
      resolve();
    });
  });

export default deleteTasksFromAirtable;
