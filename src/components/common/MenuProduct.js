import React, {useEffect} from "react"
import { Link } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { producSetsLoad, setAddedToCart } from "../../actions";

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
      minHeight: 125,
    },
  card: {
    maxWidth: `260px`,
    // minHeight: `680px`,
    margin: `20px 1vw 10px 2vw`,
    // [theme.breakpoints.down('425')]: {
    //   maxWidth: `100%`,
    // }
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

const MenuProduct = ({
        product,
        producSetsLoad,
        setAddedToCart,
        imageInfo,
        category,
        path
    }) => {
     
  const classes = useStyles();
      
    useEffect(() => {
        const data = product
        producSetsLoad(data); // action push to reduxStore

      }, [product, producSetsLoad])

return (
    <Grid container>
    {
      product.map(({
            node: productSets
          }) => {
    const {id, name, slug, description, price, image: {fluid} } = productSets
    
    return (
    <Grid key={id} item xs={12} sm={6} md={3} >
    <Card className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           <Img style={{width: 50}} fluid={imageInfo.node.image.fluid} />
          </Avatar>
        }
        title={category}
        subheader={name}
      />
      <CardMedia 
        className={classes.media}
        title={name}
      > 
        <div>
      <Link to={`/${path}/${slug}`}>
      <Img fluid={fluid} />
      </Link>
      </div>
      </CardMedia> 

      <CardContent>
        <Typography className={classes.deckript} variant="caption" color="textSecondary" component="p">
        {description}
        </Typography>
        <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
        <b><p>1020кг</p></b>
          <b><p>64шт</p></b>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(MenuProduct)

