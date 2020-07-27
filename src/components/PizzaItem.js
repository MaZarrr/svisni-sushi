import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LayoutItem from './layoutItem';
import ButtonBackSet from "./common/ButtonBackSet";

const PizzaItem = ({name, description, image, price, added, priceIn33, weight, weight33}) => {

    return (
        <>
            <SEO title={`Пицца ${name}`}
                    description={`Маленькая, средняя и большая пицца ${name}, пицца от ${price} рублей`}
                    pathname="/pizza"/>
            <LayoutItem name={name} image={image} >
                <ButtonBackSet back="/pizza" />
                <p><b>Состав:</b> {description}</p>
                {/* <p><b>Количество:</b> {count} шт</p> */}
                {/* <p><b>Общий вес:</b> {weight} гр</p> */}
                <div style={{width: `80%`}}>
                    <div style={{display: `inline-block`, marginRight: `15px`}}>
                        <p style={{margin: 0}}><b>Средняя</b> {price} руб</p>
                    </div>
                    <div style={{display: `inline-block`, marginLeft: `auto`}}>
                        <Button
                            variant="outlined"
                            size="medium"
                            endIcon={<ShoppingBasketIcon/>}
                            onClick={added}/>
                    </div>
                </div>

                <div style={{width: `80%`, marginTop: `25px`, marginBottom: 50}}>
                    <div style={{display: `inline-block`, marginRight: `35px`}}>
                        <p style={{margin: 0}}><b>Большая</b> {priceIn33} руб</p>
                    </div>
                    <div style={{display: `inline-block`, marginLeft: `auto`}}>
                        <Button
                            variant="outlined"
                            size="medium"
                            endIcon={<ShoppingBasketIcon/>}
                            style={{textAlign: `center`}}
                            onClick={added}/>
                    </div>
                </div>
            </LayoutItem>
        </>
    );
};

export default PizzaItem