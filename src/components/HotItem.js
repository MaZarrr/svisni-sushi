import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LayoutItem from './layoutItem';

const HotItem = ({name, description, image, count, weight, price, added}) => {
    return (
    <>
    <SEO title={`Горячие роллы ${name}`} />
        <LayoutItem name={name} image={image}>
            <p><b>Состав:</b> {description}</p>
            <p><b>Количество:</b> {count} шт</p>
            <p><b>Общий вес:</b> {weight} гр</p>
            <p><b>Цена</b> {price} руб</p>
        <Button 
            variant="outlined" 
            size="large"
            endIcon={<ShoppingBasketIcon/>}
            style={{marginBottom: `50px`}}
            onClick={added}
            >В корзину</Button>
    </LayoutItem>
    </>
        )
}

export default HotItem