import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Grid, Paper} from "@material-ui/core";
import Img from "gatsby-image";
import loadable from "@loadable/component";
import Typography from "@material-ui/core/Typography";

// my components
const ButtonBackSet = loadable(() => import('./common/ButtonBackSet'));
const LayoutItem = loadable(() => import('./layoutItem'));

const SetyItem = ({name, image, count, weight, price, added, kitProduct, location}) => {

return (
  <>
    <SEO title={`Сет роллов ${name}`}
         description={`Набор роллов ${name}, количество ${count} с общим весом ${weight}`}
         pathname="/sety"/>
        <LayoutItem name={name} image={null} location={location}>
            <ButtonBackSet back="/sety" />
            <Grid container>
                <Grid item xs={12} sm={5} style={{margin: `0 auto`}}>
                    <Img style={{maxWidth: 400, margin: `0 auto`, borderRadius: 15}} fluid={image} />
                </Grid>

                <Grid item xs={12} sm={6} md={5}>
                    <div style={{maxWidth: `100%`, height: `20px`}}>
                        <p style={{marginTop: 10}}><b>Состав:</b></p>
                    </div>
                { kitProduct.map(({node: product}) => (
                <Paper key={product.id} style={{marginTop: 10}}>
                    <Grid container direction={"row"}>
                        <Grid item xs={2}>
                            <Img style={{maxWidth: 70}} fluid={product.image.fluid} alt={product.name} />
                        </Grid>
                    <Grid item xs={8} style={{paddingLeft: 8, margin: `auto 0`}}>
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
                    <Typography variant={"body1"}>Количество: {count} шт</Typography>
                    <Typography className="mt-2 mb-2" variant={"body1"}>Общий вес: {weight} кг</Typography>
                    <Typography className="mb-2" variant={"body1"}>Цена: {price} руб</Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ShoppingBasketIcon/>}
                        style={{marginBottom: `50px`}}
                        color={"primary"}
                        onClick={added}
                    >В корзину</Button>
            </div>
                </Grid>
            </Grid>
    </LayoutItem>
    </>
    )
};

export default SetyItem


