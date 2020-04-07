import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Salaty = ({data: {allContentfulProductSalat: {edges: productsSalaty}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product}) => {

 const classes = useStylesCart();

    useEffect(() => {
        dispatch(productLoaded(productsSalaty)) // action push to reduxStore
    }, [productsSalaty, dispatch])

return ( 
   <section>
    <SEO title="Заказать салаты с 10:00 до 22:00 с доставкой в Валуйки. Доставка салатов на дом и офис" />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Салаты</h1>
       </div>
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Салат" slugCategogy="/salaty" visibleItems={product}
                                   image={image} product={product}/>
        </Grid>
      </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Salaty)

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
