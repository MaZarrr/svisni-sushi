import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Header from "./header"
import Footer from "./footer"

import "./layout.css"

import ErrorBoundary from './error-boundary/error-boundary'
import LabelBottomNavigation from './common/LabelBottomNavigation';

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
// const data = useStaticQuery(graphql`
//     # query SiteTitleQuery {
//     #   site {
//     #     siteMetadata {
//     #       title
//     #     }
//     #   }
//     }
//   `)

  return (
    <>
    <ErrorBoundary>
    <Header
      // homePageCart={allContentfulHomePageCarts.edges}
    > </Header>
    {/* siteTitle={data.site.siteMetadata.title} */}
 
     
      <div
        className={classes.root}>
       <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      {/* <LabelBottomNavigation /> */}
      </main>
      <Footer/>
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


