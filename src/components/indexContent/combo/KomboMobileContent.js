import { isNil } from "ramda";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { GatsbyImage } from "gatsby-plugin-image";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";

const styles = {
  root: {
    padding: '0 30px 0 0',
    maxWidth: `100%`
  },
  slideContainer: {
    padding: '15px 0 30px 0',
  },
  img: {
    maxWidth: 350
  }
};

const KomboMobileContent = ({ product }) => {
  const classes = useStyleKombo();
  return (
    <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
      {
        isNil(product.node.combos) ? <div style={{width: 300, height: 400, backgroundColor: "red"}}> </div> : product.node.combos.map((homeProduct) => (
          <Card key={homeProduct.id} className={classes.cardCombo} raised={true}>
            <CardMedia title={homeProduct.name}>
              <GatsbyImage
                image={homeProduct.image.gatsbyImageData}
                style={styles.img}
                alt={homeProduct.name} />
            </CardMedia>
            <CardContent style={{ minHeight: 140 }}>
              <Typography style={{ fontSize: 18, fontWeight: 600 }} variant={"h6"}>{homeProduct.name}</Typography>
              <Typography style={{ position: `absolute`, width: `78%` }}>{homeProduct.description}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant="contained"
                className={classes.buttonCombo}
                component={Link}
                size={"small"}
                to={`/kombo/${homeProduct.slug}`}>
                Выбрать
              </Button>
              <Typography style={{ fontSize: 18, marginLeft: `auto`, marginRight: 10, fontWeight: 800 }}
                          variant={"body1"}>{homeProduct.price}₽</Typography>
            </CardActions>
          </Card>
        ))
      }
    </SwipeableViews>
  )
}

export default KomboMobileContent

const useStyleKombo = makeStyles(theme => ({
  cardCombo: {
    maxWidth: 300
  },
  buttonCombo: {
    backgroundColor: `orange`,
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
  }
}));