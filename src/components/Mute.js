import React from "react";
import styled from 'styled-components';
import VolumeOff from '../assets/volume_off.svg';
import VolumeOn from '../assets/volume_on.svg';

const Mute = ({toggleMute, isMuted}) => (
  <Mute.Root onClick={toggleMute}>
    {isMuted ? <VolumeOff /> : <VolumeOn />}
  </Mute.Root>
);

Mute.Root = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 5rem;

  svg {
    fill: white;
  }
`;

export default Mute;