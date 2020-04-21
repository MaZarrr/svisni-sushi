import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import {useStyleLayout} from "./common/style";
import loadable from '@loadable/component'
import moment from "moment";
import {connect} from "react-redux";
import {clockSale} from "../reducers/shopping-cart";

const Footer = loadable(() => import('./footer'))

const Layout = ({ children, location: {pathname}, dispatch, clockSaleBool }) => {
const classes = useStyleLayout();

React.useEffect(() => {
const time = moment().format('HH')
  const day = moment().format('ddd')
  if(time < 16 && time > 10 && (day === 'Tue' || day === 'Mon')) {
    dispatch(clockSale())
  }
}, [dispatch])

  return (
    <>
    <Header clockSale={clockSaleBool}/>
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

const mapStateToProps = (state) => ({
  clockSaleBool: state.shoppingCart.clockSale
})

export default connect(mapStateToProps, null)(Layout)


