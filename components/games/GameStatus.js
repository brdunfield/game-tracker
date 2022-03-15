import styles from '../../styles/games.module.css';
import React, { useEffect, useState } from 'react';

const GameStatus = (props) => {
  const {status, airtableID} = props;

  const [newStatus, setNewStatus] = useState(status);

  const handleStatusUpdate = async (e) => {
    console.log("updating status to: " + e.target.value);

    const body = {
      airtableID: airtableID,
      fields: {
        "Status": e.target.value
      }
    }
    // set status before the fetch because for some reason it's being overwritten..
    // this whole fetch is not right, need to refactor. Too many weird things
    setNewStatus(e.target.value);
    await fetch("/api/update-game", {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 200)
        response.json();
      else {
        throw new Error("HTTP status " + response.status);
      }
    }).then(data => {
      // TODO - fix. not sure why data is undefined coming from the api...
      console.log("HELLO")
    })
  }

  const selectEle = (
    <select value={newStatus} onChange={handleStatusUpdate}>
      <option value="Not Started">Not Started</option>
      <option value="Started">Started</option>
      <option value="Beaten">Beaten</option>
    </select>
  )

  return (
    <td className={styles.statusCell}>
      <div className={styles.statusWrapper}>
        {selectEle}
      </div>
    </td>
  )
}

export default GameStatus;