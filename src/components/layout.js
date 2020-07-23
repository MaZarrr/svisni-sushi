import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import {useStyleLayout} from "./common/style";
import loadable from '@loadable/component'
import {connect} from "react-redux";
import {Hidden} from "@material-ui/core";
// import Transition from "./common/transitionPage";

const Footer = loadable(() => import('./footer'))

const Layout = ({ children }) => {

const classes = useStyleLayout();

  return (
    <>
    <Header/>
      <div className={classes.root}>
        <main>
          <div className={classes.toolbar} />
            {children}
        </main>
      </div>

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
}

const mapStateToProps = (state) => ({
  clockSaleBool: state.shoppingCart.clockSale
})

export default connect(mapStateToProps, null)(Layout)


// {/*{*/}
// {/*  pathname !== "/korzina" && pathname !== "/order" ?*/}
// <Footer/>
// {/*: ''*/}
// // }