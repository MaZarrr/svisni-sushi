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
import React from "react";
import {useStylesCart} from "./common/style";
import {addedToCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/More';
import ToggleButton from "./common/ToogleButton";

const CardsMenuPage = ({titleCategory, slugCategogy, visibleItems, image, product, dispatch }) => {
    const classes = useStylesCart();

    return (
        <>
            {visibleItems.map((products) => {

                const {id, name, slug, description, price, weight, count, edit, image: {fluid}} = products;
                return (
                    <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                          item xs={12} sm={6} md={3} key={id}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={slugCategogy !== "/wok" ? <Img style={{width: 40}} fluid={image.fluid} alt={name} /> : ''}
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
                                    {description}
                                </Typography>

                                {/*Кнопки выбора wok*/}
                                {slugCategogy === "/wok" && <ToggleButton id={id} productWok={visibleItems}/>}

                                <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                    {/*total, count*/}
                                    <Grid style={{padding: 10}} container itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                        <Grid item xs={6}>
                                            <Paper style={{width: `60%`, margin: `0 auto`}}>
                                                { slugCategogy !== "/napitki" &&
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}} itemProp="price">{slugCategogy ===
                                                "/sety" ? `${weight}кг` : `${weight}гр`}</Typography>
                                                }
                                                { slugCategogy === "/napitki" &&
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}} itemProp="price">{weight}л</Typography>
                                                }
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Paper style={{width: `60%`, margin: `0 auto`}}>
                                                <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}}>{slugCategogy ===
                                                "/souses" || slugCategogy === "/napitki" || slugCategogy === "/salaty" ? "1шт" : `${count}шт`}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                component="p"
                                                variant="overline"
                                                style={{fontSize: 20, margin: `0 auto`, width: `70%`, textAlign: `center`}}
                                                itemProp="price"
                                            >
                                                {slugCategogy === "/pizza" ? `от ${price}₽` : `${price}₽`}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </div>
                            </CardContent>

                            <CardActions disableSpacing>

                                {/* Проверка - комбо редактируется или нет */}
                                {edit === false &&
                                <Button
                                    variant="contained"
                                    className={classes.button}
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
                                        style={{backgroundColor: "orange"}}>
                                        Выбрать
                                    </Button> : null
                                }

                                {/*Показывать корзину для всех путей*/}
                                { slugCategogy !== "/kombo" &&
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => dispatch(addedToCart({id, productPrice: null, product}))}>
                                    <ShoppingCartIcon/>
                                </Button>
                                }

                                {/*Показывать переход на эти пути*/}
                                { slugCategogy === "/sety" ||
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
};

export default connect(null, null)(CardsMenuPage)