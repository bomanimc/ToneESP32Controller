import React from "react";
import styled from 'styled-components';

export const DEFAULT_BPM = 70;

const BPM = ({onChangeBPM}) => {
  return (
    <BPM.Input 
      type="number" 
      autocomplete="off" 
      placeholder="Enter BPM here"
      defaultValue={DEFAULT_BPM}
      onChange={onChangeBPM} 
    />
  )
};

BPM.Input = styled.input`
  border: 2px solid white;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: transparent;
  outline: none;
  padding: 0.5rem;
  width: 5rem;
  font-size: 1rem;
  text-align: center;
`;

export default BPM;