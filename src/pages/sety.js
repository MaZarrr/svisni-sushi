import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql} from "gatsby";
import { connect } from 'react-redux';

import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import filtersProducts from '../utils/filtersProducts'
import loadable from '@loadable/component'
import {useStylesCart} from "../components/common/style";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner/>
})

const Sety = ({data: {allContentfulProduct: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    loadProduct, addedToCart, product, searchText, priceFilter, checkboxFilter, location, dispatch}) => {

    // const [ listJsx, updateLustJsx ] = React.useState('')
    // const [load, setLoad] = React.useState(true)
    useEffect(() => {
        loadProduct(setyProduct)
    }, [setyProduct, loadProduct])

    const classes = useStylesCart();
    const visibleItems = filtersProducts(product, searchText, priceFilter, checkboxFilter)

return (
  <>
    <SEO title="Доставка суши и роллов в Валуйки. Заказать сет с 10 до 22:00" 
    description="Меню суши, роллы. Наборы, широкий выбор, приятные цены, бесплатная доставка по Валуйскому району"/>
   <section>
   <div className={classes.titleH1}>
    <h1 style={{fontFamily: `Oswald, cursive`,
    fontWeight: 600, }}>Сеты</h1>
   </div>
  <CustomizedInputSearch location={location.pathname}/>
    <Grid container justify="center" >
        {/*{ loading ? */}
            <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
                           setAddedToCart={addedToCart} image={image} product={product}/>
                                   {/*: <Spinner/>}*/}
    </Grid>
    </section>
   </>
    )
}

const mapStateToProps = (state, props) => ({
    product: state.app.product,
    loading: state.app.loading,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
})

  const mapDispatchToProps = (dispatch) => ({
      loadProduct: (newProduct) => dispatch(getProduct(newProduct)),
      addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
    })

export default connect(mapStateToProps, mapDispatchToProps)(Sety)

export const querySets = graphql `
    {
        allContentfulProduct {
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
                  fluid(maxWidth: 300, maxHeight: 300, quality: 30) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
           contentfulIconMenuLeftPanel(name: {eq: "Сеты"}) {
            image {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
    `


// const mapStateToProps = ({
//     setList: {
//       product,
//       searchText,
//       priceFilter,
//       checkboxFilter
//     }
//   }) => {
//     return {product, searchText, priceFilte