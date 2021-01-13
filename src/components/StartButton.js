import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButtom = ({ callBack, text }) => (
  <StyledStartButton onClick={callBack}>{text}</StyledStartButton>
);

export default StartButtom;
