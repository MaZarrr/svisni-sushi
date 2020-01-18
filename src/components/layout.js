import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

import ErrorBoundary from './error-boundary/error-boundary'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('992')]: {
      paddingLeft: '50px',
    },
    [theme.breakpoints.up('992')]: {
      marginTop: '90px',
    },
    zIndex: '1000'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  }
}));



const Layout = ({ children }) => {
const classes = useStyles();
const data = useStaticQuery(graphql`
    # query SiteTitleQuery {
    #   site {
    #     siteMetadata {
    #       title
    #     }
    #   }
    query {
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
  `)

  return (
    <>
    <ErrorBoundary>
    <Header
      vk={data.vk.childImageSharp.fluid}
      ok={data.ok.childImageSharp.fluid}
      inst={data.inst.childImageSharp.fluid}
    > </Header>
    {/* siteTitle={data.site.siteMetadata.title} */}
 
     
      <div
        className={classes.root}
      >
        
       <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <Footer vk={data.vk.childImageSharp.fluid}
                ok={data.ok.childImageSharp.fluid}
                inst={data.inst.childImageSharp.fluid}
                logo={data.logo.childImageSharp.fluid}/>
     
        {/* <main>
        
        </main> */}
      
  
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


