import Container from "../components/container";
import Airtable from "airtable";

const Games = (props) => {
  const {games} = props;

  const gameEles = games.map((game) => {
    return (
      <li key={game.id}>
        <img src={game.artwork} alt={game.title + " Cover Image"}/>
        <span>{game.title}</span>
      </li>
    )
  })
  
  return (
    <Container title="Games">
      <div>
        <ul>{gameEles}</ul>
      </div>
        
    </Container>
  )
};

export const getServerSideProps = async() => {
  
  let games = await getGames();

  return {
    props: {games: games}, // will be passed to the page component as props
  }
}

const getGames = async () => {
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

  const records = await base('games').select().all();
  const games = records.map(record => {
    let game = {
      id: record.get("ID"),
      title: record.get("Title"),
      platform: record.get("Platform"),
      artwork: record.get("Artwork"),
      status: record.get("Status")
    }
    return game;
  });
  return games;
  /*
  .eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    console.log(games);

    records.forEach(function(record) {
      console.log('Retrieved', record.get('Title'));
      games.push(record)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
    console.log(games);
    return games;
  });
  console.log(gamesList.length);
  return gamesList;
  */
 return records;
}

// TODO Check if an unexpired token exists. If not, generate one, and then store it in the "db"

export default Games;