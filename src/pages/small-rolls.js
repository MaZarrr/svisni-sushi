import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';
import loadable from "@loadable/component";
import {productLoaded} from "../reducers/app";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const SmallRolls = ({data: {allContentfulProductKlassika: {edges: productsSmallRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {

  const classes = useStylesCart();

    useEffect(() => {
        dispatch(productLoaded(productsSmallRolls)) // action push to reduxStore
    }, [productsSmallRolls, dispatch])

return ( 
   <section>
    <SEO title="Вкусные недорогие маки роллы. Заказать доставку на дом в Валуйки"
    description="Маленькие, жареные и темпурные классические Свисни роллы от 120 рублей"/>
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600, fontSize: 40}}>Классические роллы</h1>
       </div>
    <Grid container justify="center">
            <CardsMenuPage titleCategory="Классические" slugCategogy="/small-rolls" visibleItems={product}
                                   image={image} product={product}/>
        </Grid>
      </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(SmallRolls)

export const query = graphql `
    {
       allContentfulProductKlassika {
           edges {
               node {
                   id
                   name
                   price
                   variant
                   description
                   weight
                   count
                     image {
                         fluid(maxWidth: 300, maxHeight: 300) {
                             ...GatsbyContentfulFluid
                         }
                     }
               }
           }
       }
         contentfulIconMenuLeftPanel(name: {eq: "Классические"}) {
            image {
                fluid(maxWidth: 35) {
                    ...GatsbyContentfulFluid
                }
            }
        }
        }
    `

