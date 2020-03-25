import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style'
import Spinner from '../components/spinner/spinner'
import loadable from "@loadable/component";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Kombo = ({data: {allContentfulProductKombo: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
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
    <SEO title="Доставка комбо наборов из суши, роллов, пиццы и лапши Вок"
    description="Специальные комбо наборы, выгодно, заказать в Уразово с 10 до 22:00"/>
        <div className={classes.titleH1}>
            <h1 style={{fontFamily: `Oswald, cursive`,
                fontWeight: 600}}>Комбо</h1>
        </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Комбо" slugCategogy="/kombo" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Kombo)

export const querySets = graphql `
    {
        allContentfulProductKombo {
          edges {
            node {
                id
              slug
              name
              price
              weight
              count
              description
              image {
                  fluid(maxWidth: 310) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
           contentfulIconMenuLeftPanel(name: {eq: "Комбо"}) {
            image {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
    `

