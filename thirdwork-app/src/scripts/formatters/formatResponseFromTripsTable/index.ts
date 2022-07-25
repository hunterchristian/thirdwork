export const formatResponseFromTripsTable = (
  workflowResponse: any[],
  clientsResponse: any[],
  taskListsResponse: any[],
  taskTemplatesResponse: any[]
) => {
  const tripName = workflowResponse[0]["Trip Name"] || "";

  const clientInWorkflow = workflowResponse[0]["Client"]
    ? workflowResponse[0]["Client"][0]
    : null;
  const selectedClient = clientsResponse.find(
    (c: any) => c["Record ID"] === clientInWorkflow
  );

  const location = {
    description: workflowResponse[0]["Arrival City"] || "",
    structured_formatting: {
      main_text: workflowResponse[0]["Arrival City"] || "",
      secondary_text: "",
      main_text_matched_substrings: [],
    },
  };

  const locationCoordinates = {
    lat: workflowResponse[0]["Latitude"],
    lng: workflowResponse[0]["Longitude"],
  };

  const selectedTaskLists = taskListsResponse.filter((t: any) =>
    workflowResponse[0]["Task Lists"].includes(t["Record ID"])
  );

  let departureDate = null;
  if (workflowResponse[0]["Trip Start Date"]) {
    departureDate = workflowResponse[0]["Trip Start Date"];
  }

  let returnDate = null;
  if (workflowResponse[0]["Trip End Date"]) {
    returnDate = workflowResponse[0]["Trip End Date"];
  }

  const totalTravellerCount = workflowResponse[0]["Total Traveller Count"];

  const notes = workflowResponse[0]["Notes"];

  return {
    tripName,
    selectedClient,
    location,
    locationCoordinates,
    selectedTaskLists,
    departureDate,
    returnDate,
    totalTravellerCount,
    notes,
    airtableRecordData: workflowResponse[0],
    clients: clientsResponse,
    taskTemplates: taskTemplatesResponse,
  };
};
