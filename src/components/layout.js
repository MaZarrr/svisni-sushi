import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import loadable from '@loadable/component'
import { Hidden } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { isBrowser } from "./common/constants";

const ScrollTop = loadable(() => import('./common/ScrollTop'));
const Footer = loadable(() => import('./footer'));

const VK = isBrowser && window.VK
isBrowser && VK.Widgets.CommunityMessages("vk_community_messages", 161250465);
// isBrowser && VK.Widgets.Group("vk_groups", {mode: 3}, 161250465)
const Layout = (
  { children, location: { pathname = "" }
}) => {
  return (
    <ErrorBoundary>
    <div id="vk_community_messages"></div>
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
  
  <Hidden smDown>
    <Footer/>
  </Hidden>
  </ErrorBoundary>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
};

export default Layout
