import getNewlyAddedTaskLists from ".";
import mockWorkflowObject from "../../../../mockResponses/mockWorkflowObject";

test("should return newly added task lists that do not already exist in the workflow", async () => {
  expect(
    getNewlyAddedTaskLists(
      ["Air", "Lodging"],
      mockWorkflowObject.selectedTaskLists.map((s) => s.Name)
    )
  ).toMatchObject(["Air", "Lodging"]);
  expect(
    getNewlyAddedTaskLists(
      ["Air", "Lodging", "Prospect"],
      mockWorkflowObject.selectedTaskLists.map((s) => s.Name)
    )
  ).toMatchObject(["Air", "Lodging"]);
  expect(
    getNewlyAddedTaskLists(
      ["Air", "Onboarding", "Lodging", "Prospect"],
      mockWorkflowObject.selectedTaskLists.map((s) => s.Name)
    )
  ).toMatchObject(["Air", "Lodging"]);
  expect(
    getNewlyAddedTaskLists(
      ["Onboarding", "Lodging", "Prospect"],
      mockWorkflowObject.selectedTaskLists.map((s) => s.Name)
    )
  ).toMatchObject(["Lodging"]);
  expect(
    getNewlyAddedTaskLists(
      ["Onboarding", "Prospect"],
      mockWorkflowObject.selectedTaskLists.map((s) => s.Name)
    )
  ).toMatchObject([]);
  expect(
    getNewlyAddedTaskLists(
      [],
      mockWorkflowObject.selectedTaskLists.map((s) => s.Name)
    )
  ).toMatchObject([]);
  expect(getNewlyAddedTaskLists([], [])).toMatchObject([]);
  expect(
    getNewlyAddedTaskLists(["Air", "Lodging", "Prospect"], [])
  ).toMatchObject(["Air", "Lodging", "Prospect"]);
});
