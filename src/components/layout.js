import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import { useStyleLayout } from "./common/style";
import loadable from '@loadable/component'
import {Hidden} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../src/theme';

import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const Footer = loadable(() => import('./footer'));

const Layout = ({ children, location }) => {

  const classes = useStyleLayout();

  return (
      <>
        <Header/>
          <ErrorBoundary>
        <div style={{
            maxWidth: `1680px`,
            backgroundColor: "#fafafa",
            margin: `0 auto`,
            minHeight: `100vh`
        }}>
            {/* switch margin*/}
            <div style={{height: 75, width: 100}}></div>
          <main>
              <ThemeProvider theme={theme}>
                  <CssBaseline/>
                  <div className={classes.toolbar} />
                      {children}
              </ThemeProvider>
          </main>
        </div>
        </ErrorBoundary>
          <div>
          </div>

        <Hidden xsDown>
          <Footer/>
        </Hidden>
      </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
};

export default Layout
