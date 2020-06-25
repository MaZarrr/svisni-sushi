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
        borderRadius: 10,
        fontSize: 12,
        width: 100,
        fontWeight: 700,
        padding: `8px 5px`
    },
    buttonT: {
        background: `#FFAE40`,
        transform: `scale(1.07)`,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
        textTransform: `uppercase`,
        color: `white`,
        fontWeight: 700,
        borderRadius: 10,
        width: 100,
        fontSize: 12,
        padding: `8px 5px`
    },
}))

const ButtonSize = ({ sizePizzaStyle, title, onRazmer, id, pricePizza, edges, pizzaSize = {}}) => {
    const classes = useStyleButtonSize();

    const onRadioChangedd = (id, price, product, size) => onRazmer({id, price, product, size})
    return (
     <button className={clsx(classes.buttonD, {
        [classes.buttonT]: pizzaSize[sizePizzaStyle]})}
         onClick={() => onRadioChangedd(id, pricePizza, edges, sizePizzaStyle)}>
         {title}</button>
 )
}

const mapDispatchToProps = {
    onRazmer: pizzaSized
};

export default connect(null, mapDispatchToProps)(ButtonSize)