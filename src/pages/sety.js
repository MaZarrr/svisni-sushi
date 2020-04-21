import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql} from "gatsby";
import { connect } from 'react-redux';

import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import filtersProducts from '../utils/filtersProducts'
import loadable from '@loadable/component'
import {useStylesCart} from "../components/common/style";
import {productLoaded} from "../reducers/app";
import {defFilters} from "../reducers/filters";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner/>
})

const Sety = ({data: {allContentfulProduct: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
                  product, searchText, priceFilter, checkboxFilter, location, dispatch}) => {

    // const [ listJsx, updateLustJsx ] = React.useState('')
    const [load, setLoad] = React.useState(true)
    const classes = useStylesCart();

    useEffect(() => {
        // dispatch(setLoading(true))
        dispatch(productLoaded(setyProduct))
        // dispatch(setLoading(false))
        dispatch(defFilters())
        setLoad(false)
    }, [setyProduct, dispatch])

    const visibleItems = filtersProducts(product, searchText, priceFilter, checkboxFilter)

    if(load) {
        return <div style={{display: `flex`,
            justifyContent: `center`,
            alignItems: `center`}}>
            <Spinner /></div>
    }

return (
  <>
    <SEO title="Заказать сет роллов в Валуйки. Бесплатная доставка наборов от 500 рублей"
    description="Меню суши сеты, приятные цены, бесплатная доставка по Уразово и Валуйкам. Работаем с 10 до 22:00"/>
   <section>
   <div className={classes.titleH1}>
    <h1 style={{fontFamily: `Oswald, cursive`,
    fontWeight: 600, fontSize: 40}}>Сеты</h1>
   </div>
  <CustomizedInputSearch location={location.pathname}/>
    <Grid container justify="center" itemscope itemtype="http://schema.org/ItemList">
        <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
                                  image={image} product={product}/>

    </Grid>
    </section>
   </>
    )
}

const mapStateToProps = (state, props) => ({
    product: state.app.product,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
})
export default connect(mapStateToProps, null)(Sety)

export const querySet = graphql `
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
