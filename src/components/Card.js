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
import { red } from '@material-ui/core/colors';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { producSetsLoad, setAddedToCart } from "../actions";
// import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: 'Comfortaa',
    fontWeight: 800,
  },
  card: {
    maxWidth: `100vmin`,
    marginTop: 30,
  },
  media: {
    maxWidth: `85%`,
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
    backgroundColor: red[500],
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
  }
}));

const RecipeReviewCard = ({data: {edges}, producSetsLoad, 
  setAddedToCart }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState({nameCart: false});
    console.log(edges)
  
  useEffect(() => {
    producSetsLoad(edges); // action push to reduxStore
  }, [edges, producSetsLoad])


  const handleExpandClick = (id) => {
    setExpanded({[id]: !expanded[id]});
  };

  return (
    <>
    {edges.map(({node: homeProduct}) => (
      <Card key={homeProduct.id} className={classes.card}>
      <CardHeader
      classes={{title: classes.title}}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Top
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Рекомендуем"
        subheader={homeProduct.name}
      />
      <CardMedia 
        className={classes.media}
        // image={homeProduct.image.fluid.src}
        title={homeProduct.name}
      > <Img fluid={homeProduct.image.fluid} />
      </CardMedia> 

      <CardContent>
        <Typography  variant="caption" color="textSecondary" component="p">
        {/* <Box fontFamily="Comfortaa"> */}
          {homeProduct.description}
        {/* </Box> */}
        </Typography>
        <Typography component="div" variant="overline" classes={{overline: classes.overline}}>
          <p>
          {homeProduct.weight !== null ? `Вес: ${homeProduct.weight} кг` : ''}
          </p>
          <p>
          {`${homeProduct.count !== null ? `Вес: ${homeProduct.count} шт` : ''}`}
          </p>
        </Typography>

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
          <p>Служба доставки работает с 10:00 до 22:00 по районам:</p>
          <ul style={{ padding: 0}}>
            <li>Уразово, Соболевка, Знаменка доставка бесплатно от 500р, менее доставка 100р</li>
            <li>Шелаево, Двулучное, Герасимовка, Колыхалино, Шведуновка от 700р доставка - 100р, от 1000р доставка бесплатно</li>
            <li>Валуйки, Борки от 1400р бесплатно, заказ менее данной суммы - платная доставка 300р</li>
          </ul>
          </Typography>
        </CardContent>
      </Collapse>

    </Card>
    ))}
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

