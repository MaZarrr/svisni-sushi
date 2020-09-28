import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Img from "gatsby-image";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "gatsby";
import React, {memo} from "react";
import {useStylesCart} from "./common/style";
import {addedToCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ToggleButton from "./common/ToogleButton";
import { take } from "ramda";

const CardsMenuPage = memo(({titleCategory, slugCategogy, visibleItems, image, product, dispatch }) => {
    const classes = useStylesCart();

    return (
        <>

            { visibleItems.map((products) => {

                const {id, name, slug, description, price, weight, count, edit, komboSale, variant = false, image: {fluid}} = products;

                return (
                    <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                          item xs={12} sm={6} md={3} key={id}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={slugCategogy !== "/wok" ? <Img style={{width: 40}} fluid={image.fluid} alt={name} /> : ''}
                                title={variant ? variant : titleCategory}
                                subheader={<span itemProp="name"><Typography style={{fontSize: 18}} variant={"subtitle2"}>{name}</Typography></span>}/>
                            { slugCategogy === "/sety" &&
                            <CardMedia
                                className={classes.media}
                                title={name}>

                                {!komboSale &&
                                    <Link to={`${slugCategogy}/${slug}`}>
                                        <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`}}/>
                                    </Link>
                                }

                                {komboSale &&
                                <Link to={`/${slug}`}>
                                    <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`}}/>
                                </Link>
                                }

                            </CardMedia>
                            }

                            { slugCategogy === "/kombo" &&
                            <CardMedia
                                className={classes.media}
                                title={name}>

                                {edit &&
                                <Link to={`${slugCategogy}/${slug}`}>
                                    <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`}}/>
                                </Link>
                                }
                                {!edit &&
                                <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`}}/>
                                }
                            </CardMedia>
                            }


                            {slugCategogy !== "/sety" && slugCategogy !== "/kombo" &&
                            <CardMedia
                                className={classes.media}
                                title={name}>
                                <div style={{position: `relative`}}>
                                    <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`, margin: 0}}/>
                                    {slugCategogy === "/wok" &&
                                    <div style={{position: `absolute`, width: 50, height: 50, zIndex: 100}}>
                                        <Img style={{maxWidth: 50, bottom: 45, marginLeft: 15}} fluid={image.fluid}
                                             alt={"Коробка wok box"}/>
                                        <div style={{position: `absolute`, bottom: 60, left: 55, width: 180}}>
                                            <Typography style={{fontSize: 13}} variant={"subtitle2"}>
                                                Доставим в коробке</Typography>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </CardMedia>
                            }
                            <CardContent style={{marginBottom: 0, paddingBottom: 0, paddingTop: 0}}>
                                <Typography itemProp="description"
                                            className={slugCategogy === "/sety" || slugCategogy === "/kombo" || slugCategogy === "/hot-rolls" ||
                                            slugCategogy === "/branded-rolls" || slugCategogy === "/salaty" || slugCategogy === "/wok" ? classes.deckript : classes.deckriptSmall}
                                            variant="body2"
                                            color="textSecondary">

                                    { slugCategogy === "/sety" && !komboSale &&
                                        <Link to={`${slugCategogy}/${slug}`}> {`${take(50, description)}...` }</Link>
                                    }

                                    { komboSale && slugCategogy === "/sety" &&
                                    <Link to={`/${slug}`}> {`${take(50, description)}...` }</Link>
                                    }

                                    { slugCategogy === "/kombo" && edit &&
                                        <Link to={`${slugCategogy}/${slug}`}> {`${take(50, description)}...` }</Link>
                                    }

                                    { slugCategogy === "/kombo" && !edit &&
                                        description
                                    }

                                    {slugCategogy !== "/sety" && slugCategogy !== "/kombo" &&
                                        description
                                    }
                                </Typography>

                                {/*Кнопки выбора wok*/}
                                {slugCategogy === "/wok" && <ToggleButton id={id} productWok={visibleItems}/>}

                                <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                    {/*total, count*/}
                                    <Grid style={{padding: 10}} container itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                        <Grid item xs={6}>
                                            <Paper style={{width: `90%`, margin: `0 auto`}}>
                                                { slugCategogy !== "/napitki" &&
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}}>{slugCategogy ===
                                                "/sety" ? `${weight}кг` : `${weight}гр`}</Typography>
                                                }
                                                { slugCategogy === "/napitki" &&
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}}>{weight}л</Typography>
                                                }
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Paper style={{width: `90%`, margin: `0 auto`}}>
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}}>{slugCategogy ===
                                                "/souses" || slugCategogy === "/napitki" || slugCategogy === "/salaty" ? "1шт" : `${count}шт`}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {/*Показывать корзину для всех путей*/}
                                            { slugCategogy !== "/kombo" && !komboSale &&
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                style={{color: `white`}}
                                                onClick={() => dispatch(addedToCart({id, productPrice: null, product}))}>
                                                <ShoppingCartIcon/>
                                            </Button>
                                            }

                                            {/*Показывать кнопку редактирования комбо*/}
                                            { edit === true ?
                                                <Button
                                                    itemProp="url"
                                                    component={Link}
                                                    to={`${slugCategogy}/${slug}`}
                                                    variant="contained"
                                                    style={{backgroundColor: "orange", color: 'white', marginTop: 10}}>
                                                    Выбрать
                                                </Button> : null
                                            }

                                            { slugCategogy === "/sety" && komboSale &&
                                            <Button
                                                itemProp="url"
                                                component={Link}
                                                to={`/${slug}`}
                                                variant="contained"
                                                style={{backgroundColor: "orange", color: 'white', marginTop: 10}}>
                                                Выбрать
                                            </Button>
                                            }

                                            {/* Проверка - комбо редактируется или нет */}
                                            {edit === false &&
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                style={{color: 'white'}}
                                                onClick={() => dispatch(addedToCart({id, productPrice: null, product}))}>
                                                <ShoppingCartIcon/>
                                            </Button>
                                            }

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                component="p"
                                                variant="overline"
                                                style={{fontSize: 20, margin: `0 auto`, width: `85%`, textAlign: `center`}}
                                                itemProp="price"
                                            >
                                                {`${price}₽`}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </div>
                            </CardContent>

                            <CardActions disableSpacing>

                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </>
    )
});

export default connect(null, null)(CardsMenuPage)