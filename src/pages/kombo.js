import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import {useStyleH1} from '../components/common/style'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import Spinner from '../components/spinner/spinner'
const CardsMenuPage = loadable(()=> import('../components/CardsMenuPage'))

const Kombo = ({data: {allContentfulProductKombo: {edges: productsKombo}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product }) => {
    const [load, setLoad] = React.useState(true);
    const { title } = useStyleH1();

    useEffect(() => {
        dispatch(productLoaded(productsKombo))
        setTimeout(() => {
            setLoad(false)
        }, 700)
    }, [productsKombo, dispatch]);

return (
    <section>
    <SEO title="Доставка комбо наборов из суши, роллов и пиццы в Валуйки"
    description="Заказать специальные комбо наборы, собирай свои блюда из суши и пиццы выгодно. Работаем с 10 до 22:00"/>
            <h1 className={title}>Комбо из суши, роллов и пиццы</h1>
        {load === false ?
            <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                <CardsMenuPage titleCategory="Комбо" slugCategogy="/kombo" visibleItems={product}
                               image={image} product={product}/>
            </Grid>
        : <Spinner/>}
</section>
    )
};

const mapStateToProps = (state) => ({
    product: state.app.product
});
  
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

