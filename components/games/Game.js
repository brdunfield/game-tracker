import styles from '../../styles/games.module.css';

const Game = (props) => {
  const { game } = props;
  // name, id, artwork, platform, status

  return (
    <tr>
      <td className={styles.artwork}>
        <img src={game.artwork} alt={game.name + " Cover Image"}/>
      </td>
      <td>{game.name}</td>
      <td>{game.platform}</td>
      <td>{game.status}</td>
    </tr>
  )
};

export default Game;