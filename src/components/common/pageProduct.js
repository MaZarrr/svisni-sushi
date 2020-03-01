import React from "react"

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Img from 'gatsby-image';
import { graphql, Link } from "gatsby";
import { Grid } from "@material-ui/core";

import { useStylesCart } from '../common/style';

export default pageProduct = ({ product, setAddedToCart, image }) => {

const [listJsx, updateLustJsx] = React.useState('')
 const classes = useStylesCart();
const liJsx = []
  const showAvailableMembers = () => {
  product.map(({node: productSets}) => {
      
  const {id, name, slug, description, price, weight, count, image: {fluid} } = productSets

   liJsx.push(
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
        subheader={name}/>
      <CardMedia 
        className={classes.media}
        title={name}> 
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
          onClick={()=> setAddedToCart(id)}>
        Хочу
      </Button>

      <Button
      component={Link}
      to={`/sety/${slug}`}
      variant="contained"
      color="secondary"
      className={classes.buttonInfo}>
        Подробнее
      </Button>
      </CardActions>
    </Card>
    </Grid>
    )}) 
    updateLustJsx(liJsx)
}

  if (!listJsx) {
      showAvailableMembers(product, setAddedToCart);
  }

return listJsx
}