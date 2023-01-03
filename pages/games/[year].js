import React from 'react';
import styled from 'styled-components';
import Container from "../../components/Container";
import Airtable from "airtable";
import Game from "../../components/games/Game";
import Tabs from "../../components/UI/Tabs";

const Table = styled.table`
  border-spacing: 0 .25rem;
`;

const Games = (props) => {
  const {games, year} = props;

  let years = ["All"];
  let currentYear = new Date().getFullYear();

  for (let y = 2020; y <= currentYear; y++) {
    years.push(y);
  }

  const beatenGames = games.filter(game => game.status === "Beaten").length;
  const startedGames = games.filter(game => game.status === "Started").length;

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
      <Tabs years={years} selected={year}/>
      <p>Beaten games: {beatenGames}</p>
      <p>Started but not beaten games: {startedGames}</p>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Title</th>
            <th>Platform</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{gameEles}</tbody>   
      </Table>    
    </Container>
  )
};

export const getServerSideProps = async(context) => {
  const year = context.query.year;
  let games = await getGames(year);

  return {
    props: {games: games, year: year}, // will be passed to the page component as props
  }
}

const getGames = async (year) => {
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

  const records = await base('games').select().all();
  const games = records.map(record => {
    let game = {
      id: record.get("ID"),
      name: record.get("Title"),
      platform: record.get("Platform"),
      artwork: record.get("Artwork"),
      status: record.get("Status"),
      date: record.get("Date") || null,
      airtableID: record.id
    }
    return game;
  });
  if (year === "All") return games;
  const currentYearGames = games.filter(game => {
    if (!game.date) return false;
    let gameDate = new Date(game.date);
    return (gameDate.getFullYear().toString() === year);
  });
  return currentYearGames;
}

// TODO Check if an unexpired token exists. If not, generate one, and then store it in the "db"

export default Games;