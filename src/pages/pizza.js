import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { producPizzaLoad, setAddedToCart, productRequested } from "../actions";

import { useStylesCart } from '../components/common/style';
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import * as R from 'ramda'

import loadable from "@loadable/component";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Pizza = ({
      data: {
        allContentfulProductPizza: {
          edges: pizzaProduct
        },
        contentfulIconMenuLeftPanel: {
          image
        }
      },
    producPizzaLoad,
    setAddedToCart, productPizza, productRequested, searchText, priceFilter
  }) => {
  const [load, setLoad] = React.useState(true)
  const classes = useStylesCart();

    useEffect(() => {
          if(!R.isEmpty(productPizza)) {
            setLoad(false)
            return
          }
          const ProductFetch = async () => {
            return await pizzaProduct
          }
          ProductFetch()
           .then((data) => producPizzaLoad(data))
           .then(() => setLoad(false))
      }, [producPizzaLoad, pizzaProduct, productRequested, productPizza])

const visibleItems = filtersProducts(productPizza, searchText, priceFilter)

 if(load) {
    return <div style={{display: `flex`, 
    justifyContent: `center`, 
    alignItems: `center`}}> 
    <Spinner /></div>
  }

return ( 
   <section>
    <SEO title="Доставка пиццы в Валуйках - сытная пицца с быстрой и бесплатной доставкой от 500р"
      description="Заказать пиццу на дом в Валуйки от бара Свисни Суши.
      Скидка на пиццу 10% в счастливые часы. Свисни пицца от 235р с быстрой доставкой на дом и в офис!"/>

      <div className={classes.titleH1}>
        <h1 style={{fontFamily: `Oswald, cursive`,
        fontWeight: 600, }}>Пицца</h1>
      </div>
       <CustomizedInputSearch />
  <Grid container justify="center" >
        <CardsMenuPage titleCategory="Пицца" slugCategogy="/pizza" visibleItems={visibleItems}
                       setAddedToCart={setAddedToCart} image={image} product={productPizza}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = ({ setList: {productPizza, searchText, priceFilter} }) => {
    return {productPizza, searchText, priceFilter};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    productRequested: () => dispatch(productRequested()),
    producPizzaLoad: (newProduct) => {
        dispatch(producPizzaLoad(newProduct))
    },
    setAddedToCart: (id, price, productPizza) => {
        dispatch(setAddedToCart(id, price, productPizza))
        }
    }  
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Pizza)

export const query = graphql `
    {
        allContentfulProductPizza  {
          edges {
            node {
                id
              slug
              name
              price
              priceIn33cm
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
