import styles from '../../styles/search.module.css'

const SearchCard = (props) => {
  const {data, selectGame} = props;
  return (
    <div className={styles.game}>
      <p onClick={() => selectGame(data.id)}>{data.name}</p>
    </div>
  )
};

export default SearchCard;