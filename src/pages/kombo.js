import React, {useEffect} from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@mui/material";
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(()=> import('../components/CardsMenuPage'))

const Kombo = ({ data: { allContentfulProductKombo: {edges: productsKombo}, contentfulIconMenuLeftPanel: { image }},
    dispatch, product }) => {

    useEffect(() => {
        dispatch(productLoaded(productsKombo))
    }, [productsKombo, dispatch]);

return (
    <section>
    <Seo title="Доставка комбо наборов из суши, роллов и пиццы в Валуйки"
    description="Заказать специальные комбо наборы, собирай свои блюда из суши и пиццы выгодно. Работаем с 10 до 22:00"/>
      <HeadSection titleTXT={"Комбо наборы"}/>
            <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
                <CardsMenuPage titleCategory="Комбо" slugCategogy="/kombo" visibleItems={product}
                               image={image} product={product}/>
            </Grid>
</section>
    )
};

const mapStateToProps = (state) => ({
    product: state.app.product
});
  
export default connect(mapStateToProps, null)(Kombo)

export const query = graphql `
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
                 gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                  }
              }
            }
          }
           contentfulIconMenuLeftPanel(name: {eq: "Комбо"}) {
             image {
                    gatsbyImageData
                  }
          }
        }
    `

