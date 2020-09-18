import React, { useState } from "react";
import styled from 'styled-components';
import Play from '../assets/play.svg';
import Stop from '../assets/stop.svg';

const PlayPauseButton = ({disabled, play, stop}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleIsPlaying = () => {
    isPlaying ? stop() : play();
    setIsPlaying(!isPlaying);
  }

  return (
    <PlayPauseButton.Root disabled={disabled} onClick={toggleIsPlaying}>
      {isPlaying ? <PlayPauseButton.StopIcon /> : <PlayPauseButton.PlayIcon />}
    </PlayPauseButton.Root>
  );
}

PlayPauseButton.Root = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 5rem;
`;

PlayPauseButton.PlayIcon = styled(Play)`
  transform: rotate(90deg);
  fill: white;
  height: 50%;
  margin-left: 12px;
`;

PlayPauseButton.StopIcon = styled(Stop)`
  transform: rotate(90deg);
  fill: white;
  height: 50%;
`;

export default PlayPauseButton;