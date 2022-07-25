import base from "../base";
import Dates from "../../../types/Dates";

const updateTaskListInAirtable = async (
  taskListId: string,
  dates: Dates
): Promise<any> =>
  new Promise((resolve, reject) => {
    base("Task List Instances").update(
      [
        {
          id: taskListId,
          fields: {
            "Consultation Date": dates.consultationDate,
            "Onboarding Date": dates.onboardingDate,
            "Deposit Date": dates.depositDate,
            "Final Payment Date": dates.finalPaymentDate,
            "Departure Date": dates.departureDate,
            "Return Date": dates.returnDate,
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

export default updateTaskListInAirtable;
