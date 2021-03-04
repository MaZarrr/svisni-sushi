import React, { useEffect } from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
// import { useStylesCart } from '../components/common/style';
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import * as R from 'ramda'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { productPizzaLoaded } from "../reducers/app";
import { defFilters } from "../reducers/filters";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Img from "gatsby-image";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { addedToCart, pizzaCart } from "../reducers/shopping-cart";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import SplitButton from "../components/SplitButton";
import { productList } from "../reducers/selectors";
import HeadSection from "../components/HeadSection"
import { makeStyles } from "@material-ui/core/styles"

const categoryNames = ['новинки', 'мясные', 'с колбасками', 'морские', 'вегетарианские', 'без грибов'];

const Pizza = ({ data: { allContentfulProductPizza: {edges: pizzaProduct}, contentfulIconMenuLeftPanel: {image} },
                   productPizza, searchText, priceFilter, dispatch, updatePizza: pizza, path }) => {

    const [load, setLoad] = React.useState(true);
    const classes = useStylesCart();

    useEffect(() => {
      let cleanupFunction = false;
        dispatch(productPizzaLoaded(pizzaProduct))
        dispatch(pizzaCart({productPizza: pizzaProduct}))
        if(!cleanupFunction) {
        setTimeout(() => {
            setLoad(false)
        }, 700);
    }
        dispatch(defFilters())
        return () => cleanupFunction = true
    }, [dispatch, pizzaProduct]);

    const updatePizza = R.defaultTo(productPizza, pizza);
    const visibleItems = filtersProducts(updatePizza, searchText, priceFilter);

    const switchSizePizza = data => dispatch(pizzaCart(data));

    return (
        <section>
            <SEO title="Заказать пиццу в Валуйки, доставка пиццы с 10 до 22:00"
                 description="Доставка пиццы в Валуйках на дом, 4я пицца бесплатно, именинникам дарим пиццу. Меню на сайте, большая пицца от 249 руб"
                  pathname=""/>
            <HeadSection titleTXT={"Доставка пиццы"} path={path} isFilter={true} categoryNames={categoryNames}/>
            { load === false ?
                <div>
                    <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                        {visibleItems.map((products) => {
                            const {id, name, pizzaSale,
                                slug, description,
                                price, weight, weight33, mass = weight, priceIn33cm,
                                count, total = price,
                                ingrideentButtonStyle = false,
                                image: {fluid}, ingrideents, sostav,
                                contentful_id, priceDef = price, size={[slug]: true},
                            } = products;

                            return (
                                <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                                      item xs={12} sm={6} md={4} lg={3} key={id}>
                                    <Card className={classes.card}>
                                        <CardHeader avatar={<Img style={{width: 40}} fluid={image.fluid} alt={name} />}
                                                    title={"Пицца"}
                                                    subheader={<span itemProp="name">
                                                      <Typography style={{fontWeight: 600}} variant={"subtitle1"}>
                                                        {name}</Typography></span>}/>
                                        <CardMedia
                                            className={classes.media}
                                            title={name}>
                                            <Img itemProp="image" fluid={fluid} alt={name}/>
                                        </CardMedia>
                                        <CardContent>
                                            {!pizzaSale &&
                                            <SplitButton id={id}
                                                         pizzaIng={updatePizza}
                                                         ingrideents={ingrideents}
                                                         sostav={sostav}
                                                         path={path}
                                                         ingrideentButtonStyle={ingrideentButtonStyle}
                                                         dir={"center"}/>
                                            }
                                            <Typography itemProp="description"
                                                        className={classes.deckriptPizza}
                                                        variant={"body2"}>
                                                {description}
                                            </Typography>

                                            {/*выбор размера пиццы*/}
                                            {/*проверка цены на 1 для того что бы убарать или показать выбор размеров пиццы*/}
                                            { priceIn33cm !== 1 &&
                                            <Grid container justify={"space-between"}>
                                                <Grid style={{padding: `0`, margin: 0}} item xs={5}>
                                                    <button onClick={() => switchSizePizza({
                                                        id,
                                                        productPizza: updatePizza,
                                                        total: priceDef,
                                                        priceDef,
                                                        size: slug,
                                                        mass: weight})}
                                                            className={clsx(classes.buttonD, {
                                                                [classes.buttonT]: size[slug]})}>
                                                        <Typography variant={"body1"}>Средняя</Typography></button>
                                                    <Typography style={{fontSize: 13, textAlign: `center`}}
                                                                variant={"subtitle2"}>28см</Typography>
                                                </Grid>
                                              <Grid item xs={2} style={{textAlign: "center", padding: `10px 0 0 0`}}>
                                                <p style={{fontSize: 15, margin: `0 auto`, fontWeight: `bold`}}>{`${mass}кг`}</p>
                                              </Grid>
                                                <Grid item xs={5}>
                                                    <button style={{paddingLeft: `auto`}} onClick={() => switchSizePizza({
                                                        id,
                                                        productPizza: updatePizza,
                                                        total: priceIn33cm,
                                                        priceDef,
                                                        size: contentful_id,
                                                        mass: weight33})}
                                                            className={clsx(classes.buttonD, {
                                                                [classes.buttonT]: size[contentful_id]})}>
                                                        <Typography variant={"body1"}>Большая</Typography></button>
                                                    <Typography style={{fontSize: 13, textAlign: `center`}} variant={"subtitle2"}>36см</Typography>
                                                </Grid>
                                            </Grid>
                                            }


                                        </CardContent>

                                        {/*total, count*/}
                                        <Grid container itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                            <Grid item xs={6}>
                                                <Paper style={{width: `85%`, margin: `0 auto`}}>
                                                    <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 600}} itemProp="price">{`от ${total}₽`}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper style={{width: `85%`, margin: `0 auto`}}>
                                                    <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 600}}>{`${count}шт`}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>

                                        <CardActions disableSpacing>
                                        { priceIn33cm !== 1 ?
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
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
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div> : <Spinner count={10}/>
            }
        </section>
    )
};

const mapStateToProps = (state) => ({
    productPizza: productList(state, true),
    searchText: state.filters.searchText,
    category: state.filters.category,
    priceFilter: state.filters.priceFilter
});

export default connect(mapStateToProps, null)(Pizza)

export const queryPizza = graphql `
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
                        fluid(maxWidth: 300) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        contentfulIconMenuLeftPanel(name: {eq: "Пицца"}) {
            image {
                fluid(maxWidth: 35) {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`

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
  deckriptPizza: {
    height: 80,
    overflowY: `auto`,
    padding: `10px 0 10px 0`,
    [theme.breakpoints.down('500')]: {
      // padding: `10px 0 10px 30px`,
      height: `auto`,
    }
  },
  deckript: {
    fontWeight: 600,
    height: 80,
    overflowY: `auto`,
    padding: 14,
    [theme.breakpoints.down('500')]: {
      padding: 10,
    },
    [theme.breakpoints.down('425')]: {
      height: `auto`,
      margin: `auto 0`,
      padding: `6px 6px 6px 14px`
    },
  },
  buttonD: {
    fontSize: 11,
    borderRadius: 5,
    padding: '6px 12px',
    border: '1px solid orange',
    lineHeight: 1.5,
    marginLeft: 5,
    width: `95%`
  },
  buttonT: {
    width: `95%`,
    borderRadius: 5,
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
    // [theme.breakpoints.down('600')]: {
    //   margin: `10px auto 30px auto`
    // },
    // [theme.breakpoints.up('960')]: {
    //   margin: `10px 5% 30px 5%`
    // },
    // [theme.breakpoints.down('959')]: {
    //   margin: `10px auto 30px auto`
    // },
    // [theme.breakpoints.up('1100')]: {
    //   margin: `10px auto 30px auto`
    // }
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

