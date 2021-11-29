import React, {useEffect} from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@mui/material";
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Zakyski = ({data: {allContentfulProductZakuski: {edges: productsZakyski}, contentfulIconMenuLeftPanel: {image}},
                     dispatch, product}) => {

    useEffect(() => {
        dispatch(productLoaded(productsZakyski)) // action push to reduxStore
    }, [productsZakyski, dispatch])

return ( 
   <section>
    <Seo title="Заказать закуски для фуршета на день рождения, закуски на праздничный стол - заказать в Валуйках"
    description="Заказать закуски в Уразово с доставкой рядом. Доставка закусок на дом по цене от 189 руб от Свистни Суши"/>

     <HeadSection titleTXT={"Закуски"} />
    <Grid container justifyContent="center">
        <CardsMenuPage titleCategory="Закуски" slugCategogy="/zakyski" visibleItems={product}
                                   image={image} product={product}/>
        </Grid>
      </section>
    )
};

const mapStateToProps = (state) => ({
    product: state.app.product
});
  
export default connect(mapStateToProps, null)(Zakyski)

export const query = graphql `
  {
  allContentfulProductZakuski {
    edges {
      node {
        id
        name
        count
        price
        description
        weight
        image {
          gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
        }
      }
    }
  }
  contentfulIconMenuLeftPanel(name: {eq: "Закуски"}) {
    image {
      gatsbyImageData
    }
  }
}

    `
