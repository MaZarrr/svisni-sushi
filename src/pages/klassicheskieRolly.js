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
// import { styled } from 'styled-components';

// const H1Component = styled.h1 `

// `

const useStyles = makeStyles(theme => ({
    title: {
        fontFamily: 'Comfortaa',
        fontWeight: 800,
        fontDisplay: `fallback`,
    },
    titleH1: {
        fontFamily: 'Neucha',
        fontWeight: 800,
        paddingLeft: `20px`,
        [theme.breakpoints.down('500')]: {
            fontSize: `28px`
        }
    },
    deckript: {
        fontFamily: 'Comfortaa',
        fontWeight: 800,
        fontDisplay: `fallback`,
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

const KlassicheskieRolly = ({
            data: {
                allContentfulProductKlassika: {
                    edges: setyProduct
                },
                allContentfulIconMenuLeftPanel: {
                    edges: imagee
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
   <section className="section_cart" >
    <SEO title="Классические роллы" />
     <div className="title"> 
            <h1 className={classes.titleH1}>Классические роллы</h1>
      </div>
    <Grid container xs={12} justify="center">
    {
      setyProduct.map(({
            node: productSets
          }) => {
    const {id, name, slug, description, price, weight, count, image: {fluid}, variant } = productSets
    
    return (
    <Grid item xs={12} sm={6} md={3} >
    <Card key={id} className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           <Img style={{width: 50}} fluid={imagee[8].node.image.fluid} />
          </Avatar>
        }
        title={variant === "Темпура" ? "Темпурные" : "Классические"}
        subheader={name}
      />
      <CardMedia 
        className={classes.media}
        title={name}
      > 

      <Link to={`/klassicheskieRolly/${slug}`}>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(KlassicheskieRolly)

export const query = graphql `
    {
       allContentfulProductKlassika {
           edges {
               node {
                   id
                   name
                   price
                   slug
                   variant
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
        allContentfulIconMenuLeftPanel {
            edges {
                node {
                    image {
                        fluid(maxWidth: 70) {
                            ...GatsbyContentfulFluid
                             }
                         }
                    }
                }
            }
        }
    `

