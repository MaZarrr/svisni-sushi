import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

import ErrorBoundary from './error-boundary/error-boundary'



const getImageData = graphql `
{
    # query SiteTitleQuery {
    #   site {
    #     siteMetadata {
    #       title
    #     }
    #   }
      logo: file(relativePath: { eq: "logosvisni.png" }) {
      childImageSharp {
      fluid(maxWidth: 120) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  vk: file(relativePath: { eq: "social-img/vk.png" }) {
    childImageSharp {
      fluid(maxWidth: 50) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  ok: file(relativePath: { eq: "social-img/odnoklassniki.png" }) {
    childImageSharp {
      fluid(maxWidth: 50) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  inst: file(relativePath: { eq: "social-img/instagram.png" }) {
    childImageSharp {
      fluid(maxWidth: 50) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  }
  `


const Layout = ({ children }) => {

  const data = useStaticQuery(getImageData);

  return (
    <>
    <ErrorBoundary>
    {/* siteTitle={data.site.siteMetadata.title}  */}
    <Header 
      vk={data.vk.childImageSharp.fluid}
      ok={data.ok.childImageSharp.fluid}
      inst={data.inst.childImageSharp.fluid}
    />
     
      <div
        style={{
          margin: `0`,
          maxWidth: `100%`,
          padding: `0`,
        }}
      >
        <main>
        {children}
        </main>
        <Footer vk={data.vk.childImageSharp.fluid}
        ok={data.ok.childImageSharp.fluid}
        inst={data.inst.childImageSharp.fluid}
        logo={data.logo.childImageSharp.fluid}
  
  
        />
  
      </div>
  </ErrorBoundary>
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