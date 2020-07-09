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
import {Link} from "gatsby";
import React from "react";
import {useStylesCart} from "./common/style";
import {addedToCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/More';

const CardsMenuPage = ({titleCategory, slugCategogy, visibleItems, image, product, dispatch}) => {
    const classes = useStylesCart()

    return (
        <>
            {visibleItems.map((products) => {

                const {id, name, slug, description, price, weight, count, image: {fluid}} = products
                return (
                    <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                          item xs={12} sm={6} md={3} key={id}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="menu">
                                        <Img style={{width: 50}} fluid={image.fluid} alt={name} />
                                    </Avatar>}
                                title={titleCategory}
                                subheader={<span itemProp="name">{name}</span>}/>
                            {slugCategogy === "/sety" &&
                            <CardMedia
                                className={classes.media}
                                title={name}>
                                <Link to={`${slugCategogy}/${slug}`}>
                                    <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`}}/>
                                </Link>
                            </CardMedia>
                            }
                            {slugCategogy !== "/sety" &&
                            <CardMedia
                                className={classes.media}
                                title={name}>
                                <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`}}/>
                            </CardMedia>
                            }
                            <CardContent style={{marginBottom: 0, paddingBottom: 0}}>
                                <Typography itemProp="description"
                                            className={slugCategogy === "/sety" || slugCategogy === "/kombo" || slugCategogy === "/hot-rolls" ||
                                            slugCategogy === "/branded-rolls" || slugCategogy === "/salaty" ? classes.deckript : classes.deckriptSmall}
                                            variant="caption"
                                            color="textSecondary"
                                            component="p">
                                    {description}
                                </Typography>

                                <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                    {/*total, count*/}
                                    <Grid style={{padding: 10}} container itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                        <Grid item xs={6}>
                                            <Paper style={{width: `60%`, margin: `0 auto`}}>
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}} itemProp="price">{slugCategogy ===
                                                "/sety" || slugCategogy === "/napitki" ? `${weight}кг` : `${weight}гр`}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Paper style={{width: `60%`, margin: `0 auto`}}>
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}}>{slugCategogy ===
                                                "/souses" || "/napitki" ? "1шт" : `${count}шт`}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                component="p"
                                                variant="overline"
                                                style={{fontSize: 16, margin: `0 auto`, width: `50%`, textAlign: `center`}}
                                                itemProp="price"
                                                // classes={{overline: classes.overline}}
                                            >
                                                {slugCategogy === "/pizza" ? `от ${price}₽` : `${price}₽`}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </div>
                            </CardContent>

                            <CardActions disableSpacing>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    // startIcon={<ShoppingBasketIcon/>}
                                    onClick={() => dispatch(addedToCart({id, productPrice: null, product}))}>
                                    {/*Хочу */}
                                <ShoppingCartIcon/>
                                </Button>

                                {  slugCategogy === "/sety" ||
                                slugCategogy === "/pizza" ?
                                    <Button
                                        itemProp = "url"
                                        component={Link}
                                        to={`${slugCategogy}/${slug}`}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.buttonInfo}>
                                        {/*Подробнее */}
                                    <MoreIcon/>
                                    </Button> : null
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