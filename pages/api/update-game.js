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
    const newStatus = {
      status: records[0].get("Status")
    }
    res.status(200).json(JSON.stringify(newStatus));
  });
}