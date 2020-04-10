import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {defFilters} from "../reducers/filters";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const BrandedRolls = ({data: {allContentfulProductSlognyeRolly: {edges: productsBrandedRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter }) => {
  
  const classes = useStylesCart();
  const [load, setLoad] = React.useState(true)

    useEffect(() => {
        dispatch(productLoaded(productsBrandedRolls)) // action push to reduxStore
        setLoad(false)
        dispatch(defFilters())
    }, [productsBrandedRolls, dispatch])

      const visibleItems = filtersProducts(product, searchText, priceFilter)

      if(load) {
      return <div style={{display: `flex`, 
      justifyContent: `center`, 
      alignItems: `center`}}> 
      <Spinner /></div>
    }
      
return ( 
   <section>
    <SEO title="Меню фирменные роллы. Доставка сложных роллов на дом в Валуйки"  
    description="Роллы которых вы еще не пробовали. Филадельфия от 270 рублей. Закажи доставку или приходи к нам в гости"/>
    <div className={classes.titleH1}>
    <h1 style={{fontFamily: `Oswald, cursive`,
    fontWeight: 600, fontSize: 40 }}>Сложные роллы</h1>
   </div>
   <CustomizedInputSearch />
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Сложные роллы" slugCategogy="/branded-rolls" visibleItems={visibleItems}
                       image={image} product={product}/>
    </Grid>
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
                 fluid(maxWidth: 300, maxHeight: 350) {
                     ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
          contentfulIconMenuLeftPanel(name: {eq: "Фирменные"}) {
          image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
          }
        }
        }
    `



