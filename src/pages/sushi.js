import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { useStylesCart } from '../components/common/style'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Sushi = ({data: {allContentfulProductSushi: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    loadProduct,
    addedToCart, product
  }) => {
  const classes = useStylesCart();
      
      useEffect(() => {
        const data = setyProduct
        loadProduct(data); // action push to reduxStore
      }, [setyProduct, loadProduct])

return ( 
   <section>
    <SEO title="Недорогие суши с доставкой по Валуйскому району"
    description="Суши с лососем, авокадо, тунцом, угрём - меню на сайте. Звонок +7(904)094-92-22"/>
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Суши</h1>
       </div>
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Суши" slugCategogy="/sushi" visibleItems={product}
                       setAddedToCart={addedToCart} image={image} product={product}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})

const mapDispatchToProps = (dispatch) => ({
    loadProduct: (newProduct) => dispatch(getProduct(newProduct)),
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Sushi)

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
