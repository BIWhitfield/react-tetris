import React from "react";

import tetrisAudio from "../assets/tetris-audio.wav";

const Audio = ({ isPlaying, speed }) => {
  const audioRef = React.createRef();

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed, audioRef]);

  if (!isPlaying) return null;

  console.log("Speed: ", speed);

  return <audio ref={audioRef} src={tetrisAudio} autoPlay loop />;
};

export default Audio;
