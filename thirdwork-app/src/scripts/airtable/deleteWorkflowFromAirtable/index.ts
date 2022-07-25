import base from "../base";

const deleteWorkFlowFromAirtable = async (workflowRecordId: string) =>
  new Promise<void>((resolve, reject) => {
    base("Trips").destroy([workflowRecordId], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log("Deleted", deletedRecords?.length, "records");
      resolve();
    });
  });

export default deleteWorkFlowFromAirtable;
