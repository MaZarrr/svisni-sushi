import { isNil } from "ramda";
import Grid from "@mui/material/Grid";
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

const KomboContent = ({ product }) => {
  const classes = useStyle();
  return (
  <>
    { product.map((homeProduct) => (
      <Grid key={homeProduct.id} item sm={6} md={3} className={classes.cardComboPc} >
        <Card sx={{
            height: '570px',
            position: 'relative',
            width: '85%',
            margin: '0 auto'
          }}  raised={true}>
          <CardMedia
            title={homeProduct.name}>
            <GatsbyImage
              image={homeProduct.image[0].gatsbyImageData}
              alt={homeProduct.name} />
          </CardMedia>
          <CardContent>
            <Typography variant={"h3"}>{homeProduct.name}</Typography>
            <Typography variant={"subtitle2"}>{homeProduct.description}</Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ position: 'absolute', bottom: '10px', width: '100%'}}>
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
            <Typography style={{marginLeft: `auto`, marginRight: '25px'}}
                          variant={"subtitle1"}>{homeProduct.price}₽</Typography>
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
  }
}));
