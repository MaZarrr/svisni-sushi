import React from "react"
import SEO from "./seo"
import Img from 'gatsby-image';
import {StylingInfo} from '../components/common/style'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const HotItem = ({name, description, image, count, weight, price, added}) => {

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
        </Grid>
        </Grid>
    </div>
    </StylingInfo>
    </>
        )
}

export default HotItem