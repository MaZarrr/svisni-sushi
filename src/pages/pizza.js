import React, { useEffect } from "react"
import Seo from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@mui/material";
import filtersProducts from '../utils/filtersProducts'
import * as R from 'ramda'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { defFilters } from "../reducers/filters";
import CardHeader from "@mui/material/CardHeader";
import { GatsbyImage } from "gatsby-plugin-image";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { productPizzaLoaded, spinnerLoading } from "../reducers/app";
import { checkedLoading, productList } from "../reducers/selectors";
import clsx from "clsx";
import Paper from "@mui/material/Paper";
import SplitButton from "../components/SplitButton";
import HeadSection from "../components/HeadSection"
import makeStyles from '@mui/styles/makeStyles';
import SpinnerNew from "../components/spinner/spinner-new";
import { addedToCart, pizzaCart } from "../reducers/shopping-cart";
import { CardStyle } from "../components/common/styles-components";

const categoryNames = ['новинки', 'мясные', 'с колбасками', 'морские', 'вегетарианские', 'без грибов'];
// const deleteDefaultIngrideents = ['зелень', 'грибы', 'лук репчатый', 'репчатый лук', 'лук', 'лук синий'];

const Pizza = ({ data: { allContentfulProductPizza: {edges: pizzaProduct}, contentfulIconMenuLeftPanel: {image} },
                   productPizza, searchText, priceFilter, dispatch, updatePizza: pizza, path, loading }) => {

    const classes = useStylesCart();

    useEffect(() => {
        dispatch(productPizzaLoaded(pizzaProduct))
        dispatch(pizzaCart({ productPizza: pizzaProduct }))
        dispatch(defFilters())
        dispatch(spinnerLoading(false))
    }, [dispatch, pizzaProduct]);

    const updatePizza = R.defaultTo(productPizza, pizza);
    const visibleItems = filtersProducts(updatePizza, searchText, priceFilter);
    const switchSizePizza = data => dispatch(pizzaCart(data));

    // const deleteIngrideents = ingrideents.filter(item => { 
    //     return deleteDefaultIngrideents.includes(item.nameI.trim())
    // })

    return (
        <section>
            <Seo title="Заказать пиццу в Валуйки, доставка пиццы с 10 до 22:00"
                 description="Доставка пиццы в Валуйках на дом, 4я пицца бесплатно, именинникам дарим пиццу. Меню на сайте, большая пицца от 249 руб"
                  pathname=""/>
            <HeadSection titleTXT={"Доставка пиццы"} path={path} isFilter={true} categoryNames={categoryNames} />
          {!loading ?
                    <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
                        { visibleItems.map((products) => {
                            const { id, name, pizzaSale,
                                slug, description,
                                price, weight, weight33, mass = weight, priceIn33cm,
                                count, total = price,
                                ingrideentButtonStyle = false,
                                image: {gatsbyImageData}, ingrideents, sostav,
                                contentful_id, priceDef = price, size={[slug]: true }
                            } = products;

                            return (
                                <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                                      item xs={12} sm={6} md={4} lg={3} key={id}>
                                    <CardStyle>
                                        <CardHeader avatar={<GatsbyImage image={image.gatsbyImageData} 
                                        style={{width: 40}} alt={name} />}
                                                    title={"Пицца"}
                                                    subheader={<span itemProp="name">
                                                      <Typography variant={"subtitle1"}>
                                                        {name}</Typography></span>}/>
                                        <CardMedia
                                            className={classes.media}
                                            title={name}>
                                            <GatsbyImage image={gatsbyImageData} itemProp="image" alt={name} />
                                        </CardMedia>
                                        <CardContent>
                                            {!pizzaSale && <Grid display="flex" justifyContent="space-between">
                                            <Grid item sx={{margin: 'auto'}}>
                                            <SplitButton id={id}
                                                         pizzaIng={updatePizza}
                                                         ingrideents={ingrideents}
                                                         sostav={sostav}
                                                         path={path}
                                                         addTodel="inc"
                                                         ingrideentButtonStyle={ingrideentButtonStyle}
                                                         dir={"center"}/>
                                            </Grid>
                                            <Grid item sx={{margin: 'auto'}}>
                                                    <Typography>
                                                        Ингридеенты
                                                    </Typography>
                                            </Grid>
                                            <Grid item sx={{margin: 'auto'}}>
                                            <SplitButton id={id}
                                                         pizzaIng={updatePizza}
                                                         ingrideents={ingrideents}
                                                         sostav={sostav}
                                                         path={path}
                                                         addTodel="deck"
                                                         ingrideentButtonStyle={ingrideentButtonStyle}
                                                         dir={"center"}/>
                                            </Grid>
                                            </Grid>
                                                         
                                            } 
                                            <Typography itemProp="description"
                                                        className={classes.deckriptPizza}
                                                        variant={"body2"}>
                                                {description}
                                            </Typography>

                                            {/*выбор размера пиццы*/}
                                            {/*проверка цены на 1 для того что бы убарать или показать выбор размеров пиццы*/}
                                            <div style={{marginTop: '10px'}}>
                                            { priceIn33cm !== 1 &&
                                            <Grid container justifyContent={"space-between"}>
                                                <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} item xs={5}>
                                                    <button onClick={() => switchSizePizza({
                                                        id,
                                                        productPizza: updatePizza,
                                                        total: priceDef,
                                                        priceDef,
                                                        size: slug,
                                                        mass: weight})}
                                                            className={clsx(classes.buttonD, {
                                                                [classes.buttonT]: size[slug]})}>
                                                    <Typography  style={{margin: 'auto'}} variant={"subtitle2"}>Средняя</Typography></button>
                                                    <Typography style={{textAlign: `center`}}
                                                                variant={"subtitle2"}>28см</Typography>
                                                </Grid>
                                              <Grid item xs={2}>
                                                <p style={{margin: `10px auto 0 auto`, fontWeight: 'bold', fontSize: 14, textAlign: 'center'}}>{`${mass}кг`}</p>
                                              </Grid>
                                                <Grid item xs={5} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                    <button style={{paddingLeft: `auto`}} 
                                                    onClick={() => switchSizePizza({
                                                        id,
                                                        productPizza: updatePizza,
                                                        total: priceIn33cm,
                                                        priceDef,
                                                        size: contentful_id,
                                                        mass: weight33})}
                                                        className={clsx(classes.buttonD, {
                                                                [classes.buttonT]: size[contentful_id]})}>
                                                        <Typography
                                                         style={{margin: 'auto'}}
                                                        variant={"subtitle2"}>Большая</Typography></button>
                                                    <Typography 
                                                    style={{textAlign: `center`}} 
                                                    variant={"subtitle2"}>41см</Typography>
                                                </Grid>
                                            </Grid>
                                            }
                                            </div>

                                        </CardContent>

                                        {/*total, count*/}
                                        <Grid container itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                            <Grid item xs={6}>
                                                <Paper style={{width: `85%`, margin: `0 auto`}}>
                                                    <Typography 
                                                    variant="body1" 
                                                    style={{textAlign: `center`}} 
                                                    itemProp="price">{`от ${total}₽`}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper style={{width: `85%`, margin: `0 auto`}}>
                                                    <Typography 
                                                    variant="body1" 
                                                    style={{textAlign: `center`}}>{`${count}шт`}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>

                                        <CardActions disableSpacing>
                                        { priceIn33cm !== 1 ?
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                style={{ color: 'white', marginTop: 10 }}
                                                onClick={() => dispatch(addedToCart({id, productPrice: null, product: updatePizza}))}>
                                                <ShoppingCartIcon/></Button> : <Button
                                                itemProp="url"
                                                component={Link}
                                                to={`/${slug}`}
                                                variant="contained"
                                                style={{ backgroundColor: "orange", color: 'white', marginTop: 10 }}>
                                                Выбрать
                                            </Button>
                                        }
                                        </CardActions>
                                    </CardStyle>
                                </Grid>
                            );
                        })}
                    </Grid>
            : <SpinnerNew /> }
        </section>
    );
};

const mapStateToProps = (state) => ({
    productPizza: productList(state, true),
    loading: checkedLoading(state),
    searchText: state.filters.searchText,
    category: state.filters.category,
    priceFilter: state.filters.priceFilter
});

export default connect(mapStateToProps, null)(Pizza)

export const query = graphql `
    {
        allContentfulProductPizza  {
            edges {
                node {
                    id
                    contentful_id
                    slug
                    name
                    price
                    count
                    filter
                    priceIn33cm
                    pizzaSale
                    weight
                    weight33
                    description
                    image {
                      gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                  }
                }
            }
        }
        contentfulIconMenuLeftPanel(name: {eq: "Пицца"}) {
            image {
                gatsbyImageData
              }
        }
    }
`

const useStylesCart = makeStyles(theme => ({
    deckriptPizza: {
        height: 80,
        overflowY: `auto`,
        padding: `10px 0 10px 0`,
        [theme.breakpoints.down('500')]: {
          height: `auto`,
        }
      },
    buttonD: {
        borderRadius: 8,
        padding: '6px 12px',
        border: '1px solid orange',
        display: "flex",
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