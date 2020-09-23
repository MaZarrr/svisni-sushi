import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {defFilters} from "../reducers/filters";
import {useStyleH1} from "../components/common/style";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'));
const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'));

const BrandedRolls = ({data: {allContentfulProductSlognyeRolly: {edges: productsBrandedRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter }) => {
  
  const { title } = useStyleH1();
  const [load, setLoad] = React.useState(true);

    useEffect(() => {
        dispatch(productLoaded(productsBrandedRolls)) // action push to reduxStore
        setLoad(false)
        dispatch(defFilters())
    }, [productsBrandedRolls, dispatch])

      const visibleItems = filtersProducts(product, searchText, priceFilter)

return ( 
   <section>
    <SEO title="Меню фирменные роллы. Доставка сложных роллов на дом в Валуйки"  
    description="Роллы которых вы еще не пробовали от 210 рублей. Закажи доставку или приходи к нам в гости!"
    pathname="/hot-rolls"/>

       <h1 className={title}>Сложные роллы</h1>
       {load === false ? <>
               <CustomizedInputSearch/>
               <Grid container justify="center">
                   <CardsMenuPage titleCategory="Сложные роллы" slugCategogy="/branded-rolls"
                                  visibleItems={visibleItems}
                                  image={image} product={product}/>
               </Grid> </> : <Spinner/>
       }
  </section>
    )
}

const mapStateToProps = (state, props) => ({
    product: state.app.product,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
})
  
export default connect(mapStateToProps, null)(BrandedRolls)

export const queryBrandedRolls = graphql `
    {
        allContentfulProductSlognyeRolly {
          edges {
            node {
                id
              slug
              name
              price
              description
              weight
              count
              image {
                 fluid(maxWidth: 400, maxHeight: 400, quality: 100) {
                     ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
          contentfulIconMenuLeftPanel(name: {eq: "Сложные роллы"}) {
          image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
          }
        }
        }
    `



