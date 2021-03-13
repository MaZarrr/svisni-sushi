import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { GatsbyImage } from "gatsby-plugin-image";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import React, { memo } from "react";
import { addedToCart } from "../reducers/shopping-cart";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { take } from "ramda";
import loadable from "@loadable/component";
import { makeStyles } from "@material-ui/core/styles"

const ToggleButton = loadable(() => import("./common/ToogleButton"));

const CardsMenuPage = memo(({ titleCategory, slugCategogy, visibleItems, image, product, dispatch, timePrice, isSale }) => {
    const classes = useStylesCart();

    return <>
        { visibleItems.map((products) => {

            const {id, name, slug, description,
                price, weight, count,
                edit, komboSale, variant = false,
                image: { gatsbyImageData }, sale, nonprice, lanchprice, lanch, defaultPrice} = products;
            return (
                <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                      item xs={12} sm={6} md={4} lg={3} key={id}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={slugCategogy !== "/wok" ? <GatsbyImage image={image.gatsbyImageData} style={{width: 40}} alt={name} /> : ''}
                            title={variant ? variant : titleCategory}
                            subheader={<span itemProp="name"><Typography style={{ fontWeight: 600 }} variant={"subtitle1"}>{name}</Typography></span>}/>
                        { slugCategogy === "/sety" &&
                        <CardMedia
                            className={classes.media}
                            title={name}>

                            {!komboSale &&
                                <Link to={`${slugCategogy}/${slug}`}>
                                    <GatsbyImage image={gatsbyImageData} itemProp="image" alt={name} style={{maxWidth: `100%`}} />
                                </Link>
                            }

                            {komboSale &&
                            <Link to={`/${slug}`}>
                                <GatsbyImage image={gatsbyImageData} itemProp="image" alt={name} style={{maxWidth: `100%`}} />
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
                                <GatsbyImage image={gatsbyImageData} itemProp="image" alt={name} style={{maxWidth: `100%`}} />
                            </Link>
                            }
                            {!edit &&
                            <GatsbyImage image={gatsbyImageData} itemProp="image" alt={name} style={{maxWidth: `100%`}} />
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
                                {slugCategogy === "/wok" &&
                                <div style={{position: `absolute`, width: 50, height: 50, zIndex: 100}}>
                                    <GatsbyImage
                                        image={image.gatsbyImageData}
                                        style={{maxWidth: 50, bottom: 45, marginLeft: 15}}
                                        alt={"Коробка wok box"} />
                                    <div style={{position: `absolute`, bottom: 60, left: 55, width: 180}}>
                                        <Typography style={{fontSize: 13}} variant={"subtitle2"}>
                                            Доставим в коробке</Typography>
                                    </div>
                                </div>
                                }
                            </div>
                        </CardMedia>
                        }

                        <CardContent style={{marginBottom: 0, padding: 0}}>
                            {sale &&
                            <div style={{padding: 5, border: `1px solid lightgrey`, borderRadius: 5, margin: `8px 14px 8px 14px`}}>
                            {/* Выгода */}
                                { lanch && (slugCategogy === "/sety" || slugCategogy === "/branded-rolls") && (
                                    <Typography variant={"subtitle2"} style={{
                                        fontSize: 16,
                                        fontWeight: `bold`}}>
                                      <span role="img" aria-label="accessible-emoji">  ⏱️ </span>{timePrice.hours}:{timePrice.minutes}:{timePrice.seconds}</Typography>
                                )}

                                { sale && <Typography variant={"subtitle1"} style={{
                                        fontSize: 16,
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
                                        className={slugCategogy === "/sety" ||
                                        slugCategogy === "/kombo" ||
                                        slugCategogy === "/hot-rolls" ||
                                        slugCategogy === "/branded-rolls" ||
                                        slugCategogy === "/salaty" ||
                                        slugCategogy === "/wok" ||
                                        slugCategogy === "/zakyski" ? classes.deckript : classes.deckriptSmall}
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
                                            style={{color: `white`, marginTop: 10}}
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
                                            onClick={() => dispatch(addedToCart({id, productPrice: null, product}))}>
                                            <ShoppingCartIcon/>
                                        </Button>
                                        }

                                    </Grid>

                                    {/* Цена */}
                                    <Grid item xs={6} style={{position: `relative`, textAlign: 'center', paddingRight: 15}}>
                                        <Typography
                                            variant="overline"
                                            style={{fontSize: 22, margin: `0 auto`, width: `85%`, fontWeight: `bold`}}
                                            itemProp="price">

                                            { lanch && <>
                                                    {!isSale ? `${price}₽` : <span style={{color: `tomato`, fontWeight: `bold`}}>{lanchprice}₽</span>}</>

                                            }

                                            {!lanch && `${price} ₽`}
                                        </Typography>

                                        {lanch && isSale &&
                                        <div style={{position: `absolute`, bottom: 12, right: 5}}>
                                            <Typography style={{textDecoration: `line-through`, color: `#000`,
                                            textDecorationColor: `red`, fontSize: 19, fontWeight: 600}} variant={"subtitle1"}>{defaultPrice}</Typography>
                                        </div>
                                        }
                                        {lanch && !isSale &&
                                        <div style={{position: `absolute`, bottom: 12, right: 2}}>
                                            <Typography style={{textDecoration: `line-through`, color: `red`,
                                                textDecorationColor: `#000`, fontSize: 19, fontWeight: 600}} variant={"subtitle1"}>{lanchprice}</Typography>
                                        </div>
                                        }
                                    </Grid>
                                </Grid>

                            </div>
                        </CardContent>

                        <CardActions disableSpacing>

                        </CardActions>
                    </Card>
                </Grid>
            );
        })}
    </>;
});

export default connect(null, null)(CardsMenuPage)

export const useStylesCart = makeStyles(theme => ({
    deckriptSmall: {
        fontWeight: 600,
        height: 35,
        overflowY: `auto`,
        padding: 14,
        [theme.breakpoints.down('500')]: {
            minHeight: `20px`,
            padding: 14,
        },
        [theme.breakpoints.down('425')]: {
            margin: `auto 0`,
            padding: 14,
            height: `auto`,
        },
    },
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
        fontSize: 11,
        borderRadius: 8,
        padding: '6px 12px',
        border: '1px solid orange',
        lineHeight: 1.5,
        width: 105,
    },
    buttonT: {
        width: 105,
        borderRadius: 8,
        fontSize: 11,
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
    card: {
        maxWidth: `350px`,
        margin: `20px auto 10px auto`,
        [theme.breakpoints.up('1900')]: {
            maxWidth: `400px`,
        },
        [theme.breakpoints.down('1281')]: {
            maxWidth: `300px`,
        },
        [theme.breakpoints.down('600')]: {
            maxWidth: `400px`,
        },
        [theme.breakpoints.down('475')]: {
            maxWidth: `340px`,
        },
        [theme.breakpoints.down('376')]: {
            maxWidth: `320px`,
        },
        [theme.breakpoints.down('340')]: {
            maxWidth: `280px`,
        },
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
