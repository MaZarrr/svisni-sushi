/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
// import MenuSite from './common/MenuSite';
// import CarouselSvisni from './common/CarouselSvisni';
// import Sety from './../pages/sety';


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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      
      <div
        style={{
          margin: `0`,
          maxWidth: `100vw`,
          padding: `0`,
          // background: `red`,
        }}
      >
        <main>
        {children}
        </main>
        
        <footer>
         
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


// © {new Date().getFullYear()}, Built with
// {` `}
// <a href="https://www.gatsbyjs.org">Gatsby</a>