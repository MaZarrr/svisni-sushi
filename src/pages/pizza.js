import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { producPizzaLoad, setAddedToCart, productRequested } from "../actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStylesCart } from '../components/common/style';
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import * as R from 'ramda'

const Pizza = ({
      data: {
        allContentfulProductPizza: {
          edges: pizzaProduct
        },
        contentfulIconMenuLeftPanel: {
          image
        }
      },
    producPizzaLoad,
    setAddedToCart, productPizza, productRequested
  }) => {
  const [load, setLoad] = React.useState(true)
  const classes = useStylesCart();

    useEffect(() => {
          if(!R.isEmpty(productPizza)) {
            setLoad(false)
            return
          }
          const ProductFetch = async () => {
            return await pizzaProduct
          }
          ProductFetch()
           .then((data) => producPizzaLoad(data))
           .then(() => setLoad(false))
      }, [producPizzaLoad, pizzaProduct, productRequested])

return ( 
   <section>
    <SEO title="Заказать пиццу в Валуйках. Доставка пиццы на дом - Свисни Пицца Уразово" 
      description="Доставка пиццы в Валуйки. Заказать ароматную пиццу с 10:00 до 22:00 в службе доставки Свистни Суши"
    />
    <h1 className={classes.titleH1}>Пицца</h1>
    <Grid container justify="center" >
    {!load ? productPizza.map(({
            node: pizza
          }) => {
    const {id, name, slug, description, price, image: {fluid} } = pizza
    
    return (
    <Grid item xs={12} sm={6} md={3} key={id}>
    <Card className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           <Img style={{width: 50}} fluid={image.fluid} />
          </Avatar>
        }
        title="Пицца"
        subheader={name}
      />
      <CardMedia 
        className={classes.media}
        title={name}
      > 

      <Img fluid={fluid} />
      </CardMedia> 

      <CardContent>
        <Typography className={classes.deckript} variant="caption" color="textSecondary" component="p">
        {description}
        </Typography>
        <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
        <b><p>{0.6}кг</p></b>
          <b><p>1шт</p></b>
        </Typography>
       <p>{`${price}₽`}</p>
      </CardContent>

      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ShoppingBasketIcon />}
          onClick={()=> setAddedToCart(id, price, productPizza)}
      >
        Хочу
      </Button>
         <Button
      component={Link}
      to={`/pizza/${slug}`}
      variant="contained"
      color="secondary"
      className={classes.buttonInfo}
      >
        Подробнее
      </Button>
      </CardActions>
    </Card>
    </Grid>
    )}) : <Spinner />}
        </Grid>
      </section>
    )
}

const mapStateToProps = ({ setList: {productPizza, loading} }) => {
    return {productPizza, loading};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    productRequested: () => dispatch(productRequested()),
    producPizzaLoad: (newProduct) => {
        dispatch(producPizzaLoad(newProduct))
    },
    // productRequested: (loading) => {
    //     dispatch(productRequested(loading))
    // },
    setAddedToCart: (id, price, productPizza) => {
        dispatch(setAddedToCart(id, price, productPizza))
        }
    }  
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Pizza)

export const query = graphql `
    {
        allContentfulProductPizza  {
          edges {
            node {
                id
              slug
              name
              price
              priceIn33cm
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



// const [load, setLoad] = React.useState(true)
// const classes = useStylesCart();
// // const initialState = React.useMemo(() => productRequested(), [])
// //   console.log(initialState);

// // React.useCallback(() => Request(pizzaProduct), productPizza)

// const getProduct = (products) => {
//   const ProductFetch = async () => {
//     return await products
//   }
//   return ProductFetch()
//     .then((data) => producPizzaLoad(data))
//     .then(() => setLoad(false))
// }

// const useRequest = (request) => {
//   const initialState = React.useMemo(() => ({
//     productPizza
//   }), [productPizza])

//   const [sss, setSss] = React.useState(initialState.productPizza)
//   useEffect(() => {
//     request()
//       .then((data) => setSss(data))
//     console.log('pizza');

//   }, [request, productPizza])
//   return sss
// }
// const useProductInfo = (pizzaProduct) => {
//   const request = React.useCallback(
//     () => getProduct(pizzaProduct), [pizzaProduct])
//   return useRequest(request)
// }
// useProductInfo(pizzaProduct);
