import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Grid } from "@material-ui/core";
import { GatsbyImage } from "gatsby-plugin-image";
import loadable from "@loadable/component";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components'

// my components
const ButtonBackSet = loadable(() => import('./common/ButtonBackSet'));
const LayoutItem = loadable(() => import('./layoutItem'));


const ImageItem = styled(GatsbyImage)`
    max-width: 450px; 
    border-radius: 5px;
    @media (max-width: 600px) {
        max-width: 400px;
    }
`
const ContainerContentProducts = styled.div`
    max-height: 440px;
    overflow: scroll;
    border-radius: 5px;
    marginTop: 4px;
    padding: 5px;
    position: relative;
    @media (max-width: 600px) {
        overflow: visible;
        max-height: inherit;
    }
`
const CheckoutContainer = styled.div`
    margin-topp: 20px;
    position: sticky;
    bottom: -50px;
    div {
      background-color: #f4f4f4;
      opacity: 75%;
      padding: 5px;
      box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
    }
`
const ImageWrapped = styled(Grid)`
  width: 100%;
  padding: 5px 0 0 30px;
  @media (max-width: 600px) {
    padding: 0;
  }
`

const SetyItem = ({ name, image, count, weight, price, added, kitProduct, location, back }) => {
  return <>
  <SEO title={`Сет роллов ${name}`}
       description={`Набор роллов ${name}, количество ${count} с общим весом ${weight}`}
       pathname="/sety/"/>
      <LayoutItem name={name} image={null} location={location}>
          <ButtonBackSet back={back} />
          <Grid container>
              <ImageWrapped item xs={12} sm={5}>
                  <ImageItem image={image.gatsbyImageData} />
              </ImageWrapped>

              <Grid item xs={12} sm={6} md={5}
                    style={{paddingLeft: 10}}>
                  <div style={{padding: 3, borderRadius: 5, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', width: `95%`}}>
                      <Typography variant={"h6"} style={{marginTop: 10, marginBottom: 10}}>Состав:</Typography>
                  </div>
              <ContainerContentProducts>
              { kitProduct.map(({node: product}) => (
                  <Grid container key={product.id}
                        style={{margin: `7px 0 7px 0`, padding: `7px 0 7px 0`, border: `1px solid lightgrey`, width: `95%`}}
                        direction={"row"}>
                      <Grid item xs={2}>
                          <GatsbyImage
                              image={product.image.gatsbyImageData}
                              style={{maxWidth: 70}}
                              alt={product.name} />
                      </Grid>
                  <Grid item xs={8} style={{paddingLeft: 8, margin: `auto 0`}}>
                      <Typography variant={"body1"} style={{fontWeight: 600, margin: 0, padding: 0}}>{product.name}</Typography>
                      <Typography variant={"subtitle2"} style={{margin: `auto`}}>{product.description}</Typography>
                  </Grid>

                  <Grid item xs={2} style={{margin: `auto auto`, textAlign: `center`}}>
                      <Typography variant={"caption"} >{product.count}шт</Typography>
                  </Grid>
                  </Grid>
          ))}
          </ContainerContentProducts>

          <CheckoutContainer>
                  <div style={{width: `95%`, borderRadius: 3, display: `flex`, justifyContent: `space-between`}}>
                    <Typography variant={"subtitle2"}>Кол-во: <strong>{count}шт</strong></Typography>
                    <Typography variant={"subtitle2"}>Общий вес: <strong>{weight}кг</strong></Typography>
                    <Typography variant={"subtitle2"}>Цена: <strong>{price}₽</strong></Typography>
                  </div>
                <Button
                      variant="contained"
                      size="small"
                      endIcon={<ShoppingBasketIcon/>}
                      style={{marginBottom: `50px`, backgroundColor: "#303032", width: `95%`, color: `white`}}
                      onClick={added}
                  >В корзину</Button>
          </CheckoutContainer>
      </Grid>
  </Grid>
  </LayoutItem>
  </>;
};

export default SetyItem


