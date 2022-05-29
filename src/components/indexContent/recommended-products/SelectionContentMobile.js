import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { GatsbyImage } from "gatsby-plugin-image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "gatsby";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { addedCart } from "../../../reducers/shopping-cart";
import { connect } from "react-redux";
import makeStyles from '@mui/styles/makeStyles';

const styles = {
  img: {
    maxWidth: 200
  },
  slideContainer: {
    padding: '15px 0 30px 0',
    margin: '0 0 90px 0'
  },
};

export const useStyle = makeStyles(theme => ({
  cardCombo: {
      padding: '0 20% 0 15%',
      [theme.breakpoints.down('330')]: {
        padding: '0 10% 0 15%'
  }}
}));

const SelectionContentMobile = ({ product, addedCart }) => {
  const classes = useStyle()
  return (
  <SwipeableViews className={classes.cardCombo} slideStyle={styles.slideContainer}>
    {
    product.map((homeProduct) => (
      <Card key={homeProduct.id}
      sx={{
        maxWidth: '200px',
        height: '395px'
      }}
     raised={true}>
        <CardMedia
          title={homeProduct.name}>
          <GatsbyImage
            image={homeProduct.image[0].gatsbyImageData}
            style={styles.img}
            alt={homeProduct.name} />
        </CardMedia>
        <CardContent style={{ minHeight: 140 }}>
          <Typography variant={"h3"}>{homeProduct.name}</Typography>
          <Typography variant={"subtitle2"} sx={{fontSize: '12px', position: `absolute`, width: `65%`, lineHeight: '15px'}}>{homeProduct.description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {homeProduct.slug === "sety" || homeProduct.slug === "pizza" ?
            <Button
              variant="contained"
              sx={{
                backgroundColor: `orange`,
                border: 0,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
              }}
              component={Link}
              size={"small"}
              to={homeProduct.slug === "sety" ? `/sety/${homeProduct.slugItem}` : homeProduct.slug === "pizza" ? "/pizza/" : null}>
              ПосмоСтреть
            </Button> : <Button
              variant="contained"
              sx={{
                backgroundColor: 'tomato',
                border: 0,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
              }}
              onClick={() => addedCart({
                id: homeProduct.id,
                productPrice: null, product
              })}>
              <ShoppingCartIcon />
            </Button>
          }
          <Typography style={{ marginLeft: `auto`, marginRight: 10 }}
                      variant={"body1"}>{homeProduct.price}₽</Typography>
        </CardActions>
      </Card>
      ))}
  </SwipeableViews>
  )
};

const mapDispatchToProps = {
  addedCart
};

export default connect(null, mapDispatchToProps)(SelectionContentMobile)