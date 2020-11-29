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

const SetyItem = ({name, image, count, weight, price, added, kitProduct, location, back}) => {

return (
  <>
    <SEO title={`Сет роллов ${name}`}
         description={`Набор роллов ${name}, количество ${count} с общим весом ${weight}`}
         pathname="/sety"/>
        <LayoutItem name={name} image={null} location={location}>
            <ButtonBackSet back={back} />
            <Grid container>
                <Grid item xs={12} sm={5} style={{width: `100%`, padding: 10}} >
                    <Img style={{maxWidth: 400, borderRadius: 15, position: `sticky`, top: 150}} fluid={image} />
                </Grid>

                <Grid item xs={12} sm={6} md={5} style={{paddingLeft: 10}}>
                    <div style={{maxWidth: `100%`, height: `20px`}}>
                        <Typography variant={"h6"} style={{marginTop: 10, marginBottom: 10}}>Состав:</Typography>
                    </div>
                { kitProduct.map(({node: product}) => (
                <Paper key={product.id} style={{marginTop: 10}}>
                    <Grid container direction={"row"}>
                        <Grid item xs={2}>
                            <Img style={{maxWidth: 70}} fluid={product.image.fluid} alt={product.name} />
                        </Grid>
                    <Grid item xs={8} style={{paddingLeft: 8, margin: `auto 0`}}>
                        <Typography variant={"subtitle2"} style={{fontSize: 14, fontWeight: 600, margin: 0, padding: 0}}>{product.name}</Typography>
                        <Typography variant={"body1"} style={{fontSize: 12, margin: `auto`}}>{product.description}</Typography>
                    </Grid>

                    <Grid item xs={2} style={{margin: `auto auto`, textAlign: `center`}}>
                        <Typography variant={"caption"} style={{fontSize: 12}}>{product.count}шт</Typography>
                    </Grid>
                    </Grid>
                </Paper>
            ))}
            <div style={{marginTop: 20}}>
                <Typography variant={"body1"}>Количество: <strong>{count} шт</strong></Typography>
                    <Typography style={{marginTop: 10, marginBottom: 10}} variant={"body1"}>Общий вес: <strong>{weight} кг</strong></Typography>
                    <Typography style={{marginBottom: 10}} variant={"body1"}>Цена: <strong>{price} руб</strong></Typography>
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


