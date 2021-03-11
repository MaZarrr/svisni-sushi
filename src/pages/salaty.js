import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Salaty = ({data: {allContentfulProductSalat: {edges: productsSalaty}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product}) => {


    useEffect(() => {
        dispatch(productLoaded(productsSalaty)) // action push to reduxStore
    }, [productsSalaty, dispatch]);

return ( 
   <section>
    <SEO title="Заказать популярные салаты"
    description="Для вас предоставленна возможность заказа наиболее популярных салатов приготовленных из свежих продуктов.
    Вашему вниманию: салаты цезарь в вариациях и чука."/>

      <HeadSection titleTXT={"Салаты"} />
      <Grid container justify="center">
        <CardsMenuPage titleCategory="Салат" slugCategogy="/salaty" visibleItems={product}
                                   image={image} product={product}/>
        </Grid>
      </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Salaty)

export const query = graphql `
    {
          allContentfulProductSalat {
              edges {
                  node {
                      id
                      description
                      name
                      price
                      weight
                      image {
                      gatsbyImageData(placeholder: BLURRED formats: [WEBP, AUTO])
                  }
                  }
              }
          }
            contentfulIconMenuLeftPanel(name: {eq: "Салаты"}) {
           image {
              gatsbyImageData(placeholder: BLURRED)
              }
         }
        }
    `
