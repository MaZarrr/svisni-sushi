import React, {useEffect} from "react"
import SEO from "../components/seo"
import {graphql } from "gatsby";
import { connect } from 'react-redux';
import { useStylesCart} from '../components/common/style';
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import * as R from 'ramda'

import loadable from "@loadable/component";
import {productPizzaLoaded} from "../reducers/app";
import {defFilters} from "../reducers/filters";
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
import {addedToCart, pizzaCart} from "../reducers/shopping-cart";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import SplitButton from "../components/SplitButton";
import TransferList from "../components/TransferList";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
// const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Pizza = ({data: {allContentfulProductPizza: {edges: pizzaProduct, nodes}, contentfulIconMenuLeftPanel: {image}},
     productPizza, searchText, priceFilter, dispatch, updatePizza: pizza}) => {
    // console.log(nodes.map((el) => el.ing).map((el) => Object.keys(el)))
    const [load, setLoad] = React.useState(true)
    const classes = useStylesCart();

    const updatePizza = R.defaultTo(productPizza, pizza)

    useEffect(() => {
          if(!R.isEmpty(productPizza)) {
            setLoad(false)
              dispatch(defFilters())
            return
          }
          const ProductFetch = async () => {
            return await pizzaProduct
          }
          ProductFetch()
           .then((data) => dispatch(productPizzaLoaded(data)))
           .then(() => setLoad(false))
            .then(() => dispatch(defFilters()))
      }, [productPizza, dispatch, pizzaProduct])

    const visibleItems = filtersProducts(updatePizza, searchText, priceFilter)

return ( 
   <section>
    <SEO title="Заказать пиццу в Валуйки, доставка пиццы с 10:00 до 22:00"
        description="Заказать пиццу в Валуйках с доставкой на дом. Меню свисни пицца в Валуйки от 235 руб"
        pathname="/sety"/>
      <div className={classes.titleH1}>
        <h1 style={{fontFamily: `Oswald, cursive`,
        fontWeight: 600, fontSize: 40}}>Пицца</h1>
      </div>
       { load === false ?
           <div>
               <CustomizedInputSearch/>
               <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                   {visibleItems.map((products) => {
                       const {id, name,
                           slug, description,
                           price, weight, mass = weight, priceIn33cm,
                           count, total = price,
                           image: {fluid}, contentful_id, priceDefault = price, size={[slug]: true,

                           }} = products
                       return (
                           <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                                 item xs={12} sm={6} md={"auto"} lg={3} key={id}>
                               <Card className={classes.card}>
                                   <CardHeader
                                       avatar={
                                           <Avatar aria-label="menu">
                                               <Img style={{width: 50}} fluid={image.fluid} alt={name} />
                                           </Avatar>}
                                       title={"Пицца"}
                                       subheader={<span itemProp="name">{name}</span>}/>
                                   <CardMedia
                                       className={classes.media}
                                       title={name}>
                                       <Img itemProp="image" fluid={fluid} alt={name} style={{maxWidth: `100%`}}/>
                                   </CardMedia>
                                    {/*<SplitButton/>*/}
                                   <CardContent>
                                       <Typography itemProp="description"
                                                   className={classes.deckript}
                                                   variant="caption"
                                                   color="textSecondary"
                                                   component="p">
                                           {description}
                                       </Typography>
                                       <Grid  container alignItems="center">
                                           <Grid item xs={5}>
                                       <button onClick={() => dispatch(pizzaCart({id,
                                           productPizza,
                                           total: priceDefault,
                                           priceDefault: price,
                                            size: slug,
                                            mass: 0.45
                                       }))}
                                           className={clsx(classes.buttonD, {
                                                   [classes.buttonT]: size[slug]})}>
                                           Маленькая</button> </Grid>
                                           <Grid item xs={2}>
                                               <p style={{padding: `auto 4px auto 4px`, fontSize: 16}}>{`${mass}г`}</p>
                                           </Grid>
                                           <Grid item xs={5}>
                                           <button onClick={() => dispatch(pizzaCart({id, productPizza,
                                            total: priceIn33cm,
                                            priceDefault: price,
                                            size: contentful_id,
                                            mass: 0.63
                                           }))}
                                           className={clsx(classes.buttonD, {
                                               [classes.buttonT]: size[contentful_id]})}>
                                               Большая</button></Grid>
                                       </Grid>

                                   </CardContent>
                                   <Grid container itemProp="offers" itemScope itemType="http://schema.org/Offer">

                                       <Grid item xs={6}>
                                           <Paper style={{width: `50%`, margin: `0 auto`}}>
                                               <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}} itemProp="price">{`${total}₽`}</Typography>
                                           </Paper>
                                           </Grid>
                                       <Grid item xs={6}>
                                       <Paper style={{width: `50%`, margin: `0 auto`}}>
                                       <Typography variant="subtitle1" style={{textAlign: `center`, fontWeight: 500}}>{`${count}шт`}</Typography>
                                       </Paper>
                                   </Grid>
                                   </Grid>
                                   <CardActions disableSpacing>
                                       <Button
                                           variant="contained"
                                           color="secondary"
                                           className={classes.button}
                                           startIcon={<ShoppingBasketIcon/>}
                                           onClick={() => dispatch(addedToCart({id, productPrice: null, product: updatePizza}))}>
                                           Хочу </Button>

                                           {/*<Button*/}
                                           {/*    itemProp = "url"*/}
                                           {/*    component={Link}*/}
                                           {/*    to={`/pizza/${slug}`}*/}
                                           {/*    variant="contained"*/}
                                           {/*    color="secondary"*/}
                                           {/*    className={classes.buttonInfo}>*/}
                                           {/*    Подробнее </Button>*/}
                                   </CardActions>
                               </Card>
                           </Grid>
                       )
                   })}
               </Grid>
           </div> : <Spinner/>
       }
  </section>
    )
}

const mapStateToProps = (state, props) => ({
    productPizza: state.app.productPizza,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter,
    updatePizza: state.shoppingCart.newPizza
})

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
                priceIn33cm
                weight
                description
                image {
                  fluid(maxWidth: 300, maxHeight: 300, quality: 30) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
            nodes {
                ing {
                    ingrideent1 {
                        name
                        price
                    }
                    ingrideent2 {
                        name
                        price
                    }
                    ingrideent3 {
                        name
                        price
                    }
                    ingrideent4 {
                        name
                        price
                    }
                    ingrideent5 {
                        name
                        price
                    }
                    ingrideent6 {
                        name
                        price
                    }
                    ingrideent7 {
                        name
                        price
                    }
                    ingrideent8 {
                        name
                        price
                    }
                    ingrideent9 {
                        name
                        price
                    }
                    ingrideent10 {
                        name
                        price
                    }
                    ingrideent11 {
                        name
                        price
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





