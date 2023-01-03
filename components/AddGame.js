import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Container from "../components/Container";
import APISearch from "../components/search/ApiSearch";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;x
`;
const PlatformSelect = styled.select`
  min-width: 100px;
  margin: 0 2rem;;
`;
const GameTitle = styled.h3`
  display: inline-block;
  margin-left: 1rem;
`;

const AddGame = (props) => {
  const {token} = props;
  
  const [gameData, setGameData] = useState(null);
  const [gameExtraData, setGameExtraData] = useState({coverURL: "", platforms: []});
  const [platform, setPlatform] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // get image for cover
    const fetchDBData = async () => {
      console.log("render")
      // cover URL
      const imgURL = await fetch("/api/cover-image?gameID=" + gameData.id + "&token=" + token)
        .then(response => response.json())
        .then(data => {
          return data.imgURL
          //setCoverURL(data.imgURL);
        });
      // platform names
      const platformData = "(" + gameData.platforms.toString() + ")";
      const platformNames = await fetch("/api/platform-search?platforms=" + platformData + "&token=" + token)
        .then(response => response.json())
        .then(data => {
          return data.platforms;
        });
      
      setGameExtraData({
        coverURL: imgURL,
        platforms: platformNames
      });
      setPlatform(platformNames[0].name);
    };

    if (gameData) {
      fetchDBData();
    };

  }, [gameData]);

  // set select Element
  const changePlatform = (e) => {
    setPlatform(e.target.value);
  }
  const optionArray = gameData && gameExtraData.platforms.length > 0 ? gameData.platforms.map((platform) => {
    const name = gameExtraData.platforms.filter(pName => pName.id == platform)[0].name;
    return (
      <option key={platform} value={name}>{name}</option>
    )
  }) : "";

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(platform);
    // submit data
    let body = {
      id: gameData.id,
      title: gameData.name,
      artwork: gameExtraData.coverURL,
      platform: platform
    }
    try {
      await fetch("/api/add-game", {
        method: 'POST',
        body: JSON.stringify(body)
      }).then(response => {
        if (response.status === 200) {
          return response.json();
        }
        else {
          throw new Error("HTTP status " + response.status);
        }
      }).then(data => {
        // console.log(data);
        router.push("/games")
      });
    } catch (err) {
      // todo display error on screen
      console.log(err);
    }
  }

  // use a handler instead of the setGameData function directly to clear the extra game data
  const updateGameData =  (gameData) => {
    setGameExtraData({coverURL: "", platforms: []});
    setGameData(gameData);
  };

  return (
    <Container title="Add a Game">
      <APISearch onGameSelect={updateGameData} token={token}></APISearch>
      {gameExtraData.coverURL ? (
        <Wrapper>
          <Image src={gameExtraData.coverURL} alt="Game Cover Image" width="130" height="185" layout="fixed" />
          <GameTitle>{gameData.name}</GameTitle>
        </Wrapper>
      ) : ""}
      {gameData ? (
        <form onSubmit={submitForm}>
          <label htmlFor="platform">Platform:</label>
          <PlatformSelect id="platform" name="platform" onChange={changePlatform}>
            {optionArray}
          </PlatformSelect>

          <button type="submit" >Submit</button>
        </form>
      ): ""}
    </Container>
  )
};

export default AddGame;