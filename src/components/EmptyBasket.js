import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';
import { Typography } from "@mui/material";

const EmptyBasket = () => (
        <div style={{ width: '100%' }}>
        <div style={{margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography style={{textAlign: `center`}} variant={"body1"}>
                Вероятней всего, вы не добавили товары в корзину.<br />
                Для того, чтобы заказать суши и пиццу, перейди в меню.
            </Typography>
            <StaticImage style={{maxWidth: 400, marginTop: `10px auto`}}
                         src="../images/emptyCart.png"
                         placeholder="blurred"
                         alt={"Пуская корзина"}/>
        </div>
        </div>
);

export default EmptyBasket
