import "@testing-library/jest-dom";
import { formatResponseFromTripsTable } from ".";
import MockWorkflowResponse from "../../../../mockResponses/Trips";
import MockClientsResponse from "../../../../mockResponses/Clients";
import MockTaskListsResponse from "../../../../mockResponses/TaskLists";
import MockTaskListTemplatesResponse from "../../../../mockResponses/TaskListTemplates";
import mockWorkflowObject from "../../../../mockResponses/mockWorkflowObject";

test("should format responses from Airtable into a Workflow object", async () => {
  expect(
    formatResponseFromTripsTable(
      MockWorkflowResponse.records.map((r) => r.fields),
      MockClientsResponse.records.map((r) => r.fields),
      MockTaskListsResponse.records.map((r) => r.fields),
      MockTaskListTemplatesResponse.records.map((r) => r.fields)
    )
  ).toMatchObject(mockWorkflowObject);
});
