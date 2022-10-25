import React, { useState } from 'react';
import styled from 'styled-components';
import Container from "../components/Container";
import Airtable from "airtable";
import Game from "../components/games/Game";
import Tabs from "../components/UI/Tabs";

const Table = styled.table`
  border-spacing: 0 1rem;
`;

const Games = (props) => {
  const {games} = props;

  let years = ["All"];
  let currentYear = new Date().getFullYear();

  for (let y = 2020; y <= currentYear; y++) {
    years.push(y);
  }

  const [year, setYear] = useState("All");

  const gameEles = games.map((game) => {
    if (year === "All" || game.year === year)
      return (
        <Game
          key={game.id}
          game={game}
        ></Game>
      )
  })
  
  return (
    <Container title="Game List">
      <Tabs years={years} selected={year} onChange={setYear}/>
      <Table>
        <thead>
          <tr>
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

export const getServerSideProps = async() => {
  let games = await getGames();

  return {
    props: {games: games}, // will be passed to the page component as props
  }
}

const getGames = async () => {
  console.log("running");
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

  const records = await base('games').select().all();
  const games = records.map(record => {
    let game = {
      id: record.get("ID"),
      name: record.get("Title"),
      platform: record.get("Platform"),
      artwork: record.get("Artwork"),
      status: record.get("Status"),
      year: record.get("Year") | null,
      airtableID: record.id
    }
    return game;
  });
  return games;

}

// TODO Check if an unexpired token exists. If not, generate one, and then store it in the "db"

export default Games;