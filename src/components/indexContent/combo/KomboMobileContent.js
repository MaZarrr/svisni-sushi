import { isNil } from "ramda";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { GatsbyImage } from "gatsby-plugin-image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "gatsby";
import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import SwipeableViews from "react-swipeable-views";

const styles = {
  img: {
    maxWidth: 200
  },
  slideContainer: {
    padding: '15px 0 30px 0'
  },
};

export const useStyleKombo = makeStyles(theme => ({
  cardCombo: {
      padding: '0 20% 0 15%',
      [theme.breakpoints.down('330')]: {
        padding: '0 10% 0 15%'
  }}
}));

const KomboMobileContent = ({ product }) => {
  const classes = useStyleKombo();
  return (
    <SwipeableViews className={classes.cardCombo} slideStyle={styles.slideContainer}>
      {
        product.map((homeProduct) => (
          <Card key={homeProduct.id}  sx={{
            maxWidth: '200px',
            height: '380px'
          }} raised={true}>
            <CardMedia title={homeProduct.name}>
              <GatsbyImage
                image={homeProduct.image[0].gatsbyImageData}
                style={styles.img}
                alt={homeProduct.name} />
            </CardMedia>
            <CardContent sx={{padding: '10px 0 10px 10px'}}>
              <Typography variant={"h3"}>{homeProduct.name}</Typography>
              <Typography variant={"subtitle2"} sx={{fontSize: '12px', position: `absolute`, width: `65%`, lineHeight: '15px' }}>{homeProduct.description}</Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ position: 'absolute', bottom: '35px'}}>
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
                to={!homeProduct?.isEdit ? "/kombo/" : `/kombo/${homeProduct.slugItem}`}>
                {!homeProduct?.isEdit ? "Перейти" : "Выбрать"}
              </Button>
              <Typography sx={{marginLeft: `15px`}}
                          variant={"body1"}>{homeProduct.price}₽</Typography>
            </CardActions>
          </Card>
        ))
      }
    </SwipeableViews>
  )
}

export default KomboMobileContent

