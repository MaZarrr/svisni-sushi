import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql} from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import { productLoaded} from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'))

const Napitki = ({data: {allContentfulProductNapitki: {edges: productsDrink}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {

    useEffect(() => {
        dispatch(productLoaded(productsDrink)) // action push to reduxStore
    }, [productsDrink, dispatch])

return ( 
   <section>
    <SEO title="Доставка напитков на дом" 
       description="Коктейль Голубая лагуна, Мохито. Фруктовые, охлаждающие коктейли, пепси от 35 рублей"
    />
     <HeadSection titleTXT={"Напитки"} />
    <Grid container justify="center">
            <CardsMenuPage titleCategory="Напитки" slugCategogy="/napitki" visibleItems={product}
                                   image={image} product={product}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Napitki)

export const query = graphql `
    {
    allContentfulProductNapitki {
        edges {
            node {
                id
                price
                name
                weight
                 image {
                    gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
                  }
            }
        }
    }
        contentfulIconMenuLeftPanel(name: {eq: "Напитки"}) {
            image {
              gatsbyImageData
              }
         }
        }
    `
