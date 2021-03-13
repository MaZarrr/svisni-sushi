import { isNil } from "ramda";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { GatsbyImage } from "gatsby-plugin-image";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";

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

const SelectionContentMobile = ({ product, indexProduct, addedCart }) => {
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
          <Typography style={{ fontSize: 18, fontWeight: 600 }} variant={"h6"}>{homeProduct.name}</Typography>
          <Typography style={{ position: `absolute`, width: `77%` }}>{homeProduct.description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {homeProduct.__typename === "ContentfulProduct" || homeProduct.__typename === "ContentfulProductPizza" ?
            <Button
              variant="contained"
              className={classes.buttonCombo}
              component={Link}
              size={"small"}
              to={homeProduct.__typename === "ContentfulProduct" ? `/sety/${homeProduct.slug}` : homeProduct.__typename === "ContentfulProductPizza" ? "/pizza/" : null}>
              Посмотреть
            </Button> : <Button
              variant="contained"
              className={classes.button}
              onClick={() => addedCart({
                id: homeProduct.id,
                productPrice: null, product: indexProduct.node.new
              })}>
              <ShoppingCartIcon />
            </Button>
          }
          <Typography style={{ fontSize: 18, fontWeight: 800, marginLeft: `auto`, marginRight: 10 }}
                      variant={"body1"}>{homeProduct.price} ₽</Typography>
        </CardActions>
      </Card>
      ))}
  </SwipeableViews>
  )
};

export default SelectionContentMobile

const useStyleSelection = makeStyles(theme => ({
  cardCombo: {
    maxWidth: 300
  },
  buttonCombo: {
    backgroundColor: `orange`,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  }
}));
