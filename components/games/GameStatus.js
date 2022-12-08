import styles from '../../styles/games.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const GameStatus = (props) => {
  const {status, airtableID} = props;
  const router = useRouter();

  const handleStatusUpdate = async (e) => {
    console.log("updating status to: " + e.target.value);

    const body = {
      "airtableID": airtableID,
      "fields": {
        "Status": e.target.value,
        "Date": new Date().toISOString().substring(0,10),
      }
    }

    const resp = await fetch("/api/update-game", {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        router.reload(window.location.pathname);
      })
  }

  const selectEle = (
    <select value={status} onChange={handleStatusUpdate}>
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