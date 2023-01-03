import Airtable from "airtable";

export default async function handler(req, res) {
  const updateData = JSON.parse(req.body);

  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)
  
  await base('games').update([
    {
      "id": updateData.airtableID,
      "fields": updateData.fields
    }
  ]).then(records => {
    res.status(200).json({
      status: records[0].get("Status"),
      platform: records[0].get("Platform"),
      date: records[0].get("Date")
    });
  }).catch(err => {
    console.error(err);
  });
}