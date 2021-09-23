import { isNil } from "ramda";
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
import makeStyles from '@mui/styles/makeStyles';
import SwipeableViews from "react-swipeable-views";
import { addedCart } from "../../../reducers/shopping-cart";
import { connect } from "react-redux";

const styles = {
  img: {
    maxWidth: 350
  },
  rootNewProd: {
    padding: '0 30px 0 0',
    maxWidth: `100%`
  },
  slideContainer: {
    padding: '15px 0 30px 0',
  },
};

const SelectionContentMobile = ({ product, addedCart }) => {
  const classes = useStyleSelection()
  return (
  <SwipeableViews style={styles.rootNewProd} slideStyle={styles.slideContainer}>
    {
    isNil(product.node.new) ? "" : product.node.new.map((homeProduct) => (
      <Card key={homeProduct.id} className={classes.cardCombo} raised={true}>
        <CardMedia
          title={homeProduct.name}>
          <GatsbyImage
            image={homeProduct.image.gatsbyImageData}
            style={styles.img}
            alt={homeProduct.name} />
        </CardMedia>
        <CardContent style={{ minHeight: 140 }}>
          <Typography variant={"h3"}>{homeProduct.name}</Typography>
          <Typography variant={"subtitle2"} style={{ position: `absolute`, width: `77%` }}>{homeProduct.description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {homeProduct.__typename === "ContentfulProduct" || homeProduct.__typename === "ContentfulProductPizza" ?
            <Button
              variant="contained"
              sx={{
                backgroundColor: `orange`,
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
              }}
              component={Link}
              size={"small"}
              to={homeProduct.__typename === "ContentfulProduct" ? `/sety/${homeProduct.slug}` : homeProduct.__typename === "ContentfulProductPizza" ? "/pizza/" : null}>
              Посмотреть
            </Button> : <Button
              variant="contained"
              sx={{
                backgroundColor: 'tomato',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
              }}
              onClick={() => addedCart({
                id: homeProduct.id,
                productPrice: null, product: product.node.new
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

const useStyleSelection = makeStyles(theme => ({
  cardCombo: {
    maxWidth: 300
  }
}));
