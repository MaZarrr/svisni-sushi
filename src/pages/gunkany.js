import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { useStylesCart } from '../components/common/style';
// import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Gunkany = ({data: {allContentfulProductGunkan: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    loadProduct, addedToCart, product}) => {
  
 // const [load, setLoad] = React.useState(true)
 const classes = useStylesCart();

 useEffect(() => {
   const data = setyProduct
   loadProduct(data); // action push to reduxStore
   //setLoad(false)
 }, [setyProduct, loadProduct])

return ( 
   <section>
    <SEO title="Заказать гунканы с доставкой в Валуйках" />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Гунканы</h1>
       </div>
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Гункан" slugCategogy="/gunkany" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Gunkany)

export const query = graphql `
    {
      allContentfulProductGunkan {
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
      contentfulIconMenuLeftPanel(name: {eq: "Гунканы"}) {
         image {
           fluid(maxWidth: 35) {
             ...GatsbyContentfulFluid
           }
         }
       }
        }
    `
