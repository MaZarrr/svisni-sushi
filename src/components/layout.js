import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Header from "./header"
import Footer from "./footer"
// import VK, {CommunityMessages} from "react-vk";
import "./layout.css"

import ErrorBoundary from './error-boundary/error-boundary'
// import LabelBottomNavigation from './common/LabelBottomNavigation';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: `1440px`,
    [theme.breakpoints.down('769')]: {
      paddingLeft: '50px'
    },
    [theme.breakpoints.up('769')]: {
      marginTop: '90px',
    },
    margin: '0 auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // maxWidth: `1440px`,
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
          {/* <VK apiId={7311665}> */}
          <div className={classes.toolbar} />
          {/* <CommunityMessages 
            groupId={161250465} 
            elementId="vk_message" 
            options={{
              disableButtonTooltip: 1
            }}  
            /> */}
          {children}
          {/* <LabelBottomNavigation /> */}
        {/* </VK> */}
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


