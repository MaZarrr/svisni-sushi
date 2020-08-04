import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import {useStyleLayout} from "./common/style";
import loadable from '@loadable/component'
import {Hidden} from "@material-ui/core";

import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const Footer = loadable(() => import('./footer'));

const Layout = ({ children }) => {

  const classes = useStyleLayout();

  return (
      <>
        <Header/>
          <ErrorBoundary>
        <div className={classes.root}>
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
      </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
};

export default Layout
