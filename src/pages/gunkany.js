import React, { useEffect } from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@mui/material";
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Gunkany = ({data: {allContentfulProductGunkan: {edges: productsGunkan}, contentfulIconMenuLeftPanel: {image}},
                     dispatch, product}) => {

    useEffect(() => {
        dispatch(productLoaded(productsGunkan)) // action push to reduxStore
    }, [productsGunkan, dispatch])

return ( 
   <section>
    <Seo title="Заказать гунканы с доставкой в Валуйках"
    description="Гунканы с икрой, крабом, угрём. Гунканы от 55 рублей. Подробнее в нашем меню на сайте Свисни Суши "
    noindex={true} />

      <HeadSection titleTXT={"Гунканы"} />
      <Grid container justifyContent="center">
        <CardsMenuPage titleCategory="Гункан" slugCategogy="/gunkany" visibleItems={product}
                       image={image} product={product}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Gunkany)

// export const query = graphql `
//     {
//       allContentfulProductGunkan {
//           edges {
//               node {
//                   id
//                   name
//                   count
//                   description
//                   price
//                   weight
//                    image {
//                      gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//               }
//           }
//       }
//       contentfulIconMenuLeftPanel(name: {eq: "Гунканы"}) {
//           image {
//              gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//           }
//        }
//         }
//     `
