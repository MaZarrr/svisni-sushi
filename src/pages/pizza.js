import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { useStylesCart } from '../components/common/style';
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import * as R from 'ramda'

import loadable from "@loadable/component";
import {productPizzaLoaded} from "../reducers/app";
import {defFilters} from "../reducers/filters";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Pizza = ({data: {allContentfulProductPizza: {edges: pizzaProduct}, contentfulIconMenuLeftPanel: {image}},
    productPizza, searchText, priceFilter, dispatch }) => {

    const [load, setLoad] = React.useState(true)
    const classes = useStylesCart();

    useEffect(() => {
          if(!R.isEmpty(productPizza)) {
            setLoad(false)
              dispatch(defFilters())
            return
          }
          const ProductFetch = async () => {
            return await pizzaProduct
          }
          ProductFetch()
           .then((data) => dispatch(productPizzaLoaded(data)))
           .then(() => setLoad(false))
            .then(() => dispatch(defFilters()))
      }, [productPizza, dispatch, pizzaProduct])

    const visibleItems = filtersProducts(productPizza, searchText, priceFilter)

return ( 
   <section>
    <SEO title="Доставка пиццы в Валуйки. Заказ с 10:00 до 22:00"
        description="Заказать пиццу в Уразово. Посмотреть меню на сайте с описанием и ценами. Скидка 10%, пицца бесплатно"
        pathname="/sety"/>
      <div className={classes.titleH1}>
        <h1 style={{fontFamily: `Oswald, cursive`,
        fontWeight: 600, fontSize: 40}}>Пицца</h1>
      </div>
       {load === false ?
           <div>
               <CustomizedInputSearch/>
               <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                   <CardsMenuPage titleCategory="Пицца" slugCategogy="/pizza" visibleItems={visibleItems}
                                  image={image} product={productPizza}/>
               </Grid>
           </div> : <Spinner/>
       }
  </section>
    )
}

const mapStateToProps = (state, props) => ({
    productPizza: state.app.productPizza,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
})

export default connect(mapStateToProps, null)(Pizza)

export const queryPizza = graphql `
    {
        allContentfulProductPizza  {
          edges {
            node {
                id
                slug
                name
                price
                count
                priceIn33cm
                weight
                description
                image {
                  fluid(maxWidth: 300, maxHeight: 300, quality: 30) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
        contentfulIconMenuLeftPanel(name: {eq: "Пицца"}) {
         image {
           fluid(maxWidth: 35) {
             ...GatsbyContentfulFluid
           }
         }
       }
        }
    `



// const [load, setLoad] = React.useState(true)
// const classes = useStylesCart();
// // const initialState = React.useMemo(() => productRequested(), [])
// //   console.log(initialState);

// // React.useCallback(() => Request(pizzaProduct), productPizza)

// const getProduct = (products) => {
//   const ProductFetch = async () => {
//     return await products
//   }
//   return ProductFetch()
//     .then((data) => producPizzaLoad(data))
//     .then(() => setLoad(false))
// }

// const useRequest = (request) => {
//   const initialState = React.useMemo(() => ({
//     productPizza
//   }), [productPizza])

//   const [sss, setSss] = React.useState(initialState.productPizza)
//   useEffect(() => {
//     request()
//       .then((data) => setSss(data))
//     console.log('pizza');

//   }, [request, productPizza])
//   return sss
// }
// const useProductInfo = (pizzaProduct) => {
//   const request = React.useCallback(
//     () => getProduct(pizzaProduct), [pizzaProduct])
//   return useRequest(request)
// }
// useProductInfo(pizzaProduct);
