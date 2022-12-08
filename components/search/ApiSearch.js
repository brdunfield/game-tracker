import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchCard from "./SearchCard";
import styles from '../../styles/search.module.css';

const Label = styled.label`
  margin-right: 2em;
`;

const APISearch = (props) => {
  const {onGameSelect, token} = props;

  const [searchValue, setSearchValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (searchValue) {
        await fetch("/api/api-search?name=" + searchValue + "&token=" + token)
          .then(response => response.json())
          .then(data => {
            //console.log(data);
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
    <div>
      <Label htmlFor="api-search">Title Search:</Label>
      <input type="search" id="api-search" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
      { modalVisible ? (
        <div className={styles.modal}>
          {cards}
        </div>
      ) : ""}

    </div>
  )
}

export default APISearch;