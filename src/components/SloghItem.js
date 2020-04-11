import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LayoutItem from './layoutItem';

const SloghItem = ({name, description, image, count, weight, price, added}) => {

    return (
  <>
    <SEO title={`Роллы ${name}`}
    description={`Фирменные роллы ${name}, ${price}, общий вес ${weight}`}
         pathname="/branded-rolls"/>
        <LayoutItem name={name} image={image}>
            <p itemprop="description"><b>Состав:</b> {description}</p>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p><b>Количество:</b> {count} шт</p>
            <p><b>Общий вес:</b> {weight} гр</p>
                <p><b>Цена</b> <span itemprop="price">{price}</span> <span itemprop="priceCurrency" content="RUR">руб</span></p>
            </div>
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

export default SloghItem