import React, {useEffect} from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@mui/material";
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Sushi = ({data: {allContentfulProductSushi: {edges: products}, contentfulIconMenuLeftPanel: {image}}, product, dispatch}) => {

      useEffect(() => {
        dispatch(productLoaded(products)) // action push to reduxStore
      }, [products, dispatch]);

return ( 
   <section>
    <Seo title="Недорогие суши с доставкой по Валуйскому району"
      description="Суши с лососем, авокадо, тунцом, угрём - меню на сайте, суши от 50 рублей. Звонок +7(904)094-92-22"
      pathname="/pizza"/>

    <HeadSection titleTXT={"Суши"} />
    <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
        <CardsMenuPage titleCategory="Суши" slugCategogy="/sushi" visibleItems={product}
                       image={image} product={product}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Sushi)

// export const query = graphql `
//     {
//       allContentfulProductSushi {
//           edges {
//               node {
//                   id
//                   name
//                   description
//                   count
//                   price
//                   weight
//                   image {
//                     gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//               }
//           }
//       }
//      contentfulIconMenuLeftPanel(name: {eq: "Суши"}) {
//         image {
//           gatsbyImageData
//         }
//      }
// }
//     `
