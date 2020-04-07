import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql} from "gatsby";
import { connect } from 'react-redux';
import { useStylesCart } from '../components/common/style';
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import { productLoaded} from "../reducers/app";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Napitki = ({data: {allContentfulProductNapitki: {edges: productsDrink}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {

   const classes = useStylesCart();

    useEffect(() => {
        dispatch(productLoaded(productsDrink)) // action push to reduxStore
    }, [productsDrink, dispatch])

return ( 
   <section>
    <SEO title="Доставка напитков на дом" 
       description="Коктейль Голубая лагуна, Мохито. Фруктовые, охлаждающие коктейли"
    />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Напитки</h1>
       </div>
    <Grid container justify="center">
            <CardsMenuPage titleCategory="Напитки" slugCategogy="/napitki" visibleItems={product}
                                   image={image} product={product}/>
    </Grid>
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Napitki)

export const queryDrink = graphql `
    {
    allContentfulProductNapitki {
        edges {
            node {
                id
                price
                name
                weight
                    image {
                        fluid(maxWidth: 300, maxHeight: 300) {
                            ...GatsbyContentfulFluid
                        }
                    }
            }
        }
    }
        contentfulIconMenuLeftPanel(name: {eq: "Напитки"}) {
           image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
           }
         }
        }
    `
