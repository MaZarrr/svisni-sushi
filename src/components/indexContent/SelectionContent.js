import Typography from "@material-ui/core/Typography";
import { isNil } from "ramda";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { GatsbyImage } from "gatsby-plugin-image";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const SelectionContent = ({ product, addedCart, indexProduct }) => {
  const classes = useStyle();
  return (
  <>
  <Typography style={{ marginTop: 50 }}
              className={classes.titleIndex}
              variant={"h2"}>{isNil(product.node.title) ? "" :
    product.node.title}</Typography>;
    <Grid container justify={"space-between"}>
  {
    isNil(product.node.new) ? "" : product.node.new.map((homeProduct) => (
      <Grid key={homeProduct.id} item sm={6} md={3} className={classes.cardComboPc}>
        <Card raised={true}>
          <CardMedia
            title={homeProduct.name}>
            <GatsbyImage
              image={homeProduct.image.gatsbyImageData}
              alt={homeProduct.name} />
          </CardMedia>
          <CardContent>
            <Typography style={{ fontSize: 18, fontWeight: 600 }} variant={"h6"}>{homeProduct.name}</Typography>
            <Typography style={{ fontSize: 14, height: 75, width: `100%` }}
                        variant={"subtitle1"}>{homeProduct.description}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            {homeProduct.__typename === "ContentfulProduct" || homeProduct.__typename === "ContentfulProductPizza" ?
              <Button
                variant="contained"
                className={classes.buttonCombo}
                component={Link}
                to={homeProduct.__typename === "ContentfulProduct" ? `/sety/${homeProduct.slug}` : homeProduct.__typename === "ContentfulProductPizza" ? "/pizza/" : null}>
                Посмотреть
              </Button> : <Button
                variant="contained"
                className={classes.button}
                onClick={() => addedCart({
                  id: homeProduct.id,
                  productPrice: null, product: indexProduct[0].node.new
                })}>
                <ShoppingCartIcon />
              </Button>
            }

            <Typography style={{ fontSize: 22, fontWeight: 800, marginLeft: `auto`, marginRight: 10 }}
                        variant={"body1"}>{homeProduct.price} ₽</Typography>
          </CardActions>
        </Card>
      </Grid>
    ))
  }
    </Grid>
  </>
  )
}

export default SelectionContent;

const useStyle = makeStyles(theme => ({
  cardComboPc: {
    borderRadius: `3px`,
    maxWidth: `350px`,
    padding: `0 10px`,
    margin: `20px 0`
  },
  titleIndex: {
    fontSize: '28px',
    fontWeight: `bold`,
    width: `100%`,
    paddingBottom: 20,
    [theme.breakpoints.down('600')]: {
      fontSize: '22px',
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 0,
    },
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