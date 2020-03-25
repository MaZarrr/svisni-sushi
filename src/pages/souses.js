import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { useStylesCart } from '../components/common/style';
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Souses = ({data: {allContentfulProductSouse: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
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
    <SEO title="Соусы и различные добавки к суши и роллам" />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Соусы</h1>
       </div>
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Соус" slugCategogy="/souses" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Souses)

export const query = graphql `
    {
      allContentfulProductSouse {
          edges {
              node {
                  id
                  price
                  name
                  count
                       image {
                           fluid(maxWidth: 300, maxHeight: 300) {
                               ...GatsbyContentfulFluid
                           }
                       }
              }
          }
      }
      contentfulIconMenuLeftPanel(name: {eq: "Соусы"}) {
         image {
           fluid(maxWidth: 35) {
             ...GatsbyContentfulFluid
           }
         }
       }
        }
    `
