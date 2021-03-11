import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Souses = ({data: {allContentfulProductSouse: {edges: productsSouses}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {

    useEffect(() => {
        dispatch(productLoaded(productsSouses)) // action push to reduxStore
    }, [productsSouses, dispatch])

return ( 
   <section>
    <SEO title="Соусы и различные добавки к суши и роллам"
    description="Фирменный соус, барбекю соус, ореховый соус и другие у нас в меню Свисни суши"
    noindex={true}/>

     <HeadSection titleTXT={"Соусы"} />
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Соус" slugCategogy="/souses" visibleItems={product}
                       image={image} product={product}/>
    </Grid>
</section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Souses)

export const query = graphql `
    {
      allContentfulProductSouse {
          edges {
              node {
                  id
                  price
                  name
                  count
                  weight
                image {
                    gatsbyImageData(placeholder: BLURRED formats: [WEBP, AUTO])
                  }
              }
          }
      }
      contentfulIconMenuLeftPanel(name: {eq: "Соусы"}) {
        image {
          gatsbyImageData(placeholder: BLURRED)
          }
       }
    }
    `
