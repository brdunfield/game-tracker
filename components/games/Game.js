import styled from 'styled-components';
import styles from '../../styles/games.module.css';
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
const Edit = styled.button`
  cursor: pointer;
  height: 2rem;
  background: none;
  border: none;
`;

const Game = (props) => {
  const { game } = props;
  // name, id, artwork, platform, status

  return (
    <Card>
      <td><Edit><FontAwesomeIcon icon={faPen} color="white" /></Edit></td>
      <td className={styles.artwork}>
        <img src={game.artwork} alt={game.name + " Cover Image"}/>
      </td>
      <td className={styles.gameName}><GameName><strong>{game.name}</strong></GameName></td>
      <td className={styles.platform}><Platform>{game.platform}</Platform></td>
      <GameStatus status={game.status} airtableID={game.airtableID}></GameStatus>
    </Card>
  )
};

export default Game;