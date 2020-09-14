import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";
import {useStyleH1} from "../components/common/style";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Salaty = ({data: {allContentfulProductSalat: {edges: productsSalaty}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product}) => {

    const { title } = useStyleH1();

    useEffect(() => {
        dispatch(productLoaded(productsSalaty)) // action push to reduxStore
    }, [productsSalaty, dispatch]);

return ( 
   <section>
    <SEO title="Заказать популярные салаты"
    description="Для вас предоставленна возможность заказа наиболее популярных салатов приготовленных из свежих продуктов.
    Вашему вниманию: салаты цезарь в вариациях и чука."/>
       <h1 className={title}>Салаты</h1>
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
                            fluid(maxWidth: 400, maxHeight: 400) {
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
