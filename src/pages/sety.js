import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { producSetsLoad, setAddedToCart } from "../actions";

import { makeStyles } from '@material-ui/core/styles';
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

// import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: 'Comfortaa',
    fontWeight: 800,
    fontDisplay: `fallback`
  },
  deckript: {
      fontFamily: 'Comfortaa',
      fontWeight: 800,
      fontDisplay: `fallback`,
      minHeight: 130,
      [theme.breakpoints.down('500')]: {
        minHeight: 'auto'
      }
    },
  card: {
    maxWidth: `260px`,
    // minHeight: `680px`,
    margin: `20px auto 10px auto`,
    [theme.breakpoints.down('600')]: {
      maxWidth: `300px`,
    }
  },
  media: {
    maxWidth: `400px`,
    margin: `0 auto`,
    // paddingTop: '56.25%', // 16:9
    // backgroundSize: 'contain',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    // backgroundColor: red[500],
      backgroundColor: `white`,
      border: `1px dotted #000`
  },
  button: {
    margin: theme.spacing(1),
      // margin: `auto, 0, 10px 10px`,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  overline: {
    minHeight: 55,
    display: `flex`,
    justifyContent: 'space-between',
  }
}));


// import "../components/sass/cart.css"

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
  }) => {

  const classes = useStyles();
      
    useEffect(() => {
        const data = setyProduct
        producSetsLoad(data); // action push to reduxStore

      }, [setyProduct, producSetsLoad])

return (
    <section className="section_cart">
    <SEO title="Сеты" />
     <div className="title"> 
        <div className="title_item">
            <h1>Сеты</h1>
        </div>
      </div>
    <Grid container xs justify="center">
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
        title="Сет"
        subheader={name}
      />
      <CardMedia 
        className={classes.media}
        title={name}
      > 

      <Link to={`/sety/${slug}`}>
      <Img fluid={fluid} />
      </Link>
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
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid_tracedSVG
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





































// import React from "react"
// import SEO from "../components/seo"
// import {
//   graphql
// } from "gatsby";

// import MenuProduct from './../components/common/MenuProduct';


// const Sety = ({
//   data: {
//     allContentfulProduct,
//     allContentfulIconMenuLeftPanel
//   }
// }) => {

//   return ( <
//     section className = "section_cart" >
//     <
//     SEO title = "Сеты" / >
//     <
//     div className = "title" >
//     <
//     div className = "title_item" >
//     <
//     h1 > Сеты < /h1> <
//     /div> <
//     /div>

//     <
//     MenuProduct product = {
//       allContentfulProduct.edges
//     }
//     imageInfo = {
//       allContentfulIconMenuLeftPanel.edges[0]
//     }
//     category = "Сеты"
//     path = "sety" /
//     >
//     <
//     /section>
//   )
// }

// export default Sety

// export const querySets = graphql `
//     {
//         allContentfulProduct {
//           edges {
//             node {
//                 id
//               slug
//               name
//               price
//               description
//               image {
//                   fluid(maxWidth: 400) {
//                     ...GatsbyContentfulFluid_tracedSVG
//                   }
//                 }
//               }
//             }
//           }
//              allContentfulIconMenuLeftPanel {
//                edges {
//                  node {
//                    image {
//                      fluid(maxWidth: 70) {
//                        ...GatsbyContentfulFluid
//                      }
//                    }
//                  }
//                }
//              }
//           }
//     `
