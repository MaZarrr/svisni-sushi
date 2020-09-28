import React from 'react'
import GatsbyImage from "gatsby-image";
import useImageStaticHook from '../components/image';
import {Typography} from "@material-ui/core";

export default () => {
    const [{emptyBasketImage},] = useImageStaticHook();

   return (
        <div className="container">
        <div style={{margin: '0 auto'}}>
            <Typography variant={"body1"}>
                Вероятней всего, вы не добавили товары в корзину.<br />
                Для того, чтобы заказать суши и пиццу, перейди в меню.
            </Typography>
            <GatsbyImage style={{maxWidth: 400, marginTop: 10}} fluid={emptyBasketImage.childImageSharp.fluid} alt={"Пуская корзина"}/>
        </div>
        </div>
)};
