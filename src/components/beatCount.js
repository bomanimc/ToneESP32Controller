import React from "react";
import styled from 'styled-components';
import ControlTitle from './controlTitle';

export const DEFAULT_BEAT_COUNT = 8;

const BeatCount = ({onChangeBeatCount}) => {
  return (
    <BeatCount.Container>
      <BeatCount.Input
        type="number"
        autocomplete="off"
        placeholder="Enter beat count here"
        defaultValue={DEFAULT_BEAT_COUNT}
        onChange={onChangeBeatCount}
      />
      <ControlTitle>Beat Count</ControlTitle>
    </BeatCount.Container>
  )
};

BeatCount.Container = styled.div`
  display: flex;
  border: 2px solid white;
  border-radius: 0.5rem;
  flex-direction: column;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
`;

BeatCount.Input = styled.input`
  display: flex;
  color: white;
  background: transparent;
  outline: none;
  padding: 0.5rem;
  width: 5rem;
  font-size: 1rem;
  text-align: center;
  border: none;
`;

export default BeatCount;