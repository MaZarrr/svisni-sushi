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
import Spinner from '../components/spinner/spinner'
import CustomizedInputSearch from '../components/CustomizedInputSearch'
import filtersProducts from '../utils/filtersProducts'

const SlognyeRolly = ({data: {allContentfulProductSlognyeRolly: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    producSetsLoad, 
    setAddedToCart, product, searchText, priceFilter
  }) => {
  
  const classes = useStylesCart();
  const [load, setLoad] = React.useState(true)
    useEffect(() => {
        const data = setyProduct
        producSetsLoad(data); // action push to reduxStore
        setLoad(false)
      }, [setyProduct, producSetsLoad])

      const visibleItems = filtersProducts(product, searchText, priceFilter)

      if(load) {
      return <div style={{display: `flex`, 
      justifyContent: `center`, 
      alignItems: `center`}}> 
      <Spinner /></div>
    }
      
return ( 
   <section>
    <SEO title="Меню фирменные роллы. Доставка сложных роллов на дом в Валуйки"  
    description="Роллы которых вы еще не пробовали. Закажи доставку или приходи к нам в гости"/>
    <div className={classes.titleH1}>
    <h1 style={{fontFamily: `Oswald, cursive`,
    fontWeight: 600, }}>Сложные роллы</h1>
   </div>
   <CustomizedInputSearch />
    <Grid container justify="center">
    { visibleItems.map(({ node: productSets }) => {
    
    const {id, name, slug, description, price, weight, count, image: {fluid} } = productSets
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
        title="Сложные"
        subheader={name}
      />
      <CardMedia 
        className={classes.media}
        title={name}
      > 
      <Img fluid={fluid}/>
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
          onClick={()=> setAddedToCart(id, null, product)}
      >
        Хочу
      </Button>
         <Button
      component={Link}
      to={`/branded-rolls/${slug}`}
      variant="contained"
      color="secondary"
      className={classes.buttonInfo}
      >
        Подробнее
      </Button>
      </CardActions>
    </Card>
    </Grid>
    )})}
    </Grid>
  </section>
    )
}

const mapStateToProps = ({ setList: {product, searchText, priceFilter} }) => {
    return {product, searchText, priceFilter};
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
  
export default connect(mapStateToProps, mapDispatchToProps)(SlognyeRolly)

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
                 fluid(maxWidth: 300, maxHeight: 350) {
                     ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
          contentfulIconMenuLeftPanel(name: {eq: "Фирменные"}) {
          image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
          }
        }
        }
    `



