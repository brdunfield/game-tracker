import React, { useEffect, useState } from 'react';
import SearchCard from "./SearchCard";
import styles from '../../styles/search.module.css'

const APISearch = (props) => {
  const {onGameSelect} = props;

  const [searchValue, setSearchValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (searchValue) {
        await fetch("/api/api-search?name=" + searchValue)
          .then(response => response.json())
          .then(data => {
            //console.log(data)
            setResults(data);
            setModalVisible(true);
          });
      } else {
        setResults([]);
      }
    }

    // Only fire search events when the user hasn't typed in awhile, to preserve API rate limits
    const timer = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timer)

  }, [searchValue])

  const [results, setResults] = useState([]);

  const selectGame = (gameID) => {
    setModalVisible(false);
    onGameSelect(results.filter(game => game.id == gameID)[0]);
  }
  const cards = results.map((r) => {
    return (
      <SearchCard key={r.id} data={r} selectGame={selectGame}></SearchCard>
    )
  });

  return (
    <>
      <label htmlFor="api-search">Title Search:</label>
      <input type="search" id="api-search" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
      { modalVisible ? (
        <div className={styles.modal}>
          {cards}
        </div>
      ) : ""}

    </>
  )
}

export default APISearch;