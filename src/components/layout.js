import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import loadable from '@loadable/component'
import { Hidden } from "@material-ui/core";
import { YMaps } from 'react-yandex-maps';

import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { makeStyles } from "@material-ui/core/styles"
const Footer = loadable(() => import('./footer'));

const Layout = ({ children }) => {

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
        <YMaps>
          {children}
        </YMaps>
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



// import { useStyleLayout } from "./common/style";
// import useIsClient from "../utils/useIsClient"
// const { isClient, key } = useIsClient();
// import Spinner from '../components/spinner/spinner-new'

// const Header = loadable(() => import('./header'));
// if (!isClient) return <Spinner/>
// <div key={key}>
// </div>