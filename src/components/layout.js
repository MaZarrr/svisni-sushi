import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Header from "./header"
import Footer from "./footer"
import VK, {CommunityMessages} from "react-vk";
import "./layout.css"

import ErrorBoundary from './error-boundary/error-boundary'
// import LabelBottomNavigation from './common/LabelBottomNavigation';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('992')]: {
      paddingLeft: '50px',
    },
    [theme.breakpoints.up('992')]: {
      marginTop: '90px',
    },
    maxWidth: `1440px`,
    zIndex: '1000',
    margin: '0 auto',
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



const Layout = ({ children, location }) => {
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
    <ErrorBoundary>
      <div id="container" className={classes.root}>
        <Header />
        <main className={classes.content}>
          <VK apiId={7311665}>
            <CommunityMessages groupId={161250465} elementId="vk_message" />
          </VK>
          <div
            id="vk_message"
            className="vk_message"
            style={{ width: `99%` }}
          ></div>
          <div className={classes.toolbar} />
          {children}
          {/* <LabelBottomNavigation /> */}
        </main>
        {location.pathname !== "/order" && location.pathname !== "/korzina" ? (
          <Footer />
        ) : null}
      </div>
    </ErrorBoundary>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


// © {new Date().getFullYear()}, Built with
// {` `}
// <a href="https://www.gatsbyjs.org">Gatsby</a>


