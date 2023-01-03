import { generateNewToken } from "../../lib/util";

const searchIGDB = async(gameId, token) => {
  console.log("https://api.igdb.com/v4/games/" + gameId +"?fields=platforms")
  const gameData = await fetch("https://api.igdb.com/v4/games/" + gameId +"?fields=platforms", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': 'Bearer ' + token
    }
  }).then(response => response.json())
    .then(async (data) => {
      // if token has expired or does not exist
      if (data.message && data.message.includes("Authorization Failure")) {
        // regenerate and retry
         const newToken = await generateNewToken();
         const retryGameData = await searchIGDB(gameName, newToken);
         return retryGameData;
      }
      return data;
    })
  return gameData[0].platforms;
}

export default async function handler(req, res) {
  const body = req.query;
  const gameData = await searchIGDB(body.id, body.token);
  res.status(200).json(gameData)
}