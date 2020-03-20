import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";

import { useStylesCart } from '../components/common/style'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import Spinner from "../components/spinner/spinner";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Zakyski = ({
      data: {
        allContentfulProductZakuski: {
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
    <SEO title="Заказать закуски с доставкой в Валуйки. Доставка закусок на дом и офис" />
      <h1 className={classes.titleH1}>Закуски</h1>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Закуски" slugCategogy="/zakyski" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Zakyski)

export const query = graphql `
    {
      allContentfulProductZakuski {
          edges {
              node {
                  id
                  name
                  count
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
      contentfulIconMenuLeftPanel(name: {eq: "Закуски"}) {
         image {
           fluid(maxWidth: 35) {
             ...GatsbyContentfulFluid
           }
         }
       }
        }
    `
