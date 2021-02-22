import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { useStyleLayout } from "./common/style";
import loadable from '@loadable/component'
import { Hidden } from "@material-ui/core";

import Spinner from '../components/spinner/spinner-new'
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import useIsClient from "../utils/useIsClient"

const Footer = loadable(() => import('./footer'));

const Layout = ({ children }) => {

  // const { isClient, key } = useIsClient();
  const classes = useStyleLayout();

  // if (!isClient) return <Spinner/>
      // <div key={key}>
  // </div>

  return (
      <React.Fragment>        
      <Header/>
      <ErrorBoundary>
        <div style={{
        maxWidth: `1680px`,
        backgroundColor: "#fafafa",
        margin: `0 auto`,
        minHeight: `100vh`
    }}>
      <div style={{height: 75, width: 100}}></div>
      <main>
        <div className={classes.toolbar} />
        {children}
      </main>
      </div>
    </ErrorBoundary>
    <div>
    </div>

    <Hidden xsDown>
      <Footer/>
    </Hidden>
    </React.Fragment>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
};

export default Layout

// import CssBaseline from '@material-ui/core/CssBaseline';
// import { ThemeProvider } from "@material-ui/core/styles";
// import theme from "../../src/theme";