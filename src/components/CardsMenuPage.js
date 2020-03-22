import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Img from "gatsby-image";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {Link} from "gatsby";
import React from "react";
import {useStylesCart} from "./common/style";


export default ({titleCategory, slugCategogy, visibleItems, image, product, setAddedToCart}) => {

    const classes = useStylesCart()
    return (
        <>
            {visibleItems.map(({node: productSets}) => {

                const {id, name, slug, description, price, weight, count, image: {fluid}} = productSets

                return (
                    <Grid item xs={12} sm={6} md={3} key={id}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="menu" className={classes.avatar}>
                                        <Img style={{width: 50}} fluid={image.fluid} alt={name} />
                                    </Avatar>
                                }
                                title={titleCategory}
                                subheader={name}/>
                            <CardMedia
                                className={classes.media}
                                title={name}>
                                <Img fluid={fluid} alt={name} style={{maxWidth: 270, maxHeight: 270}}/>
                            </CardMedia>

                            <CardContent>
                                <Typography className={classes.deckript} variant="caption" color="textSecondary"
                                            component="p">
                                    {description}
                                </Typography>
                                <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
                                    <b><p>{weight}кг</p></b>
                                    <b><p>{count}шт</p></b>
                                </Typography>
                                <p>{`${price}₽`}</p>
                            </CardContent>

                            <CardActions disableSpacing>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<ShoppingBasketIcon/>}
                                    onClick={() => setAddedToCart(id, null, product)}>
                                    Хочу </Button>

                                {   slugCategogy === "/sety" ||
                                    slugCategogy === "/pizza" ||
                                    slugCategogy === "/branded-rolls" ||
                                    slugCategogy === "/hot-rolls" ?
                                    <Button
                                        component={Link}
                                        to={`${slugCategogy}/${slug}`}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.buttonInfo}>
                                        Подробнее </Button> : null
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </>
    )
}

