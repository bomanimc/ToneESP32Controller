import React from "react";
import styled from 'styled-components';

const ControlTitle = ({children}) => (
  <ControlTitle.Title>{children}</ControlTitle.Title>
);

ControlTitle.Title = styled.p`
  color: #bdc3c7;
  font-size: 0.75rem;
`;

export default ControlTitle;