import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import loadable from '@loadable/component'
import { Hidden } from "@material-ui/core";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { makeStyles } from "@material-ui/core/styles"

const ScrollTop = loadable(() => import('../components/common/ScrollTop'));
const Footer = loadable(() => import('./footer'));

const Layout = ({ children, location: { pathname } }) => {
  const classes = useStyleLayout();
  return (
      <React.Fragment>        
      <Header/>
      <ErrorBoundary>
      <div style={{
        maxWidth: `1920px`,
        backgroundColor: "#fafafa",
        margin: `0 auto`,
        minHeight: `100vh`
      }}>
      <div style={{height: 75, width: 100}} />
      <main>
        <div className={classes.toolbar} />
          {children}
          { pathname !== "/korzina/" &&
            pathname !== "/korzina/order" &&
            pathname !== "/korzina/order/order-processed" &&
            pathname !== "/korzina/order/order-success" &&
            <ScrollTop />
          }
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

const useStyleLayout = makeStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 0,
  }
});
