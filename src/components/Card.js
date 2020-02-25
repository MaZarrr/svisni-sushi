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
// import { red } from '@material-ui/core/colors';
import Logo from "../images/logoPN.png"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { producSetsLoad, setAddedToCart } from "../actions";
import styled from 'styled-components';
import { useStaticQuery, graphql } from "gatsby"

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
    // margin: '0 auto',
    display: `flex`,
    justifyContent: 'space-between',
  },
  img: {
    margin: 0,
    padding: 0
  }
}));

const RecipeReviewCard = ({producSetsLoad, 
  setAddedToCart }) => {
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
          fluid(maxWidth: 400) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
  }
  `)

  useEffect(() => {
    producSetsLoad(edges); // action push to reduxStore
  }, [edges, producSetsLoad])


  const handleExpandClick = (id) => {
    setExpanded({[id]: !expanded[id]});
  };

  return (
    <>
    <div className={classes.root}>
    {edges.map(({node: homeProduct}) => (
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
        onClick={()=> setAddedToCart(homeProduct.id)}
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
          Служба доставки работает с 10:00 до 22:00 по районам:
          </Typography>
          <ul style={{ padding: 0}}>
            <li>Уразово, Соболевка, Знаменка доставка бесплатно от 500р, менее доставка 100р</li>
            <li>Шелаево, Двулучное, Герасимовка, Колыхалино, Шведуновка от 700р доставка - 100р, от 1000р доставка бесплатно</li>
            <li>Валуйки, Борки от 1400р бесплатно, заказ менее данной суммы - платная доставка 300р</li>
          </ul>
        </CardContent>
      </Collapse>

    </Card>
    ))}
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
  setAddedToCart: (id) => {
      dispatch(setAddedToCart(id))
      }
  }  
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeReviewCard)

