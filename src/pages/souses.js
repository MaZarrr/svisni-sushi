import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { useStylesCart } from '../components/common/style';
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Souses = ({data: {allContentfulProductSouse: {edges: productsSouses}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {

 const classes = useStylesCart();

    useEffect(() => {
        dispatch(productLoaded(productsSouses)) // action push to reduxStore
    }, [productsSouses, dispatch])

return ( 
   <section>
    <SEO title="Соусы и различные добавки к суши и роллам"
    description="Фирменный соус, барбекю соус, ореховый соус и другие у нас в меню Свисни суши"/>
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600, fontSize: 40}}>Соусы</h1>
       </div>
    <Grid container justify="center">
        <CardsMenuPage titleCategory="Соус" slugCategogy="/souses" visibleItems={product}
                       image={image} product={product}/>
    </Grid>
</section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Souses)

export const query = graphql `
    {
      allContentfulProductSouse {
          edges {
              node {
                  id
                  price
                  name
                  count
                       image {
                           fluid(maxWidth: 300, maxHeight: 300) {
                               ...GatsbyContentfulFluid
                           }
                       }
              }
          }
      }
      contentfulIconMenuLeftPanel(name: {eq: "Соусы"}) {
         image {
           fluid(maxWidth: 35) {
             ...GatsbyContentfulFluid
           }
         }
       }
        }
    `
