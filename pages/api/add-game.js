import Airtable from "airtable";

export default async function handler(req, res) {
  const gameData = JSON.parse(req.body);
  console.log(gameData);
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

  const newRecord = await base('games').create([
    {
      "fields": {
        "ID": parseInt(gameData.id),
        "Title": gameData.title,
        "Platform": parseInt(gameData.platform),
        "Artwork": gameData.artwork,
        "Status": "Not Started"
      }
    }
  ], function done(err, records) {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
    res.status(200).json(records);
    return records;
  });
  console.log(newRecord);
  res.status(200);
}
