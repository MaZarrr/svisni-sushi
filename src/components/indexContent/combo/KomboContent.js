import { isNil } from "ramda";
import Grid from "@material-ui/core/Grid";
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

const KomboContent = ({ product }) => {
  const classes = useStyle();
  return (
  <>
    { isNil(product.node.combos) ? '' : product.node.combos.map((homeProduct) => (
      <Grid key={homeProduct.id} item sm={6} md={3} className={classes.cardComboPc} >
        <Card raised={true}>
          <CardMedia
            title={homeProduct.name}>
            <GatsbyImage
              image={homeProduct.image.gatsbyImageData}
              alt={homeProduct.name} />
          </CardMedia>
          <CardContent>
            <Typography variant={"h3"}>{homeProduct.name}</Typography>
            <Typography variant={"subtitle2"}>{homeProduct.description}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              variant="contained"
              className={classes.buttonCombo}
              component={Link}
              to={homeProduct.name === "Комбо №2" ? "/kombo/" : `/kombo/${homeProduct.slug}`}>
              {homeProduct.name === "Комбо №2" ? "Перейти" : "Посмотреть"}
            </Button>
            <Typography style={{marginLeft: `auto`, marginRight: 10}}
                        variant={"body1"}>{homeProduct.price} ₽</Typography>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </>
  )
}

export default KomboContent

const useStyle = makeStyles(theme => ({
  cardComboPc: {
    borderRadius: `3px`,
    maxWidth: `420px`,
    padding: `0 10px`,
    margin: `20px 0`
  },
  buttonCombo: {
    backgroundColor: `orange`,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  }
}));
