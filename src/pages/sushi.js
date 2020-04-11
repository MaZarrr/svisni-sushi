import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { useStylesCart } from '../components/common/style'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Sushi = ({data: {allContentfulProductSushi: {edges: products}, contentfulIconMenuLeftPanel: {image}}, product, dispatch}) => {

  const classes = useStylesCart();
      
      useEffect(() => {
        dispatch(productLoaded(products)) // action push to reduxStore
      }, [products, dispatch])

return ( 
   <section>
    <SEO title="Недорогие суши с доставкой по Валуйскому району"
    description="Суши с лососем, авокадо, тунцом, угрём - меню на сайте, суши от 50 рублей. Звонок +7(904)094-92-22"/>
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600, fontSize: 40}}>Суши</h1>
       </div>
    <Grid container justify="center">
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

export const query = graphql `
    {
      allContentfulProductSushi {
          edges {
              node {
                  id
                  name
                  count
                  price
                  weight
                      image {
                          fluid(maxWidth: 300, maxHeight: 300) {
                              ...GatsbyContentfulFluid
                          }
                      }
              }
          }
      }
             contentfulIconMenuLeftPanel(name: {eq: "Суши"}) {
               image {
                 fluid(maxWidth: 35) {
                   ...GatsbyContentfulFluid
                 }
               }
             }
        }
    `
