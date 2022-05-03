import React, {useEffect} from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@mui/material";
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
    <Seo title="Заказать популярные салаты в Свисни Суши"
    description="Салат цезарь с креветками и курицей, салат коктейль. Заказывайте популярные салаты приготовленные из свежих продуктов."/>

      <HeadSection titleTXT={"Салаты"} />
      <Grid container justifyContent="center">
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

// export const query = graphql `
//     {
//           allContentfulProductSalat {
//               edges {
//                   node {
//                       id
//                       description
//                       name
//                       price
//                       weight
//                       image {
//                      gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                   }
//               }
//           }
//           contentfulIconMenuLeftPanel(name: {eq: "Салаты"}) {
//             image {
//               gatsbyImageData
//               }
//          }
//         }
//     `
