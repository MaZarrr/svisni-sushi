import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { producSetsLoad, setAddedToCart } from "../actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStylesCart } from '../components/common/style'
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
const Sushi = ({
      data: {
        allContentfulProductSushi: {
          edges: setyProduct
        },
        contentfulIconMenuLeftPanel: {
          image
        }
      },
    producSetsLoad, 
    setAddedToCart, product
  }) => {
  const [load, setLoad] = React.useState(true)
  const classes = useStylesCart();
      
      useEffect(() => {
        const data = setyProduct
        producSetsLoad(data); // action push to reduxStore
        setLoad(false)
      }, [setyProduct, producSetsLoad])

return ( 
   <section>
    <SEO title="Классические недорогие суши с доставкой по Валуйскому району" 
    description="Суши с лососем, авокадо, тунцом, угрём посмотри меню у нас на сайте. Звонок +7(904)094-92-22"/>
    <h1 className={classes.titleH1}>Суши</h1>
    <Grid container justify="center">
    {!load ? product.map(({
            node: productSets
          }) => {
    const {id, name, price, weight, count, image: {fluid}} = productSets
    
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
        title="Суши"
        subheader={name}
      />
      <CardMedia 
        className={classes.media}
        title={name}
      > 
      <Img fluid={fluid}/>
      </CardMedia> 
 

      <CardContent>
        <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
        <b><p>{weight} гр</p></b>
          <b><p>{count} шт</p></b>
        </Typography>
       <p>{`${price}₽`}</p>
      </CardContent>

      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ShoppingBasketIcon />}
          onClick={()=>  setAddedToCart(id, null, product)}
      >
        Хочу!
      </Button>
      </CardActions>
    </Card>
    </Grid>
    )}) : <Spinner />}
    </Grid>
  </section>
    )
}

const mapStateToProps = ({ setList: {product} }) => {
    return {product};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    producSetsLoad: (newProduct) => {
        dispatch(producSetsLoad(newProduct))
    },
     setAddedToCart: (id, price, product) => {
       dispatch(setAddedToCart(id, price, product))
     }
    }  
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Sushi)

export const query = graphql `
    {
      allContentfulProductSushi {
          edges {
              node {
                  id
                  name
                  count
                  price
                  weight
                      image {
                          fluid(maxWidth: 300, maxHeight: 300) {
                              ...GatsbyContentfulFluid
                          }
                      }
              }
          }
      }
             contentfulIconMenuLeftPanel(name: {eq: "Суши"}) {
               image {
                 fluid(maxWidth: 35) {
                   ...GatsbyContentfulFluid
                 }
               }
             }
        }
    `
