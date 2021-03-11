import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';
import { Typography } from "@material-ui/core";

const EmptyBasket = () => (
        <div className="container">
        <div style={{margin: '0 auto'}}>
            <Typography style={{textAlign: `center`}} variant={"body1"}>
                Вероятней всего, вы не добавили товары в корзину.<br />
                Для того, чтобы заказать суши и пиццу, перейди в меню.
            </Typography>
            <StaticImage style={{maxWidth: 400, marginTop: `10px auto`}}
                         src="../images/emptyCart.png"
                         alt={"Пуская корзина"}/>
        </div>
        </div>
);

export default EmptyBasket
