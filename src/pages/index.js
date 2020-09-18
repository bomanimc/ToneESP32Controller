import React from "react";
import styled from 'styled-components';

import Layout from "../components/layout"
import SEO from "../components/seo"
import StepSequencer from '../components/stepSequencer';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <IndexPage.Content>
      <StepSequencer />
    </IndexPage.Content>
  </Layout>
);

IndexPage.Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default IndexPage;
