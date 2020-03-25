import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import { useStylesCart } from '../components/common/style'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const HotRolls = ({data: {allContentfulProductHotRolly: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
    loadProduct, addedToCart, product, searchText, priceFilter}) => {

  const [load, setLoad] = React.useState(true)
  const classes = useStylesCart();
      
    useEffect(() => {
        const data = setyProduct
        loadProduct(data); // action push to reduxStore
        setLoad(false)
      }, [setyProduct, loadProduct])

    const visibleItems = filtersProducts(product, searchText, priceFilter)
    
    if(load) {
      return <div style={{display: `flex`, 
      justifyContent: `center`, 
      alignItems: `center`}}> 
      <Spinner /></div>
    }

return ( 
   <section>
    <SEO title="Запечёные, гриль, жареные роллы, меню на сайте. Работаем с 10 до 22.00"   
    description="Закажи горячие роллы, оцени великолепный вкус японской кухни от Свисни Суши. Доставка Валуйки"/>
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Гриль роллы</h1>
       </div>
  <CustomizedInputSearch />
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Горячие роллы" slugCategogy="/hot-rolls" visibleItems={visibleItems}
                       setAddedToCart={addedToCart} image={image} product={product}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
})

const mapDispatchToProps = (dispatch) => ({
    loadProduct: (newProduct) => dispatch(getProduct(newProduct)),
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(HotRolls)

export const query = graphql `
    {
       allContentfulProductHotRolly {
          edges {
            node {
                id
              slug
              name
              price
              description
              weight
              variant
              count
              image {
                  fluid(maxWidth: 300, maxHeight: 300) {
                      ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
        contentfulIconMenuLeftPanel(name: {eq: "Горячие"}) {
             image {
               fluid(maxWidth: 35) {
                 ...GatsbyContentfulFluid
               }
             }
            }
        }
    `




