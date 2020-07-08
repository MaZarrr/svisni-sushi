import React, {useEffect} from "react"
import SEO from "../components/seo"
import {graphql } from "gatsby";
import { connect } from 'react-redux';
import { useStylesCart} from '../components/common/style';
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import * as R from 'ramda'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
import {addedToCart, pizzaCart} from "../reducers/shopping-cart";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import SplitButton from "../components/SplitButton";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
// const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Pizza = ({data: {allContentfulProductPizza: {edges: pizzaProduct}, contentfulIconMenuLeftPanel: {image}},
                   productPizza, searchText, priceFilter, dispatch, updatePizza: pizza, path}) => {

    const [load, setLoad] = React.useState(true);
    const classes = useStylesCart();

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
      }, [productPizza, dispatch, pizzaProduct]);

    const updatePizza = R.defaultTo(productPizza, pizza);
    const visibleItems = filtersProducts(updatePizza, searchText, priceFilter);
//     const s = [{id: '1a', name: 'sdaasd'}, {id: '2a', name: 'ass222'}];
//     const newValue = R.indexBy(R.prop('id'), s);
//     const newObj = R.merge({}, newValue);
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
                           ingrideentButtonStyle = false,
                           image: {fluid}, ingrideents, sostav,
                           contentful_id, priceDef = price, size={[slug]: true,
                           }} = products
                       return (
                           <Grid itemScope itemProp="itemListElement" itemType="http://schema.org/Product"
                                 item xs={12} sm={6} md={"auto"} lg={3} key={id}>
                               <Card className={classes.card}>
                                   <CardHeader avatar={
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
                                   <CardContent>
                                       <SplitButton id={id} pizzaIng={updatePizza} ingrideents={ingrideents} sostav={sostav} path={path} ingrideentButtonStyle={ingrideentButtonStyle} dir={"center"}/>
                                       <div className={classes.deckript}>
                                       <Typography itemProp="description"
                                                   // className={classes.deckript}
                                                    style={{fontSize: 15}}
                                                   variant="caption"
                                                   color="textSecondary"
                                                   component="p">
                                           {description}
                                       </Typography>
                                       </div>
                                       <Grid container alignItems="center" style={{padding: `13px 0`}}>
                                           <Grid item xs={5}>
                                               <button onClick={() => dispatch(pizzaCart({id,
                                                   productPizza: updatePizza,
                                                   total: priceDef,
                                                   priceDef,
                                                   size: slug,
                                                   mass: 0.45}))}
                                                       className={clsx(classes.buttonD, {
                                                           [classes.buttonT]: size[slug]})}>
                                                   Маленькая</button> </Grid>
                                           <Grid item xs={2}>
                                               <p style={{fontSize: 14, margin: `auto 0`}}>{`${mass}кг`}</p>
                                           </Grid>
                                           <Grid item xs={5}>
                                               <button onClick={() => dispatch(pizzaCart({id,
                                                   productPizza: updatePizza,
                                                   total: priceIn33cm,
                                                   priceDef,
                                                   size: contentful_id,
                                                   mass: 0.65}))}
                                                       className={clsx(classes.buttonD, {
                                                           [classes.buttonT]: size[contentful_id]})}>
                                                   Большая</button></Grid>
                                       </Grid>
                                   </CardContent>

                                   {/*total, count*/}
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
                                           // startIcon={<ShoppingBasketIcon/>}
                                           onClick={() => dispatch(addedToCart({id, productPrice: null, product: updatePizza}))}>
                                           <ShoppingCartIcon/></Button>

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





