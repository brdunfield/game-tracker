import Airtable from "airtable";

export default async function handler(req, res) {
  const gameData = JSON.parse(req.body);
  console.log(gameData);
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

  // check if record already exists
  // TODO check platform match and allow multiple
  await base('games').select({
    filterByFormula: "{ID} = " + parseInt(gameData.id),
    maxRecords: 1
  }).firstPage(async (err, resp) => {
    if (err)
      console.err(err);
    if (resp.length === 0) {
      // record does not exist - add it
      
      await base('games').create([
        {
          "fields": {
            "ID": parseInt(gameData.id),
            "Title": gameData.title,
            "Platform": gameData.platform,
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
    } else {
      res.status(400).json(resp);
    }
  });
}