import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

// Custom Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import Audio from "./Audio";
import SaveGamePanel from "./SaveGamePanel";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [pause, setPaused] = useState({
    isPaused: false,
    currentDropTime: dropTime,
  });
  const [saveYourGame, setSaveYourGame] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const [savedGameState, setSavedGameState] = useLocalStorageState(
    "react-tetris-game-state",
    {
      name: "",
      score,
      rows,
      level,
    }
  );

  const movePlayerLeftOrRight = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setIsAudioPlaying(true);
    setPaused({ isPaused: false, currentDropTime: null})
  };

  const handlePauseGame = () => {
    if (!pause.isPaused) {
      setPaused({ isPaused: true, currentDropTime: dropTime });
      setDropTime(null);
    } else {
      setDropTime(pause.currentDropTime);
      setPaused({ isPaused: false, currentDropTime: null });
    }
  };

  const handleSaveGame = ({ answer, name }) => {
    if (answer === "Save") {
      setSavedGameState({
        name,
        score,
        rows,
        level,
      });
      setSaveYourGame(false);
      setGameOver(false);
    } else {
      setStage(createStage());
      setSaveYourGame(false);
      setGameOver(false);
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    setDropTime(null);
    setPaused((prev) => ({ ...prev, isPaused: true }));
    setSaveYourGame(true);
    console.log("Score: ", score, rows, level);
  };

  const drop = () => {
    // increase level if player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
      setIsAudioPlaying(false);
      setPlaybackSpeed((prev) => prev + 0.1);
      setIsAudioPlaying(true);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        handleGameOver();
        console.error("Game Over!");
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    } else {
      setIsAudioPlaying(false);
      setPlaybackSpeed(1);
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayerLeftOrRight(-1);
      } else if (keyCode === 39) {
        movePlayerLeftOrRight(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <>
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
      >
        {savedGameState.name ? (
          <h1
            style={{ color: "#fff" }}
          >{`Welcome back ${savedGameState.name}`}</h1>
        ) : null}
        <StyledTetris>
          <Stage stage={stage} />
          <aside>
            {gameOver ? <Display gameOver={gameOver} text="Game Over" /> : null}
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>

            {saveYourGame ? (
              <SaveGamePanel handleSave={handleSaveGame} />
            ) : (
              <>
                <StartButton callBack={startGame} text="Start Game" />
                <StartButton callBack={handlePauseGame} text="Pause Game" />
              </>
            )}
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>

      <Audio
        isPlaying={isAudioPlaying}
        speed={playbackSpeed}
        paused={pause.isPaused}
      />
    </>
  );
};

export default Tetris;
