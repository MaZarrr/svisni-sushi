import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql} from "gatsby";
import { connect } from 'react-redux';

import {
  producSetsLoad,
  setAddedToCart,
  productRequested
} from "../actions";

import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import filtersProducts from '../utils/filtersProducts'
import loadable from '@loadable/component'
import {useStylesCart} from "../components/common/style";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Sety = ({
      data: {
        allContentfulProduct: {
          edges: setyProduct
        },
        contentfulIconMenuLeftPanel: {
          image
        }
      },
    producSetsLoad,
    setAddedToCart,
    product, searchText, priceFilter, checkboxFilter, location
  }) => {

    // const [ listJsx, updateLustJsx ] = React.useState('')
    const [load, setLoad] = React.useState(true)
    
    useEffect(() => {
      producSetsLoad(setyProduct)
      setLoad(false)
      }, [setyProduct, producSetsLoad])

    const classes = useStylesCart();

    const visibleItems = filtersProducts(product, searchText, priceFilter, checkboxFilter)

    if(load) {
      return <div style={{display: `flex`, 
      justifyContent: `center`, 
      alignItems: `center`}}> 
      <Spinner /></div>
    }

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
    <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
                   setAddedToCart={setAddedToCart} image={image} product={product}/>
    </Grid>
    </section>
   </>
    )
}

const mapStateToProps = ({
    setList: {
      product,
      searchText,
      priceFilter,
      checkboxFilter
    }
  }) => {
    return {product, searchText, priceFilter, checkboxFilter};
  }

  const mapDispatchToProps = (dispatch) => {
    return {
    productRequested: () => dispatch(productRequested()),
    producSetsLoad: (newProduct) => {
        dispatch(producSetsLoad(newProduct))
    },
    setAddedToCart: (id, price, product) => {
        dispatch(setAddedToCart(id, price, product))
        }
    }
};

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