const getLoggedInUserRecordID = () =>
  (window as any)?.logged_in_user?.airtable_record_id || "recdpqPl4MNePyrsN";

export default getLoggedInUserRecordID;
