import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {useStyleH1} from "../components/common/style";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Gunkany = ({data: {allContentfulProductGunkan: {edges: productsGunkan}, contentfulIconMenuLeftPanel: {image}},
                     dispatch, product}) => {

    const { title } = useStyleH1();

    useEffect(() => {
        dispatch(productLoaded(productsGunkan)) // action push to reduxStore
    }, [productsGunkan, dispatch])

return ( 
   <section>
    <SEO title="Заказать гунканы с доставкой в Валуйках"
    description="Гунканы с икрой, крабом, угрём. Гунканы от 55 рублей. Подробнее в нашем меню на сайте Свисни Суши "
    noindex={true} />
       <h1 className={title}>Гунканы</h1>
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Гункан" slugCategogy="/gunkany" visibleItems={product}
                       image={image} product={product}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Gunkany)

export const query = graphql `
    {
      allContentfulProductGunkan {
          edges {
              node {
                  id
                  name
                  count
                  description
                  price
                  weight
                      image {
                          fluid(maxWidth: 350, maxHeight: 350) {
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
