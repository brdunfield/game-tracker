const SearchCard = (props) => {
  const {data, selectGame} = props;
  return (
    <div>
      <p onClick={() => selectGame(data.id)}>{data.name}</p>
    </div>
  )
};

export default SearchCard;