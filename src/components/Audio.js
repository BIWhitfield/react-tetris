import React from "react";

import tetrisAudio from "../assets/tetris-audio.wav";

const Audio = ({ isPlaying, speed, paused }) => {
  const audioRef = React.createRef();

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed, audioRef]);

  React.useEffect(() => {
    if (audioRef.current && paused) {
      audioRef.current.pause();
    } else if (audioRef.current && !paused) {
      audioRef.current.play();
    }
  }, [paused, audioRef]);

  if (!isPlaying) return null;

  return <audio ref={audioRef} src={tetrisAudio} pla autoPlay loop />;
};

export default Audio;
