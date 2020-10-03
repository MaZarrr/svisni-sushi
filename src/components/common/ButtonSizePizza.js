import clsx from "clsx";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {pizzaSized} from "../../reducers/shopping-cart";
import {connect} from "react-redux";
import {BootstrapButton} from "./ToogleButton";

const useStyleButtonSize = makeStyles(theme => ({
    buttonD: {
        width: 71,
        fontSize: 10
    },
    buttonT: {
        backgroundColor: `orange`,
        width: 71,
        fontSize: 10
    },
}));

const ButtonSize = ({ sizePizzaStyle, title, onRazmer, id, pricePizza, edges, pizzaSize = {}}) => {
    const classes = useStyleButtonSize();

    return (
     <BootstrapButton className={clsx(classes.buttonD, {
        [classes.buttonT]: pizzaSize[sizePizzaStyle]})}
         onClick={() => onRazmer({id, price: pricePizza, product: edges, size: sizePizzaStyle})}>
         {title}</BootstrapButton>
 )
};

const mapDispatchToProps = {
    onRazmer: pizzaSized
};

export default connect(null, mapDispatchToProps)(ButtonSize)