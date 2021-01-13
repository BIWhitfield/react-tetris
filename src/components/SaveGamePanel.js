import React, { useState } from "react";
import { StyledSaveGame } from "./styles/StyledSaveGame";
import StartButton from './StartButton';

const SaveGamePanel = ({ handleSave }) => {
  const [name, setName] = useState("");

  return (
    <StyledSaveGame>
      <p style={{ color: "#fff" }}>Input your name to save your game...</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <StartButton
        callBack={() => handleSave({ answer: "yes", name })}
        text="Save"
      />
      <StartButton
        callBack={() => handleSave({ answer: "no" })}
        text="No"
      />
    </StyledSaveGame>
  );
};

export default SaveGamePanel;
