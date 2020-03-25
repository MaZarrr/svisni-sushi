import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { useStylesCart } from '../components/common/style'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import Spinner from "../components/spinner/spinner";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Zakyski = ({data: {allContentfulProductZakuski: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    loadProduct, addedToCart, product}) => {

    const [load, setLoad] = React.useState(true)
    const classes = useStylesCart();
      
    useEffect(() => {
        const data = setyProduct
        loadProduct(data); // action push to reduxStore
        setLoad(false)
      }, [setyProduct, loadProduct])

return ( 
   <section>
    <SEO title="Заказать закуски с доставкой в Валуйки. Доставка закусок на дом и офис" />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Закуски</h1>
       </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Закуски" slugCategogy="/zakyski" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Zakyski)

export const query = graphql `
    {
      allContentfulProductZakuski {
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
      contentfulIconMenuLeftPanel(name: {eq: "Закуски"}) {
         image {
           fluid(maxWidth: 35) {
             ...GatsbyContentfulFluid
           }
         }
       }
        }
    `
