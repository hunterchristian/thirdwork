const getLoggedInUserRecordID = () =>
  (window as any)?.logged_in_user?.airtable_record_id || "reck5328ZlEmTM9HC";

export default getLoggedInUserRecordID;
