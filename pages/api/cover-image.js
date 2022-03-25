export default async function handler(req, res) {
  const id = req.query.gameID,
    token = req.query.token

  // no recursive attempt here because it's unlikely this token will be invalid as this is
  // a secondary request
  await fetch("https://api.igdb.com/v4/covers", {
    method: 'POST',
    body: `fields image_id; where game=` + id + `;`,
    headers: {
      'Content-Type': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': 'Bearer ' + token
    }
  }).then(response => response.json())
    .then(data => {
      //console.log(data);
      let imgURL = 'https://images.igdb.com/igdb/image/upload/t_cover_med/' + data[0].image_id + ".jpg";
      res.status(200).json({'imgURL' : imgURL})
    });
}
