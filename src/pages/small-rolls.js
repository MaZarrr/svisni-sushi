import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const SmallRolls = ({data: {allContentfulProductKlassika: {edges: productsSmallRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {

    useEffect(() => {
        dispatch(productLoaded(productsSmallRolls)) 
    }, [productsSmallRolls, dispatch]);

return ( 
   <section>
    <SEO title="Недорогие маки роллы. Заказать доставку на дом в Валуйки"
      description="Маленькие, жареные и классические роллы с лососем от 120 рублей"/>

     <HeadSection titleTXT={"Классические роллы"} />
    <Grid container justify="center">
            <CardsMenuPage titleCategory="Классические" slugCategogy="/small-rolls" visibleItems={product}
                                   image={image} product={product}/>
        </Grid>
      </section>
    )
};

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(SmallRolls)

export const query = graphql `
    {
       allContentfulProductKlassika {
           edges {
               node {
                   id
                   name
                   price
                   variant
                   description
                   weight
                   count
                   image {
                    gatsbyImageData(placeholder: BLURRED formats: [WEBP, AUTO])
                  }
               }
           }
       }
         contentfulIconMenuLeftPanel(name: {eq: "Классические роллы"}) {
          image {
          gatsbyImageData(placeholder: BLURRED)
          }
        }
        }
    `

