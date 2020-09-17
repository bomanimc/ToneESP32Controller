import React from "react";

import Layout from "../components/layout"
import SEO from "../components/seo"
import StepSequencer from '../components/stepSequencer';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <StepSequencer />
  </Layout>
)

export default IndexPage;
