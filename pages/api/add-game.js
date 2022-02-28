import Airtable from "airtable";

export default async function handler(req, res) {
  const gameData = JSON.parse(JSON.stringify(req.body));
  console.log(gameData);
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

  base('games').create([
    {
      "fields": {
        "ID": parseInt(gameData.id),
        "Title": gameData.title,
        "Platform": parseInt(gameData.platform),
        "Artwork": gameData.artwork,
        "Status": "Not Started"
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
  res.status(200);
  /*
  

  //console.log(body.name);
  await fetch("https://api.igdb.com/v4/games?search=" + body.name +"&fields=name,cover,platforms,genres,id", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': 'Bearer ' + process.env.AUTH_TOKEN
    }
  }).then(response => response.json())
    .then(data => {
      //console.log(data);
      res.status(200).json(data)
    })

  /*res.status(200).json([{
    "id": 1025,
    "name": "Zelda II: The Adventure of Link"
  }])*/
}
