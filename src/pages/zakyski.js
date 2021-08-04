import React, {useEffect} from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Zakyski = ({data: {allContentfulProductZakuski: {edges: productsZakyski}, contentfulIconMenuLeftPanel: {image}},
                     dispatch, product}) => {

    useEffect(() => {
        dispatch(productLoaded(productsZakyski)) // action push to reduxStore
    }, [productsZakyski, dispatch])

return ( 
   <section>
    <Seo title="Доставка закусок в Уразово | Заказать на дом или в офис"
    description="Доставка закусок от суши-бара Свисни в Уразово ☛ Телефон для заказа ☎ +7(904)094-92-22"/>

     <HeadSection titleTXT={"Закуски"} />
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Закуски" slugCategogy="/zakyski" visibleItems={product}
                                   image={image} product={product}/>
        </Grid>
      </section>
    )
};

const mapStateToProps = (state) => ({
    product: state.app.product
});
  
export default connect(mapStateToProps, null)(Zakyski)

export const query = graphql `
  {
  allContentfulProductZakuski {
    edges {
      node {
        id
        name
        count
        price
        description
        weight
        image {
          gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
        }
      }
    }
  }
  contentfulIconMenuLeftPanel(name: {eq: "Закуски"}) {
    image {
      gatsbyImageData
    }
  }
}

    `
