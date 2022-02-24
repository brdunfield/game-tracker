export default async function handler(req, res) {
  const body = req.query;
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
