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

const SmallRolls = ({data: {allContentfulProductKlassika: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
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
    <SEO title="Вкусные недорогие роллы. Заказать доставку на дом в Валуйки" />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Классические роллы</h1>
       </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Классические" slugCategogy="/small-rolls" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(SmallRolls)

export const query = graphql `
    {
       allContentfulProductKlassika {
           edges {
               node {
                   id
                   name
                   price
                   variant
                   description
                   weight
                   count
                     image {
                         fluid(maxWidth: 300, maxHeight: 300) {
                             ...GatsbyContentfulFluid
                         }
                     }
               }
           }
       }
         contentfulIconMenuLeftPanel(name: {eq: "Классические"}) {
            image {
                fluid(maxWidth: 35) {
                    ...GatsbyContentfulFluid
                }
            }
        }
        }
    `

