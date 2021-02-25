import React from 'react'
import { connect } from 'react-redux'

import {
  addedCart, removeCart,
  allRemoveCart, addPribor,
  saleRoll, salePizza,
  deletePizza, deleteRoll
} from "../reducers/shopping-cart"
import { makeStyles } from "@material-ui/core/styles"
import GatsbyImage from "gatsby-image"
import theme from "../theme"
import { getProduct } from "../reducers/app"

const CheckoutItem = ({ cartItem, addItem, clearItem, removeItem, items}) => {
  const classes = useStyleCheckoutItem()
  console.log(cartItem)
  // console.log(addItem)
  const { id, name, count, total, image, priceIn33cm, price, priceDef,
          textRollSale, textPizza, pizzaSale, description, edit = null,
          size, wok = false, slug = null, descriptionWok, contentful_id = "sizeBig",
          ingrideents, sostav, descriptionIngrideents = "" } = cartItem;

  return (
    <div className={classes.checkoutItem}>
      <div className={classes.imageContainer}>
        <GatsbyImage fluid={image} alt={name} />
      </div>
      <span className={classes.name}>{name}</span>
      <span className={classes.quantity}>
      <div className={classes.arrow} onClick={() => removeItem({ id, price, product: items })}>
          &#10094;
        </div>
        <span className={classes.value}>{count}</span>
        <div className={classes.arrow} onClick={() => addItem({ id, price, product: items })}>
          &#10095;
        </div>
      </span>

      <span className={classes.price}>{price}₽</span>
      <div className={classes.removeButton} onClick={() => clearItem({ id, price, product: items })}>
        &#10005;
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.shoppingCart.cartItems,
  palochkiTotal: state.shoppingCart.palochkiTotal,
  total: state.shoppingCart.orderTotal,
});

const mapDispatchToProps = {
  producSetsLoad: getProduct,
  removeItem: removeCart,
  addItem: addedCart,
  clearItem: allRemoveCart,
  addedPriborCount: addPribor,
  addedSaleRoll: saleRoll,
  addedSalePizza: salePizza,
  deletePizzaSale: deletePizza,
  deleteFilaSale: deleteRoll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutItem)

const useStyleCheckoutItem = makeStyles(theme => ({
  checkoutItem: {
    width: `100%`,
    display: `flex`,
    minHeight: `100px`,
    borderBottom: `1px solid darkgrey`,
    padding: `15px 0`,
    fontSize: `20px`,
    alignItems: `center`,
    [theme.breakpoints.down(`555`)]: {
      fontSize: `14px`,
      letterSpacing: `-1px`
    }
  },
  imageContainer: {
    width: `23%`,
    paddingRight: `15px`,
  },
  img: {
    width: `100%`,
    height: `100%`,
    },
  name: {
    width: `23%`,
  },
  price: {
    width: `23%`,
  },
  quantity: {
    display: `flex`,
    width: `23%`,
  },
  arrow: {
      cursor: `pointer`,
    },
  value: {
      margin: `0 10px`,
    },
 removeButton: {
    paddingLeft: `12px`,
    cursor: `pointer`,
  }
}))