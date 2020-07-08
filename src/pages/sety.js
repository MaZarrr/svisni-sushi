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

return (
  <>
    <SEO title="Заказать Cуши сет. Меню суши, роллы — доставка в Валуйки"
    description="Сеты в Уразово в ассортименте — широкий выбор, приятные цены. Закажи доставку роллов — в суши баре Свисни Суши"/>
   <section>
   <div className={classes.titleH1}>
    <h1 style={{fontFamily: `Oswald, cursive`,
    fontWeight: 600, fontSize: 40}}>Сеты</h1>
   </div>
       { load === false ?
       <div>
       <CustomizedInputSearch location={location.pathname}/>
       <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
           <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
           image={image} product={product}/>
       </Grid>
       </div> : <Spinner/>
       }
    </section>
   </>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter,
    checkboxFilter: state.filters.checkboxFilter
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
                  fluid(maxWidth: 300, maxHeight: 300) {
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
