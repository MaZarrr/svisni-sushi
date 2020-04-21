import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LayoutItem from './layoutItem';
import {Grid, Paper} from "@material-ui/core";
import Img from "gatsby-image";

const SetyItem = ({name, image, count, weight, price, added, kitProduct}) => {

return (
  <>
    <SEO title={`Сет роллов ${name}`}
         description={`Набор роллов ${name}, количество ${count} с общим весом ${weight}`}
         pathname="/sety"/>
        <LayoutItem name={name} image={null}>
            <Grid container >
                <Grid item xs={12} sm={5}>
                    <Img style={{maxWidth: 400}} fluid={image} />
                </Grid>

                <Grid item xs={12} sm={6} md={5} style={{marginLeft: 10}}>
                    <p><b>Состав:</b></p>
                { kitProduct.map(({node: product}) => (
                <Paper key={product.id} style={{marginTop: 10}}>
                    <Grid container direction={"row"}>
                        <Grid item xs={2}>
                            <Img style={{maxWidth: 70}} fluid={product.image.fluid} alt={product.name} />
                        </Grid>
                    <Grid item xs={8}>
                        <p style={{fontSize: 14, margin: 0, padding: 0}}>{product.name}</p>
                        <p style={{fontSize: 12, margin: `auto`}}>{product.description}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p style={{fontSize: 12, margin: 0, padding: 0}}><b>{product.count}шт</b></p>
                    </Grid>
                    </Grid>
                </Paper>
            ))}
            <div style={{marginTop: 20}}>
                    <p><b>Количество:</b> {count} шт</p>
                    <p><b>Общий вес:</b> {weight} кг</p>
                    <p><b>Цена</b> {price} руб</p>
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ShoppingBasketIcon/>}
                        style={{marginBottom: `50px`}}
                        onClick={added}
                    >В корзину</Button>
            </div>
                </Grid>
            </Grid>
    </LayoutItem>
    </>
    )
}

export default SetyItem


