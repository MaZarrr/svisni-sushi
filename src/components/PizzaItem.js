import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LayoutItem from './layoutItem';

const PizzaItem = ({name, description, image, price, added, priceIn33, weight, weight33}) => {

    return (
        <>
            <SEO title={`Пицца ${name}`}/>
            <LayoutItem name={name} image={image} >
                <p><b>Состав:</b> {description}</p>
                {/* <p><b>Количество:</b> {count} шт</p> */}
                {/* <p><b>Общий вес:</b> {weight} гр</p> */}
                <div style={{width: `80%`}}>
                    <div style={{display: `inline-block`, marginRight: `15px`}}>
                        <p style={{margin: 0}}><b>Маленькая</b> {price} руб</p>
                         {/*<p><b>{weight} кг</b></p>*/}
                    </div>
                    <div style={{display: `inline-block`, marginLeft: `auto`}}>
                        <Button
                            variant="outlined"
                            size="medium"
                            endIcon={<ShoppingBasketIcon/>}
                            // style={{marginBottom: `50px`}}
                            onClick={added}
                        ></Button>
                    </div>
                </div>

                <div style={{width: `80%`, marginTop: `25px`, marginBottom: 50}}>
                    <div style={{display: `inline-block`, marginRight: `35px`}}>
                        <p style={{margin: 0}}><b>Большая</b> {priceIn33} руб</p>
                        {/* <p><b>{weight33} кг</b></p> */}
                    </div>
                    <div style={{display: `inline-block`, marginLeft: `auto`}}>
                        <Button
                            variant="outlined"
                            size="medium"
                            endIcon={<ShoppingBasketIcon/>}
                            style={{textAlign: `center`}}
                            onClick={added}
                        ></Button>
                    </div>
                </div>
            </LayoutItem>
        </>
    );
};

export default PizzaItem