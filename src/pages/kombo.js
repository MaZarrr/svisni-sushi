import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Kombo = ({data: {allContentfulProductKombo: {edges: productsKombo}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {

  const classes = useStylesCart();

    useEffect(() => {
        dispatch(productLoaded(productsKombo)) // action push to reduxStore
    }, [productsKombo, dispatch])

return (
    <section>
    <SEO title="Доставка комбо наборов из суши, роллов, пиццы и лапши Вок"
    description="Специальные комбо наборы, выгодно, заказать в Уразово с 10 до 22:00"/>
        <div className={classes.titleH1}>
            <h1 style={{fontFamily: `Oswald, cursive`,
                fontWeight: 600, fontSize: 40}}>Комбо</h1>
        </div>
    <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
        <CardsMenuPage titleCategory="Комбо" slugCategogy="/kombo" visibleItems={product}
                       image={image} product={product}/>
  </Grid>
</section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product
})
  
export default connect(mapStateToProps, null)(Kombo)

export const queryKombo = graphql `
    {
        allContentfulProductKombo {
          edges {
            node {
                id
              slug
              name
              price
                edit
              weight
              count
              description
              image {
                  fluid(maxWidth: 380) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
           contentfulIconMenuLeftPanel(name: {eq: "Комбо"}) {
            image {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
    `

