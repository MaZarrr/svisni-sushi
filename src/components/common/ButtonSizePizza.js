import clsx from "clsx";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {pizzaSized} from "../../reducers/shopping-cart";
import {connect} from "react-redux";

const useStyleButtonSize = makeStyles(theme => ({
    buttonD: {
        background: `lightgrey`,
        textTransform: `uppercase`,
        color: `dark`,
        borderRadius: 5,
        fontSize: 10,
        width: 70,
        fontWeight: 500,
        padding: `7px 2px`
    },
    buttonT: {
        background: `#FFAE40`,
        textTransform: `uppercase`,
        color: `white`,
        zIndex: 99,
        fontWeight: 500,
        borderRadius: 5,
        width: 70,
        fontSize: 10,
        padding: `7px 2px`
    },
}))

const ButtonSize = ({ sizePizzaStyle, title, onRazmer, id, pricePizza, edges, pizzaSize = {}}) => {
    const classes = useStyleButtonSize();

    // const onRadioChangedd = (id, price, product, size) => onRazmer({id, price, product, size})
    return (
     <button className={clsx(classes.buttonD, {
        [classes.buttonT]: pizzaSize[sizePizzaStyle]})}
             // onClick={() => onRadioChangedd(id, pricePizza, edges, sizePizzaStyle)}>
         onClick={() => onRazmer({id, price: pricePizza, product: edges, size: sizePizzaStyle})}>
         {title}</button>
 )
}

const mapDispatchToProps = {
    onRazmer: pizzaSized
};

export default connect(null, mapDispatchToProps)(ButtonSize)