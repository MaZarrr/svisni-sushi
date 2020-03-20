import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";
import { useStylesCart } from '../components/common/style';
import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Gunkany = ({
      data: {
        allContentfulProductGunkan: {
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
    <SEO title="Заказать гунканы с доставкой в Валуйках" />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Гунканы</h1>
       </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Гункан" slugCategogy="/gunkany" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Gunkany)

export const query = graphql `
    {
      allContentfulProductGunkan {
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
      contentfulIconMenuLeftPanel(name: {eq: "Гунканы"}) {
         image {
           fluid(maxWidth: 35) {
             ...GatsbyContentfulFluid
           }
         }
       }
        }
    `
