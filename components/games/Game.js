import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from '../../styles/games.module.css';
import { useRouter } from 'next/router';
import GameStatus from "./GameStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/fontawesome-svg-core/styles.css";

const Card = styled.tr`
  background-color: purple;
`;
const Platform = styled.div`
  font-size: .8rem;
`;
const GameName = styled.div`
  margin-right: 1rem;
`;
const EditButton = styled.button`
  cursor: pointer;
  height: 2rem;
  background: none;
  border: none;
`;

const Edit = styled.div`
  min-height: 3.5rem;
  margin: 1rem;
  background-color: white;
  color: black;
  padding: 1rem;
`;

const Game = (props) => {
  const { game, token } = props;
  const router = useRouter();
  // name, id, artwork, platform, status

  const [editing, setEditing] = useState(false);
  const [platforms, setPlatforms] = useState([{id: null, name: game.platform}]);
  const [platform, setPlatform] = useState(game.platform);
  const [dateISO, setDateISO ] = useState(game.date);

  useEffect(() => {
    const getGamePlatforms = async () => {
      const platformData = await fetch("/api/get-platforms?id=" + game.id + "&token=" + token)
        .then(response => response.json())
        .then(data => {
          return data;
        });

      
      // platform names
      const platformNames = await fetch("/api/platform-search?platforms=(" + platformData.toString() + ")&token=" + token)
        .then(response => response.json())
        .then(data => {
          return data.platforms;
        });
      setPlatforms(platformNames);
    }

    if (editing) getGamePlatforms();
  }, [editing])

  const optionArray = platforms.length > 0 ? platforms.map((platform) => {
    return (
      <option key={platform.id} value={platform.name}>{platform.name}</option>
    )
  }): "";

  const toggleEdit = () => {
    // TODO - make less hacky when I redo state

    // reload page if we're closing the edit
    if (editing)
      router.reload(window.location.pathname);

    setEditing(!editing);
  }

  const handlePlatformUpdate = async(newPlatform) => {
    setPlatform(newPlatform.target.value);
    console.log("updating platform to: " + newPlatform.target.value);

    const body = {
      "airtableID": game.airtableID,
      "fields": {
        "Platform": newPlatform.target.value,
      }
    }
    const resp = await fetch("/api/update-game", {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  };

  const handleDateUpdate = async() => {
    console.log("updating date to: " + dateISO);

    const date = new Date(dateISO).toISOString().substring(0,10)

    const body = {
      "airtableID": game.airtableID,
      "fields": {
        "Date": date,
      }
    }
    const resp = await fetch("/api/update-game", {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  }

  return (
    <Card>
      <td><EditButton onClick={toggleEdit}><FontAwesomeIcon icon={faPen} color="white" /></EditButton></td>
      <td className={styles.artwork}>
        <img src={game.artwork} alt={game.name + " Cover Image"}/>
      </td>
      <td className={styles.gameName}>
        <GameName><strong>{game.name}</strong></GameName>
        {editing ? (
          <Edit>
            <label>Game Date (yyyy-mm-dd): </label>
            <input type="text" defaultValue={game.date} onChange={(e) => setDateISO(e.target.value)}></input>
            <button onClick={handleDateUpdate}>Update</button>
          </Edit>
        ): ""}
      </td>
      <td className={styles.platform}>
        {editing ? (
          <select value={platform} onChange={handlePlatformUpdate}>{optionArray}</select>
        ) : (
          <Platform>{platform}</Platform>
        )}
      </td>
      <GameStatus status={game.status} airtableID={game.airtableID}></GameStatus>
    </Card>
  )
};

export default Game;