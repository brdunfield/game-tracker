import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Container from "../components/container";
import APISearch from "../components/search/api-search";

const AddGame = (props) => {
  const [gameData, setGameData] = useState(null);
  const [coverURL, setCoverURL] = useState("");

  useEffect(() => {
    // get image for cover
    console.log(gameData);
    const fetchCover = async () => {
      await fetch("/api/cover-image?gameID=" + gameData.id)
      .then(response => response.json())
      .then(data => {
        setCoverURL(data.imgURL);
      })
    }
    if (gameData)
      fetchCover();

  });

  // set select Element
  const optionArray = gameData ? gameData.platforms.map((platform) => {
    return (
      <option key={platform} value={platform}>{platform}</option>
    )
  }) : "";

  return (
    <Container title="Add a Game">
      <div>
        <APISearch onGameSelect={setGameData}></APISearch>
      </div>
      {coverURL ? (
        <div>
          <Image src={coverURL} alt="Game Cover Image" width="130" height="185" layout="fixed" />
          <h3>{gameData.name}</h3>
        </div>
      ) : ""}
      <form method="post" action="/api/add-game">
        <label htmlFor="platform">Platform:</label>
        <select id="platform" name="platform" >
          {optionArray}
        </select>
        <input type="hidden" id="id" name="id" value={gameData.id} />
        <input type="hidden" id="title" name="title" value={gameData.name} />
        <input type="hidden" id="artwork" name="artwork" value={coverURL} />

        <input type="submit" value="Submit"></input>
      </form>
    </Container>
  )
};

export default AddGame;