import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButtom = ({ callBack }) => (
  <StyledStartButton onClick={callBack}>Start Game</StyledStartButton>
);

export default StartButtom;
