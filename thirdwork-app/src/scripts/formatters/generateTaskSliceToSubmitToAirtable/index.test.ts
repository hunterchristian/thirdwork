import "@testing-library/jest-dom";
import generateTaskSliceToSubmitToAirtable from ".";
import MockWorkflowResponse from "../../../../mockResponses/Trips";
import MockClientsResponse from "../../../../mockResponses/Clients";
import MockTaskListsResponse from "../../../../mockResponses/TaskLists";
import MockTaskListTemplatesResponse from "../../../../mockResponses/TaskListTemplates";
import mockWorkflowObject from "../../../../mockResponses/mockWorkflowObject";
import moment from "moment";

test("should generate 10 tasks in a task slice", async () => {
  const taskSliceGenerator = generateTaskSliceToSubmitToAirtable(
    mockWorkflowObject.taskTemplates,
    {
      departureDate: "DEPARTURE_DATE",
      returnDate: "RETURN_DATE",
    }
  );
  expect(taskSliceGenerator.next().value?.length).toBe(10);
  expect(taskSliceGenerator.next().value?.length).toBe(10);
  expect(taskSliceGenerator.next().value?.length).toBe(10);
});

test("should delete computed fields from tasks", async () => {
  expect(
    generateTaskSliceToSubmitToAirtable(mockWorkflowObject.taskTemplates, {
      departureDate: "DEPARTURE_DATE",
      returnDate: "RETURN_DATE",
    }).next().value[0]["Stage Ordinal"]
  ).toBeFalsy();
  expect(
    generateTaskSliceToSubmitToAirtable(mockWorkflowObject.taskTemplates, {
      departureDate: "DEPARTURE_DATE",
      returnDate: "RETURN_DATE",
    }).next().value[0]["Stage Color"]
  ).toBeFalsy();
});

test("should specify dates on tasks correctly", async () => {
  expect(
    generateTaskSliceToSubmitToAirtable(mockWorkflowObject.taskTemplates, {
      departureDate: "DEPARTURE_DATE",
      returnDate: "RETURN_DATE",
    }).next().value[0]["Departure Date"]
  ).toBe("DEPARTURE_DATE");
  expect(
    generateTaskSliceToSubmitToAirtable(mockWorkflowObject.taskTemplates, {
      departureDate: "DEPARTURE_DATE",
      returnDate: "RETURN_DATE",
    }).next().value[0]["Return Date"]
  ).toBe("RETURN_DATE");
  expect(
    generateTaskSliceToSubmitToAirtable(mockWorkflowObject.taskTemplates, {
      departureDate: "DEPARTURE_DATE",
      returnDate: "RETURN_DATE",
    }).next().value[0]["Start Date"]
  ).toBe(moment().format("YYYY-MM-DD"));
});
