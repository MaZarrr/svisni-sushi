import React, { memo } from "react";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { addedToCart } from "../reducers/shopping-cart";
import { take } from "ramda";
import loadable from "@loadable/component";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Button from '@mui/material/Button'
import makeStyles from '@mui/styles/makeStyles';
import { CardStyle } from "./common/styles-components";
import { connect } from "react-redux";

const Paper = loadable(() => import('@mui/material/Paper'))
const ToggleButton = loadable(() => import("./common/ToogleButton"));

const CardsMenuPage = memo(({ 
    titleCategory, 
    slugCategogy, 
    visibleItems, // изменил вместо product в addedToCart и вок работает
    // image,
    product, 
    dispatch, 
    timePrice, 
    isSale }) => {

    const classes = useStylesCart();
    // console.log("visibleItems____", visibleItems);
    return <>
        { visibleItems.map((products) => {
            const { 
                id, name, slug, description,
                price, weight = "от 150", count = 1,
                edit, komboSale, variant = false,
                image: { gatsbyImageData },
                wok, isWok,
                sale, nonprice, lanchprice, lanch, defaultPrice
            } = products;

            return (
                <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                      item xs={12} sm={6} md={4} lg={3} key={id}>
                    <CardStyle>
                        <CardHeader
                            // avatar={slugCategogy !== "/wok" ? <GatsbyImage image={image.gatsbyImageData} style={{width: 40}} alt={name} /> : ''}
                            title={variant ? variant : titleCategory}
                            subheader={<span itemProp="name">
                                <Typography variant={"subtitle1"}>{name}</Typography></span>}/>
                        { slugCategogy === "/sety" &&
                        <CardMedia
                            className={classes.media}
                            title={name}>

                            {!komboSale &&
                                <Link to={slug ? `${slugCategogy}/${slug}` : `${slugCategogy}/`}>
                                    <GatsbyImage 
                                    image={gatsbyImageData} 
                                    itemProp="image" 
                                    alt={name} 
                                    style={{maxWidth: `100%`}} />
                                </Link>
                            }

                            {komboSale &&
                            <Link to={`/${slug}`}>
                                <GatsbyImage 
                                image={gatsbyImageData} 
                                itemProp="image" 
                                alt={name} 
                                style={{maxWidth: `100%`}} />
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
                                <GatsbyImage 
                                image={gatsbyImageData} 
                                itemProp="image" 
                                alt={name} 
                                style={{maxWidth: `100%`}} />
                            </Link>
                            }
                            {!edit &&
                            <GatsbyImage 
                                image={gatsbyImageData} 
                                itemProp="image" 
                                alt={name} 
                                style={{maxWidth: `100%`}} />
                            }
                        </CardMedia>
                        }


                        {slugCategogy !== "/sety" && slugCategogy !== "/kombo" &&
                        <CardMedia
                            className={classes.media}
                            title={name}>
                            <div style={{position: `relative`}}>
                                <GatsbyImage
                                    image={gatsbyImageData}
                                    itemProp="image"
                                    alt={name}
                                    style={{maxWidth: `100%`, margin: 0}} />
                                {/* {slugCategogy === "/wok" &&
                                <div style={{position: `absolute`, width: 50, height: 50, zIndex: 100}}>
                                    <GatsbyImage
                                        image={image.gatsbyImageData}
                                        style={{maxWidth: 50, bottom: 45, marginLeft: 15}}
                                        alt={"Коробка wok box"} />
                                    <div style={{position: `absolute`, bottom: 60, left: 55, width: 180}}>
                                        <Typography variant={"subtitle2"}>
                                            Доставим в коробке</Typography>
                                    </div>
                                </div>
                                } */}
                            </div>
                        </CardMedia>
                        }

                        <CardContent style={{marginBottom: 0, padding: 0}}>
                            {sale &&
                            <div style={{padding: 5, border: `1px solid lightgrey`, borderRadius: 5, margin: `8px 14px 8px 14px`}}>
                            {/* Выгода */}
                                { lanch && (slugCategogy === "/sety" || slugCategogy === "/branded-rolls") && (
                                    <Typography variant={"body1"}>
                                      <span role="img" aria-label="accessible-emoji">  ⏱️ </span>{timePrice.hours}:{timePrice.minutes}:{timePrice.seconds}</Typography>
                                )}

                                { sale && <Typography variant={"subtitle2"} 
                                style={{
                                        color: `tomato`,
                                        fontWeight: `bold`}}>
                                    {slugCategogy === "/sety" && <>

                                    {lanch && <> Выгода {!isSale ? nonprice - defaultPrice : nonprice - lanchprice}₽</>}
                                    {!lanch && `Выгода ${nonprice - price} ₽`}
                                    {lanch &&
                                        <span style={{
                                        textDecoration: `line-through`,
                                        fontWeight: 500,
                                        color: `#000`,
                                        paddingLeft: 20,
                                        textDecorationColor: `red`
                                    }}>{isSale ? nonprice - defaultPrice : nonprice - lanchprice} ₽</span>
                                    }
                                    </>}
                            </Typography>}
                            </div>}

                            <Typography itemProp="description"
                                        className={classes.deckript}
                                        // className={slugCategogy === "/sety" ||
                                        // slugCategogy === "/kombo" ||
                                        // slugCategogy === "/hot-rolls" ||
                                        // slugCategogy === "/branded-rolls" ||
                                        // slugCategogy === "/salaty" ||
                                        // slugCategogy === "/wok" ||
                                        // slugCategogy === "/zakyski" ? classes.deckript : classes.deckriptSmall}
                                        variant="body2">

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
                                            <Typography variant="subtitle2" style={{textAlign: `center`}}>{slugCategogy ===
                                            "/sety" ? `${weight}кг` : `${weight}гр`}</Typography>
                                            }
                                            { slugCategogy === "/napitki" &&
                                            <Typography variant="subtitle2" style={{textAlign: `center`}}>{weight}л</Typography>
                                            }
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper style={{width: `90%`, margin: `0 auto`}}>
                                            <Typography variant="subtitle2" style={{textAlign: `center`}}>{slugCategogy ===
                                            "/souses" || slugCategogy === "/napitki" || slugCategogy === "/salaty" ? "1шт" : `${count}шт`}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {/*Показывать корзину для всех путей*/}
                                        {/* { slugCategogy !== "/kombo" && !komboSale && */}
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            style={{color: `white`, marginTop: 10}}
                                            onClick={() => dispatch(addedToCart({id, productPrice: null, product: visibleItems}))}>
                                            <ShoppingCartIcon/>
                                        </Button>
                                        {/* } */}

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
                                            style={{ backgroundColor: "orange", color: 'white', marginTop: 10 }}>
                                            Выбрать
                                        </Button>
                                        }

                                        {/* Проверка - комбо редактируется или нет */}
                                        {edit === false &&
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            style={{ color: 'white', marginTop: 10 }}
                                            onClick={() => dispatch(addedToCart({id, productPrice: null, product: visibleItems}))}>
                                            <ShoppingCartIcon/>
                                        </Button>
                                        }

                                    </Grid>

                                    {/* Цена */}
                                    <Grid item xs={6} style={{
                                        position: `relative`, 
                                        textAlign: 'center', 
                                        margin: 'auto 0',
                                        paddingRight: 15}}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ margin: `0 auto`, width: `85%`}}
                                            itemProp="price">

                                            { lanch && <>
                                                    {!isSale ? `${price}₽` : <span style={{color: `tomato`, fontWeight: `bold`}}>{lanchprice}₽</span>}</>

                                            }

                                            {!lanch && `${price} ₽`}
                                        </Typography>

                                        {lanch && isSale &&
                                        <div style={{position: `absolute`, bottom: 0, right: 5}}>
                                            <Typography style={{textDecoration: `line-through`, color: `#000`,
                                            textDecorationColor: `red`,  fontWeight: 600}} variant="subtitle1">{defaultPrice}</Typography>
                                        </div>
                                        }
                                        {lanch && !isSale &&
                                        <div style={{position: `absolute`,  bottom: 0, right: 2}}>
                                            <Typography style={{textDecoration: `line-through`, color: `red`,
                                                textDecorationColor: `#000`}} variant="subtitle1">{lanchprice}</Typography>
                                        </div>
                                        }
                                    </Grid>
                                </Grid>

                            </div>
                        </CardContent>

                    </CardStyle>
                </Grid>
            );
        })}
    </>;
});

export default connect(null, null)(CardsMenuPage)

export const useStylesCart = makeStyles(theme => ({
    deckript: {
        height: 80,
        padding: 14,
        [theme.breakpoints.down('500')]: {
            padding: 10,
        },
        [theme.breakpoints.down('425')]: {
            height: `auto`,
            margin: `auto 0`,
            padding: `5px 5px 5px 14px`
        },
    },
    buttonD: {
        borderRadius: 8,
        padding: '6px 12px',
        border: '1px solid orange',
        lineHeight: 1.5,
        width: 105,
    },
    buttonT: {
        width: 105,
        borderRadius: 8,
        padding: '6px 12px',
        border: '1px solid orange',
        lineHeight: 1.5,
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'orange',
        },
        '&:focus': {
            boxShadow: 'none',
            backgroundColor: 'orange',
        },
        backgroundColor: 'orange'
    },
    media: {
        width: `99%`,
        margin: `0 auto`
    },
    button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
}));
