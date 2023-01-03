import styles from '../../styles/games.module.css';
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleHalfStroke, faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import "@fortawesome/fontawesome-svg-core/styles.css";

const GameStatus = (props) => {
  const {status, airtableID} = props;
  const router = useRouter();

  const [loading, setIsLoading] = useState(false)

  const handleStatusUpdate = async (newStatus) => {
    console.log("updating status to: " + newStatus);
    setIsLoading(true)

    const body = {
      "airtableID": airtableID,
      "fields": {
        "Status": newStatus,
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

  return (
    <td className={styles.statusCell}>
      <div className={styles.statusWrapper}>
        <Select status={status} onChange={handleStatusUpdate} loading={loading} />
      </div>
    </td>
  )
}

export default GameStatus;

const Options = styled.div`
  position: absolute;
  background-color: white;
  color: black;
  padding: .25rem 0;
  margin-left: -6rem;
`;

const CurrentStatus = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const Option = styled.span`
  display: inline-block;
  padding: 0 .5rem;
`;

const Select = (props) => {
  const { status, onChange, loading } = props;

  const [isOpen, setIsOpen ] = useState(false);

  const toggleIsOpen = () => {
    console.log("hello");
    setIsOpen(!isOpen);
  }

  const notStarted =  "#ff243d",
    started = "#ffd342",
    beaten = "#71ff42";

  const statusIcon = status === "Not Started" ? <FontAwesomeIcon icon={faCircleXmark} size="2x" color={notStarted}/>:
    ( status === "Started" ? <FontAwesomeIcon icon={faCircleHalfStroke} size="2x" color={started} /> :
    <FontAwesomeIcon icon={faCircleCheck} size= "2x" color={beaten} /> );

  return (
    <>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" size="2x" color="white" />
      ) : (
        <>
          <CurrentStatus onClick={toggleIsOpen}>{statusIcon}</CurrentStatus>
          {isOpen ? (
            <Options>
              <Option onClick={() => onChange("Not Started")}>{<FontAwesomeIcon icon={faCircleXmark} size="2x" color={notStarted}/>}</Option>
              <Option onClick={() => onChange("Started")}><FontAwesomeIcon icon={faCircleHalfStroke} size="2x" color={started} /></Option>
              <Option onClick={() => onChange("Beaten")}><FontAwesomeIcon icon={faCircleCheck} size="2x" color={beaten} /></Option>
            </Options>
          ) : ""}
        </>
      )}

    </>
  )
}