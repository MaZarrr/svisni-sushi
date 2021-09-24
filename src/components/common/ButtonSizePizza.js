import clsx from "clsx";
import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {pizzaSized} from "../../reducers/shopping-cart";
import {connect} from "react-redux";

const useStyleButtonSize = makeStyles(theme => ({
    buttonD: {
        borderRadius: 5,
        marginLeft: '10px',
        padding: '6px 12px',
        border: '1px solid orange',
      },
      buttonT: {
        borderRadius: 5,
        border: '1px solid orange',
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'orange',
        },
        '&:focus': {
          boxShadow: 'none',
          backgroundColor: 'orange',
        },
        backgroundColor: 'orange'
      },
}));

const ButtonSize = ({ sizePizzaStyle, title, onRazmer, id, pricePizza, edges, pizzaSize = {}}) => {
    const classes = useStyleButtonSize();

    return (
     <button className={clsx(classes.buttonD, {
        [classes.buttonT]: pizzaSize[sizePizzaStyle]})}
         onClick={() => onRazmer({id, price: pricePizza, product: edges, size: sizePizzaStyle})}>
         {title}</button>
 )
};

const mapDispatchToProps = {
    onRazmer: pizzaSized
};

export default connect(null, mapDispatchToProps)(ButtonSize)