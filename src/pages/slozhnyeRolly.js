import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
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
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';

const Pizza = ({data: {allContentfulProductSlognyeRolly: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    producSetsLoad, 
    setAddedToCart,
  }) => {
  
  const classes = useStylesCart();
      
    useEffect(() => {
        const data = setyProduct
        producSetsLoad(data); // action push to reduxStore

      }, [setyProduct, producSetsLoad])

return ( 
   <section className="section_cart" >
    <SEO title="Сложные роллы" />
     <div className="title"> 
            <h1 className={classes.titleH1}>Сложные роллы</h1>
      </div>
    <Grid container xs={12} justify="center">
    {
      setyProduct.map(({
            node: productSets
          }) => {
    const {id, name, slug, description, price, weight, count, image: {fluid} } = productSets
    
    return (
    <Grid item xs={12} sm={6} md={3} >
    <Card key={id} className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           <Img style={{width: 50}} fluid={image.fluid} />
          </Avatar>
        }
        title="Сложные"
        subheader={name}
      />
      <CardMedia 
        className={classes.media}
        title={name}
      > 

      <Link to={`/slozhnyeRolly/${slug}`}>
      <Img fluid={fluid} style={{height: `250px`, width: `250px`}}/>
    </Link>
      </CardMedia> 
 

      <CardContent>
        <Typography className={classes.deckript} variant="caption" color="textSecondary" component="p">
        {description}
        </Typography>
        <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
        <b><p>{weight}гр</p></b>
          <b><p>{count}шт</p></b>
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
        Хочу!
      </Button>
      </CardActions>
    </Card>
    </Grid>
    )})}
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
        allContentfulProductSlognyeRolly {
          edges {
            node {
                id
              slug
              name
              price
              description
              weight
              count
              image {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
          contentfulIconMenuLeftPanel(name: {eq: "Сложные"}) {
          image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
          }
        }
        }
    `



