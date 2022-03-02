import Airtable from "airtable";

export default async function handler(req, res) {
  const gameData = JSON.parse(req.body);
  //console.log(gameData);
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

  await base('games').create([
    {
      "fields": {
        "ID": parseInt(gameData.id),
        "Title": gameData.title,
        "Platform": parseInt(gameData.platform),
        "Artwork": gameData.artwork,
        "Status": "Not Started"
      }
    }
  ]).then(records => {
    /*records.forEach(function (record) {
      console.log(record.getId());
    });
    */
    res.status(200).json(records);
  }).catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
}