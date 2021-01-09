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
        dispatch(productLoaded(productsSmallRolls)) // action push to reduxStore
    }, [productsSmallRolls, dispatch]);

return ( 
   <section>
    <SEO title="Вкусные недорогие маки роллы. Заказать доставку на дом в Валуйки"
      description="Маленькие, жареные и темпурные классические Свисни роллы от 120 рублей"
      pathname="/pizza"/>

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
                         fluid(maxWidth: 400, maxHeight: 400, quality: 100) {
                             ...GatsbyContentfulFluid
                         }
                     }
               }
           }
       }
         contentfulIconMenuLeftPanel(name: {eq: "Классические роллы"}) {
            image {
                fluid(maxWidth: 35) {
                    ...GatsbyContentfulFluid
                }
            }
        }
        }
    `

