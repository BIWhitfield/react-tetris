import styled from "styled-components";
import bgImage from "../../img/bg.png";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
  padding-top: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pixel, Arial, Helvetica, sans-serif;
`;

export const StyledTetris = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
