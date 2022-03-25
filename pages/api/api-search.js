import { generateNewToken } from "../../lib/util";

const searchIGDB = async(gameName, token) => {
  const gameData = await fetch("https://api.igdb.com/v4/games?search=" + gameName +"&fields=name,cover,platforms,genres,id", {
    method: 'POST',
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
        console.log("generating new token")
         const newToken = await generateNewToken();
         const retryGameData = await searchIGDB(gameName, newToken);
         return retryGameData;
      }
      return data;
    })
  return gameData
}

export default async function handler(req, res) {
  const body = req.query;
  const gameData = await searchIGDB(body.name, body.token);
  res.status(200).json(gameData)
}