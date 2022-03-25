import Container from "../components/Container";
import Airtable from "airtable";
import Game from "../components/games/Game";

const Games = (props) => {
  const {games} = props;
  console.log(games.length);

  const gameEles = games.map((game) => {
    return (
      <Game
        key={game.id}
        game={game}
      ></Game>
    )
  })
  
  return (
    <Container title="Game List">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Platform</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{gameEles}</tbody>   
      </table>    
    </Container>
  )
};

export const getServerSideProps = async() => {
  console.log("Get Server Side Props is running")
  let games = await getGames();
  console.log(games.length);

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
      name: record.get("Title"),
      platform: record.get("Platform"),
      artwork: record.get("Artwork"),
      status: record.get("Status"),
      airtableID: record.id
    }
    return game;
  });
  return games;

}

// TODO Check if an unexpired token exists. If not, generate one, and then store it in the "db"

export default Games;