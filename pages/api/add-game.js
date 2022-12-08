import Airtable from "airtable";

export default async function handler(req, res) {
  const gameData = JSON.parse(req.body);

  // TODO check platform match and allow multiple
  const respData = await createRecord(gameData);
  res.status(respData.status).json(respData.data);
}

const createRecord = async (gameData) => {
  // AirTable API does not return a promise so we wrap it in one
  return new Promise((resolve, reject) => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)
    base('games').select({
      filterByFormula: "{ID} = " + parseInt(gameData.id),
      maxRecords: 1
    }).firstPage(async (err, resp) => {
      if (err)
        console.err(err);
      if (resp.length === 0) {
        // record does not exist - add it
        const create = await base('games').create([
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
          //console.log(records);
          resolve({
            data: records,
            status: 200
          });
        }).catch((err) => {
          console.error(err);
          reject({
            data: err,
            status: 500
          });
        });
        return create;
      } else {
        resolve({
          data: resp,
          status: 400
        });
      }
    });
  });
}