export interface LocationCoordinates {
  lat: string;
  lng: string;
}

export interface TaskListInstance {
  Name: string;
  "Record ID": string;
  "Travel Agent": string[];
  "Consultation Date": string;
  "Onboarding Date": string;
  "Deposit Date": string;
  "Final Payment Date": string;
  "Departure Date": string;
  "Return Date": string;
  Workflow: string[];
  "Task Instances": string[];
  "Workflow ID": string;
  Description: string;
}

interface Workflow {
  tripName: string;
  selectedClient: any;
  location: any | null;
  locationCoordinates: LocationCoordinates | null;
  taskListInstances: TaskListInstance[];
  totalTravellerCount: number | string;
  notes: string;
  airtableRecordData: any;
  clients: any[];
  taskTemplates: any[];
}

export default Workflow;
