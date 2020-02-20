import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import {StylingInfo} from '../components/common/style'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const PizzaItem = ({name, description, image, price, added, priceIn33, weight, weight33}) => {

 return (
         <>
    <SEO title={name} />
    <StylingInfo>
    <div className="container"> 
        <h1>{name}</h1>
        <hr></hr>
        <Grid container>
        <Grid item xs={12} sm={6}>
            <Img style={{maxWidth: 400}} fluid={image} />
        </Grid>
        <Grid item xs={12} sm={5} style={{margin: `auto 0`}}>
            <p><b>Состав:</b> {description}</p>
            {/* <p><b>Количество:</b> {count} шт</p> */}
            {/* <p><b>Общий вес:</b> {weight} гр</p> */}
            <div style={{width: `80%`}}>
            <div style={{ display: `inline-block`, marginRight: `30px`}}>
            <p><b>Маленькая</b> {price} руб</p>
            {/* <p><b>{weight} кг</b></p> */}
            </div>
            <div style={{ display: `inline-block`,  marginLeft: `auto`}}>
            <Button 
            variant="outlined" 
            size="large"
            endIcon={<ShoppingBasketIcon/>}
            // style={{marginBottom: `50px`}}
            onClick={added}
            >-></Button>
            </div>
            </div>

            <div style={{width: `80%`}}>
            <div style={{ display: `inline-block`, marginRight: `51px`}}>
            <p><b>Большая</b> {priceIn33} руб</p>
            {/* <p><b>{weight33} кг</b></p> */}
            </div>
            <div style={{ display: `inline-block`, marginLeft: `auto`}}>
            <Button 
            variant="outlined" 
            size="large"
            endIcon={<ShoppingBasketIcon/>}
            onClick={added}
            >-></Button>
            </div>
            </div>
    
        </Grid>
        </Grid>
    </div>
    </StylingInfo>
    </>
        )
}

export default PizzaItem