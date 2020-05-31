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
import {addedToCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";


const CardsMenuPage = ({titleCategory, slugCategogy, visibleItems, image, product, dispatch}) => {
    // console.log(product)
    const classes = useStylesCart()

    return (
        <>
            {visibleItems.map(({node: productSets}) => {

                const {id, name, slug, description, price, weight, count, image: {fluid}} = productSets

                return (
                    <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                          item xs={12} sm={6} md={3} key={id}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="menu">
                                        <Img style={{width: 50}} fluid={image.fluid} alt={name} />
                                    </Avatar>
                                }
                                title={titleCategory}
                                subheader={<span itemProp="name">{name}</span>}/>
                            <CardMedia
                                className={classes.media}
                                title={name}>
                                <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: 270, maxHeight: 270}}/>
                            </CardMedia>

                            <CardContent>
                                <Typography itemProp="description"
                                            className={classes.deckript}
                                            variant="caption"
                                            color="textSecondary"
                                            component="p">
                                    {description}
                                </Typography>
                                <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                <Typography
                                    component="div"
                                    variant="overline"
                                    classes={{overline: classes.overline}}>
                                    <b><p>{slugCategogy === '/pizza' ||
                                    slugCategogy === '/sety' ? `${weight}кг` : `${weight}гр`}</p></b>
                                    <b><p>{slugCategogy === '/pizza' ||
                                            count === undefined ? `${1}шт` : `${count}шт`}</p></b>
                                </Typography>
                                <p itemProp="price">{`от ${price}₽`}</p>
                                </div>
                            </CardContent>

                            <CardActions disableSpacing>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<ShoppingBasketIcon/>}
                                    onClick={() => dispatch(addedToCart({id, productPrice: null, product}))}>
                                    Хочу </Button>

                                {  slugCategogy === "/sety" ||
                                slugCategogy === "/pizza" ?
                                    <Button
                                        itemProp = "url"
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

export default connect(null, null)(CardsMenuPage)