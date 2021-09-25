import Typography from "@mui/material/Typography";
import { isNil } from "ramda";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { GatsbyImage } from "gatsby-plugin-image";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "gatsby";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { addedCart } from "../../../reducers/shopping-cart";
import { connect } from "react-redux";

const SelectionContent = ({ product, addedCart }) => {
  return (
  <Grid container justifyContent={"space-between"}>
  {
    isNil(product.node.new) ? "" : product.node.new.map((homeProduct) => (
      <Grid key={homeProduct.id} item sm={6} md={3} sx={{
        borderRadius: `3px`,
        maxWidth: `420px`,
        padding: `0 10px`,
        margin: `30px 0`
      }} >
        <Card sx={{
            height: '570px',
            position: 'relative',
            width: '85%',
            margin: '0 auto'
          }} raised={true}>
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
          <CardActions disableSpacing sx={{ position: 'absolute', bottom: '10px', width: '100%'}}>
            {homeProduct.__typename === "ContentfulProduct" || homeProduct.__typename === "ContentfulProductPizza" ?
              <Button
                variant="contained"
                sx={{
                  backgroundColor: `orange`,
                  border: 0,
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  color: 'white',
                }}
                component={Link}
                to={homeProduct.__typename === "ContentfulProduct" ? `/sety/${homeProduct.slug}` : homeProduct.__typename === "ContentfulProductPizza" ? "/pizza/" : null}>
                Посмотреть
              </Button> : <Button
                variant="contained"
                sx={{
                  backgroundColor: `tomato`,
                  border: 0,
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

          <Typography style={{marginLeft: `auto`, marginRight: '25px'}}
                          variant={"subtitle1"}>{homeProduct.price}₽</Typography>
          </CardActions>
        </Card>
      </Grid>
    ))
  }
  </Grid>
  )
}

const mapDispatchToProps = {
  addedCart
};

export default connect(null, mapDispatchToProps)(SelectionContent)