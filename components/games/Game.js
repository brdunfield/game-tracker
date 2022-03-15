import styles from '../../styles/games.module.css';
import GameStatus from "./GameStatus";

const Game = (props) => {
  const { game } = props;
  // name, id, artwork, platform, status

  return (
    <tr>
      <td className={styles.artwork}>
        <img src={game.artwork} alt={game.name + " Cover Image"}/>
      </td>
      <td className={styles.gameName}><strong>{game.name}</strong></td>
      <td className={styles.platform}>{game.platform}</td>
      <GameStatus status={game.status} airtableID={game.airtableID}></GameStatus>
    </tr>
  )
};

export default Game;