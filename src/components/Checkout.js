import React, {useState} from "react";
import {useSpring, animated} from "react-spring";

const Checkout = ({isOpen}) => {
    const animation = useSpring({
        transform: isOpen ? `translate3d(0, 0, 0)` : `translate3d(100%, 0, 0)`
    });
    return (
        <div className="checkout">
            <animated.div style={animation} className="checkout-left"/>
            <animated.div style={animation} className="checkout-left"/>
        </div>
    )
};

export default Checkout