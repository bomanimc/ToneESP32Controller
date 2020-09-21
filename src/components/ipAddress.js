import React from "react";
import styled from 'styled-components';

const IPAddress = () => {
  return (
    <IPAddress.Input type="text" autocomplete="off" placeholder="Enter here" />
  )
};

IPAddress.Input = styled.input`
  border: 2px solid white;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: transparent;
  outline: none;
  padding: 0.5rem;
  width: 10rem;
  font-size: 1rem;
  text-align: center;
`;

export default IPAddress;