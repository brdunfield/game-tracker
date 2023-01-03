import Airtable from "airtable";

export const generateNewToken = async () => {
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

  const records = await base('token').select().all();
  // if there is a record delete it
  if (records.length > 0) {
    let recordID = records[0].id;
    const deleted = await base('token').destroy([recordID])
      .then(deletedRecords => {
        //console.log(deletedRecords);
        return deletedRecords;
      }).catch(err => {
        console.error(err);
      });
  }
  // Generate new token
  // generate a new token
  const token = await fetch("https://id.twitch.tv/oauth2/token?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&grant_type=client_credentials", {
    method: 'POST'
  }).then(response => response.json())
    .then(data => {
      return data;
    })
  // save token to AirTable
  const savedToken = await base('token').create([
      {
        "fields": {
          "Token": token.access_token
        }
      }
    ]).then(records => {
      return records[0].get("Token");
    }).catch((err) => {
      console.error(err);
      return "";
    });
  if (savedToken)
    return savedToken;
};

export const getToken = async () => {
  // get token from airtable
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);
  const records = await base('token').select().all();
  
  const token = records.length ? records[0].get("Token") : "";

  return token;
}