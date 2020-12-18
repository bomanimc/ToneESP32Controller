import React from "react";
import styled from 'styled-components';
import ControlTitle from './controlTitle';

export const DEFAULT_IP_ADDRESS = '192.168.1.184';

const IPAddress = ({onChangeAddress}) => {
  return (
    <IPAddress.Container>
      <IPAddress.Input 
        type="text" 
        autocomplete="off" 
        placeholder="Enter here"
        defaultValue={DEFAULT_IP_ADDRESS}
        onChange={onChangeAddress} 
      />
      <ControlTitle>IP Address</ControlTitle>
    </IPAddress.Container>
  )
};

IPAddress.Container = styled.div`
  display: flex;
  border: 2px solid white;
  border-radius: 0.5rem;
  flex-direction: column;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
`;

IPAddress.Input = styled.input`
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
  border: none;
`;

export default IPAddress;