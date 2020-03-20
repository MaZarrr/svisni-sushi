import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";

import { useStylesCart } from '../components/common/style'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Sushi = ({
      data: {
        allContentfulProductSushi: {
          edges: setyProduct
        },
        contentfulIconMenuLeftPanel: {
          image
        }
      },
    producSetsLoad, 
    setAddedToCart, product
  }) => {
  const classes = useStylesCart();
      
      useEffect(() => {
        const data = setyProduct
        producSetsLoad(data); // action push to reduxStore
      }, [setyProduct, producSetsLoad])

return ( 
   <section>
    <SEO title="Недорогие суши с доставкой по Валуйскому району"
    description="Суши с лососем, авокадо, тунцом, угрём - меню на сайте. Звонок +7(904)094-92-22"/>
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Суши</h1>
       </div>
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Суши" slugCategogy="/sushi" visibleItems={product}
                       setAddedToCart={setAddedToCart} image={image} product={product}/>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Sushi)

export const query = graphql `
    {
      allContentfulProductSushi {
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
             contentfulIconMenuLeftPanel(name: {eq: "Суши"}) {
               image {
                 fluid(maxWidth: 35) {
                   ...GatsbyContentfulFluid
                 }
               }
             }
        }
    `
