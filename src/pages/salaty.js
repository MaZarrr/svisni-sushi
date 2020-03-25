import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';
import loadable from "@loadable/component";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Salaty = ({data: {allContentfulProductSalat: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    loadProduct,
    addedToCart, product
  }) => {
  
 const [load, setLoad] = React.useState(true)
 const classes = useStylesCart();

 useEffect(() => {
   const data = setyProduct
   loadProduct(data); // action push to reduxStore
   setLoad(false)
 }, [setyProduct, loadProduct])

return ( 
   <section>
    <SEO title="Заказать салаты с 10:00 до 22:00 с доставкой в Валуйки. Доставка салатов на дом и офис" />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Салаты</h1>
       </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Салат" slugCategogy="/salaty" visibleItems={product}
                                   setAddedToCart={addedToCart} image={image} product={product}/> : <Spinner />
        }
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Salaty)

export const query = graphql `
    {
          allContentfulProductSalat {
              edges {
                  node {
                      id
                      description
                      name
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
            contentfulIconMenuLeftPanel(name: {eq: "Салаты"}) {
           image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
           }
         }
        }
    `
