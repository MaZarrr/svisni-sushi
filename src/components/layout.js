import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import {useStyleLayout} from "./common/style";

const Layout = ({ children, location }) => {

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
      {location.pathname !== "/order" && location.pathname !== "/korzina" ? (
        <Footer />
      ) : null}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


