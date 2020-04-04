import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import {useStyleLayout} from "./common/style";
import loadable from '@loadable/component'
// import moment from "moment";

const Footer = loadable(() => import('./footer'))

const Layout = ({ children, location: {pathname} }) => {
const classes = useStyleLayout();

  return (
    <>
    <Header />
      <div className={classes.root}>
        <main>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      {
        pathname !== "/korzina" && pathname !== "/order" ?
        <Footer/> : ''
      }
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
}

export default Layout


