import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import {
  producSetsLoad,
  setAddedToCart,
  productRequested
} from "../actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Spinner from '../components/spinner/spinner'
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Grid } from "@material-ui/core";
// import * as R from 'ramda'
import { useStylesCart } from '../components/common/style';
import CustomizedInputSearch from '../components/CustomizedInputSearch'

const Sety = ({
      data: {
        allContentfulProduct: {
          edges: setyProduct
        },
        contentfulIconMenuLeftPanel: {
          image
        }
      },
    producSetsLoad, 
    setAddedToCart,
    product, searchText, priceFilter
  }) => {

    // const [ listJsx, updateLustJsx ] = React.useState('')
    const [load, setLoad] = React.useState(true)
    
    useEffect(() => {
      // if(!R.isEmpty(product)) {
      //   setLoad(false)
      //   return
      // }
      producSetsLoad(setyProduct)
      setLoad(false)
      }, [setyProduct, producSetsLoad])

    const classes = useStylesCart();

    const search = (items, txt) => {
        if(txt === undefined) {
          return items
        }
        return items.filter(({node}) => {
          
          return node.name.toLowerCase().indexOf(txt.toLowerCase()) > -1
        })
      }

    const filter = (items, filter) => {
      switch (filter) {
        case 'def':
          return items
        case 'inc':
          return items.sort((a, b)=> a.node.price - b.node.price)
        case 'dec':
          return items.sort((a, b)=> b.node.price - a.node.price)

        default:
          return items
      }
    }

  
  const visibleItems = filter(search(product, searchText), priceFilter)

    
  if(load) {
    return <div style={{display: `flex`, justifyContent: `center`, alignItems: `center`}}> 
    <Spinner /></div>
  }
      
return (
  <>
    <SEO title="Заказать наборы суши и роллов в Валуйки, доставка сетов роллов с 10 до 22:00" 
    description="Меню суши, роллы. Доставка сетов в Валуйки, широкий выбор, приятные цены — в службе доставки японской кухни Свисни-Суши. Закажи Сеты в Уразово с доставкой на дом"/>
   <section>
 
   <div className={classes.titleH1}>
   <div>
    <h1 style={{fontFamily: `Oswald, cursive`,
    fontWeight: 600, }}>Сеты</h1>
    </div>
   
   </div>
    <CustomizedInputSearch />
<Grid container justify="center" >
{ visibleItems.map(({node: productSets}) => {
      
  const {id, name, slug, description, price, weight, count, image: {fluid} } = productSets

   return (
    <Grid item xs={12} sm={6} md={3} key={id}>
    <Card className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
          <Avatar className={classes.avatar}>
           <Img style={{width: 50}} fluid={image.fluid} />
          </Avatar>
        }
        title="Сет"
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
        <b><p>{weight}кг</p></b>
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
      to={`/sety/${slug}`}
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
   </>
    )
}

const mapStateToProps = ({ setList: {product, searchText, priceFilter} }) => {
    return {product, searchText, priceFilter};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    productRequested: () => dispatch(productRequested()),
    producSetsLoad: (newProduct) => {
        dispatch(producSetsLoad(newProduct))
    },
    setAddedToCart: (id, price, product) => {
        dispatch(setAddedToCart(id, price, product))
        }
    }  
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Sety)

export const querySets = graphql `
    {
        allContentfulProduct {
          edges {
            node {
                id
              slug
              name
              price
              weight
              count
              description
              image {
                  fluid(maxWidth: 300, maxHeight: 300, quality: 30) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
           contentfulIconMenuLeftPanel(name: {eq: "Сеты"}) {
            image {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
    `