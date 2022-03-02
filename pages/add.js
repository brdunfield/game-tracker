import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import Container from "../components/Container";
import APISearch from "../components/search/ApiSearch";

const AddGame = (props) => {
  const [gameData, setGameData] = useState(null);
  const [coverURL, setCoverURL] = useState("");
  const [platform, setPlatform] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // get image for cover
    const fetchCover = async () => {
      await fetch("/api/cover-image?gameID=" + gameData.id)
      .then(response => response.json())
      .then(data => {
        setCoverURL(data.imgURL);
      })
    }
    if (gameData) {
      fetchCover();
      if (!platform)
        setPlatform(gameData.platforms[0]);
    }

  }, [gameData, platform]);

  // set select Element
  const changePlatform = (e) => {
    setPlatform(e.target.value);
  }
  const optionArray = gameData ? gameData.platforms.map((platform) => {
    return (
      <option key={platform} value={platform}>{platform}</option>
    )
  }) : "";

  const submitForm = async (e) => {
    e.preventDefault();
    // submit data
    let body = {
      id: gameData.id,
      title: gameData.name,
      artwork: coverURL,
      platform: platform
    }
    await fetch("/api/add-game", {
        method: 'POST',
        body: JSON.stringify(body)
      }).then(response => response.json())
      .then(data => {
        // TODO if error do not push
        router.push("/games");
      });
  }

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
      <form onSubmit={submitForm}>
        <label htmlFor="platform">Platform:</label>
        <select id="platform" name="platform" onChange={changePlatform}>
          {optionArray}
        </select>

        <button type="submit" >Submit</button>
      </form>
    </Container>
  )
};

export default AddGame;