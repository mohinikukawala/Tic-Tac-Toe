import { useState } from "react";

const Player = ({name, symbol, isActive, savePlayers}) => {
    const[playerName, setPlayerName] = useState(name);
    const[isEditing, setIsEditing] = useState(false);
    let btnText = "Edit";
    let playerNameMarkup = <span className="player-name">{playerName}</span>;

    const onPlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    }

    const handleButtonClick = () => {
        setIsEditing(!isEditing);
        if(isEditing){
            savePlayers(symbol, playerName);
        }
    }

    if(isEditing){
        btnText = "Save";
        playerNameMarkup = <input value={playerName} onChange={onPlayerNameChange}></input>;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {playerNameMarkup}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButtonClick}> {btnText} </button>
          </li>
    )
}

export default Player;