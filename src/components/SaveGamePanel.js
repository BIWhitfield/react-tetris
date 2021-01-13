import React, { useState } from "react";
import { StyledSaveGame } from "./styles/StyledSaveGame";
import StartButton from './StartButton';

const SaveGamePanel = ({ handleSave }) => {
  const [name, setName] = useState("");

  return (
    <StyledSaveGame>
      <p style={{ color: "#fff" }}>Save your game?</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <StartButton
        callBack={() => handleSave({ answer: "yes", name })}
        text="Yes"
      />
      <StartButton
        callBack={() => handleSave({ answer: "no" })}
        text="No"
      />
    </StyledSaveGame>
  );
};

export default SaveGamePanel;
