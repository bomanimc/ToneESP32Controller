/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useStaticQuery, graphql } from "gatsby";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout.Root>{children}</Layout.Root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.Root = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export default Layout
