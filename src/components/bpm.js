import React from "react";
import styled from 'styled-components';
import ControlTitle from './controlTitle';

export const DEFAULT_BPM = 70;

const BPM = ({onChangeBPM}) => {
  return (
    <BPM.Container>
      <BPM.Input
        type="number"
        autocomplete="off"
        placeholder="Enter BPM here"
        defaultValue={DEFAULT_BPM}
        onChange={onChangeBPM}
      />
      <ControlTitle>BPM</ControlTitle>
    </BPM.Container>
  )
};

BPM.Container = styled.div`
  display: flex;
  border: 2px solid white;
  border-radius: 0.5rem;
  flex-direction: column;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
`;

BPM.Input = styled.input`
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

export default BPM;