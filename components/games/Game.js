import styled from 'styled-components';
import styles from '../../styles/games.module.css';
import GameStatus from "./GameStatus";

const Card = styled.tr`
  background-color: purple;
`;

const Game = (props) => {
  const { game } = props;
  // name, id, artwork, platform, status

  return (
    <Card>
      <td className={styles.artwork}>
        <img src={game.artwork} alt={game.name + " Cover Image"}/>
      </td>
      <td className={styles.gameName}><strong>{game.name}</strong></td>
      <td className={styles.platform}><div>{game.platform}</div></td>
      <GameStatus status={game.status} airtableID={game.airtableID}></GameStatus>
    </Card>
  )
};

export default Game;