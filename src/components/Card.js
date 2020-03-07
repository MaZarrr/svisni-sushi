import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Logo from "../images/logoPN.png"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { producSetsLoad, setAddedToCart } from "../actions";
import styled from 'styled-components';
import { useStaticQuery, graphql } from "gatsby"
import Spinner from './spinner/spinner'
const AvatarWrapp = styled(Avatar) `
background: ${props => props.color};
`
const useStyles = makeStyles(theme => ({
  root: {
    margin: `0 auto`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`
  },
  title: {
    fontFamily: 'Comfortaa',
    fontWeight: 800,
    fontDisplay: `fallback`
  },
  card: {
    maxWidth: `75%`,
    marginTop: 30,
    [theme.breakpoints.down('425')]: {
      maxWidth: `100%`,
    },
     [theme.breakpoints.up('768')]: {
      maxWidth: `50%`,
    }
  },
  media: {
    maxWidth: `250px`,
    margin: `0 auto`,
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
    border: `1px solid #000`,
    width: `50px`,
    height: `50px`
  },
  button: {
    margin: theme.spacing(1),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  overline: {
    display: `flex`,
    justifyContent: 'space-between',
  },
  img: {
    margin: 0,
    padding: 0
  }
}));

const RecipeReviewCard = ({producSetsLoad, 
  setAddedToCart, product
  }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState({nameCart: false});
    
  const {allContentfulHomePageCarts: {edges}} = useStaticQuery(graphql `
  {
  allContentfulHomePageCarts {
    edges {
      node {
        id
        description
        name
        price
        count
        weight
        color
        variant
        contentful_id
        image {
          fluid(maxWidth: 400, quality: 30) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
  }
  `)

  const [load, setLoad] = React.useState(true)

  useEffect(() => {
    producSetsLoad(edges)
    setLoad(false)
  }, [edges, producSetsLoad])


  const handleExpandClick = (id) => {
    setExpanded({[id]: !expanded[id]});
  };

  return (
    <>
    <div className={classes.root}>
    { !load ? product.map(({node: homeProduct}) => (
      <Card key={homeProduct.id} className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
           <AvatarWrapp alt="Sushi" src={Logo}
              className={classes.avatar}
              classes={{img: classes.img}}
              color={homeProduct.color}>
          </AvatarWrapp>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={homeProduct.variant}
        subheader={homeProduct.name}
      />
      <CardMedia 
        className={classes.media}
        title={homeProduct.name}
      > <Img fluid={homeProduct.image.fluid} />
      </CardMedia> 

      <CardContent>
        <Typography className={classes.title} variant="caption" color="textSecondary" component="p">
        {homeProduct.description} 
        </Typography>
        <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
        <b><p>{homeProduct.weight !== null ? `${homeProduct.weight} кг` : ''}</p></b>
          <b><p>{`${homeProduct.count !== null ? `${homeProduct.count} шт` : ''}`}</p></b>
        </Typography>
       <p>{`${homeProduct.price}₽`}</p>
      </CardContent>

      <CardActions disableSpacing>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<ShoppingBasketIcon />}
        onClick={()=> setAddedToCart(homeProduct.id, null, product)}
      >
        Хочу!
      </Button>
        <IconButton
          id={homeProduct.contentful_id}
          className={clsx(classes.expand, {
          [classes.expandOpen]: expanded[homeProduct.contentful_id],
          })}
          onClick={() => handleExpandClick(homeProduct.contentful_id)}
          aria-expanded={expanded[homeProduct.contentful_id]}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded[homeProduct.contentful_id]} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Доставка</Typography>
          <Typography paragraph>
          😉Тебе нужно знать что:
          </Typography>
          <ul style={{ padding: 0}}>
            <li>✅Есть бесплатная доставка!</li>
            <li>✅Заказать можно с 10:00 до 22:00</li>
            <li>✅Готовим с любовью для каждого от Svisni-Sushi</li>
          </ul>
        </CardContent>
      </Collapse>

    </Card>
    )) : <Spinner />}
    </div>
     </>
  );

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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeReviewCard)

