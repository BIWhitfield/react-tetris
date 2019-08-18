import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (tetromino, direction) => {
    // Make rows in to columns (transpose)
    const rotatedTetro = tetromino.map((_, i) => tetromino.map(col => col[i]));
    // Reverse each row to get rotated tetromino
    if (direction > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, direction) => {
    // Create a complete deep clone of player
    const clonePlayer = JSON.parse(JSON.stringify(player));
    clonePlayer.tetromino = rotate(clonePlayer.tetromino, direction);

    const pos = clonePlayer.pos.x;
    let offset = 1;

    while (checkCollision(clonePlayer, stage, { x: 0, y: 0 })) {
      clonePlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonePlayer.tetromino[0].length) {
        rotate(clonePlayer.tetromino, -direction);
        clonePlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonePlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prevState => ({
      ...prevState,
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
