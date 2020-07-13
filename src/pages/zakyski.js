import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { useStylesCart } from '../components/common/style'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";
import Spinner from "../components/spinner/spinner";
import {productLoaded} from "../reducers/app";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Zakyski = ({data: {allContentfulProductZakuski: {edges: productsZakyski}, contentfulIconMenuLeftPanel: {image}},
                     dispatch, product}) => {

    const [load, setLoad] = React.useState(true)
    const classes = useStylesCart();

    useEffect(() => {
        dispatch(productLoaded(productsZakyski)) // action push to reduxStore
        setLoad(false)
    }, [productsZakyski, dispatch])

return ( 
   <section>
    <SEO title="Доставка закусок в Уразово | Заказать на дом или в офис"
    description="Доставка закусок от суши-бара Свисни в Уразово ☛ Телефон для заказа ☎ +7(904)094-92-22"/>
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600, fontSize: 40}}>Закуски</h1>
       </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Закуски" slugCategogy="/zakyski" visibleItems={product}
                                   image={image} product={product}/> : <Spinner />
        }
        </Grid>
      </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
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
                  weight
                      image {
                          fluid(maxWidth: 600) {
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
