export default async function handler(req, res) {
  const platforms = req.query.platforms.toString(),
    token = req.query.token;
  
  // no recursive attempt here because it's unlikely this token will be invalid as this is
  // a secondary request
  await fetch("https://api.igdb.com/v4/platforms", {
    method: 'POST',
    body: `fields name; where id=` + platforms + `;`,
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': 'Bearer ' + token
    }
  }).then(response => response.json())
    .then(data => {
      res.status(200).json({'platforms' : data})
    }).catch (err => {
      console.log(JSON.stringify(err));
    })
}
