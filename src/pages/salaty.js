import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";
import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';
import loadable from "@loadable/component";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Salaty = ({
      data: {
        allContentfulProductSalat: {
          edges: setyProduct
        },
        contentfulIconMenuLeftPanel: {
          image
        }
      },
    producSetsLoad, 
    setAddedToCart, product
  }) => {
  
 const [load, setLoad] = React.useState(true)
 const classes = useStylesCart();

 useEffect(() => {
   const data = setyProduct
   producSetsLoad(data); // action push to reduxStore
   setLoad(false)
 }, [setyProduct, producSetsLoad])

return ( 
   <section>
    <SEO title="Заказать салаты с 10:00 до 22:00 с доставкой в Валуйки. Доставка салатов на дом и офис" />
    <h1 className={classes.titleH1}>Салаты</h1>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Салат" slugCategogy="/salaty" visibleItems={product}
                                   setAddedToCart={setAddedToCart} image={image} product={product}/> : <Spinner />
        }
        </Grid>
      </section>
    )
}

const mapStateToProps = ({ setList: {product} }) => {
    return {product};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    producSetsLoad: (newProduct) => {
        dispatch(producSetsLoad(newProduct))
    },
    setAddedToCart: (id, price, product) => {
      dispatch(setAddedToCart(id, price, product))
    }
    }  
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Salaty)

export const query = graphql `
    {
          allContentfulProductSalat {
              edges {
                  node {
                      id
                      description
                      name
                      price
                      weight
                        image {
                            fluid(maxWidth: 300, maxHeight: 300) {
                                ...GatsbyContentfulFluid
                            }
                        }
                  }
              }
          }
            contentfulIconMenuLeftPanel(name: {eq: "Салаты"}) {
           image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
           }
         }
        }
    `
