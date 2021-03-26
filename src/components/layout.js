import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import loadable from '@loadable/component'
import { Hidden } from "@material-ui/core";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const ScrollTop = loadable(() => import('../components/common/ScrollTop'));
const Footer = loadable(() => import('./footer'));

const Layout = ({ children, location: { pathname = "" } }) => {
  return (     
      <ErrorBoundary>
      <Header/>
      <div style={{
        maxWidth: `1920px`,
        backgroundColor: "#fafafa",
        margin: `0 auto`,
        minHeight: `100vh`
      }}>
      <div style={{height: 75, width: 100}} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0 }} />
      <main>
          {children}
      </main>
      { pathname !== "/korzina/" &&
            pathname !== "/korzina/order" &&
            pathname !== "/korzina/order/order-processed" &&
            pathname !== "/korzina/order/order-success" &&
            <ScrollTop />
          }
      </div>
    <div>
    </div>
    
    <Hidden xsDown>
      <Footer/>
    </Hidden>
    </ErrorBoundary>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
};

export default Layout
