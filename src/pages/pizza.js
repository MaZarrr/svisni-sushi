import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { producPizzaLoad, setAddedToCart } from "../actions";

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
    setAddedToCart, productPizza, loading
  }) => {
  
  const classes = useStylesCart();
      
    useEffect(() => {
           const data = pizzaProduct
           producPizzaLoad(data); // action push to reduxStore
      }, [producPizzaLoad, pizzaProduct, productPizza])

 if(loading) {
        return <><h1 style={{marginBottom: `300px`}}>...Загрузка</h1></> 
      }
     

return ( 
   <section>
    <SEO title="Заказать пиццу в Валуйках с 10:00 до 22:00. Доставка пиццы на дом - Свисни Пицца Уразово" />
    <h1 className={classes.titleH1}>Пицца</h1>
    <Grid container justify="center" >
    {productPizza !== undefined ? productPizza.map(({
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
          onClick={()=> setAddedToCart(id)}
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
    producPizzaLoad: (newProduct) => {
        dispatch(producPizzaLoad(newProduct))
    },
    // productRequested: (loading) => {
    //     dispatch(productRequested(loading))
    // },
    setAddedToCart: (id) => {
        dispatch(setAddedToCart(id))
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



