import React, { useEffect } from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { productLoaded, spinnerLoading } from "../reducers/app";
import { checkedLoading, productList } from "../reducers/selectors";
import { defFilters } from "../reducers/filters";
import HeadSection from "../components/HeadSection"
import filtersProducts from '../utils/filtersProducts'
import CardsMenuPage from '../components/CardsMenuPage'
import SpinnerNew from "../components/spinner/spinner-new";

const categoryNames = ['с крабом', 'с лососем', 'с окунем', 'с угрем', 'с креветкой', 'с мидиями', 'с курицей', 'веган'];

const HotRolls = ({ data: {allContentfulProductHotRolly: {edges: productsHotRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter, loading }) => {
    useEffect(() => {
        dispatch(productLoaded(productsHotRolls));
        dispatch(defFilters())
        dispatch(spinnerLoading(false))
    }, [productsHotRolls, dispatch]);

    const visibleItems = filtersProducts(product, searchText, priceFilter);

return (
   <section>
    <Seo title="Заказать запечённые роллы с доставкой на дом в Валуйки"
          description="Запечённые и жаренные роллы, доставка в Валуйки с 10 до 22:00 - оцени вкус японской кухни от Свисни Суши"
          pathname="/sety/"/>

        <HeadSection titleTXT={"Горячие роллы"} isFilter={true} categoryNames={categoryNames}/>
     {!loading ?
           <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
               <CardsMenuPage titleCategory="Горячие роллы" slugCategogy="/hot-rolls" visibleItems={visibleItems}
                              image={image} product={product}/>
           </Grid>
        : <SpinnerNew />}
  </section>
    )
};

const mapStateToProps = (state) => ({
    product: productList(state),
    searchText: state.filters.searchText,
    loading: checkedLoading(state),
    priceFilter: state.filters.priceFilter
});
  
export default connect(mapStateToProps, null)(HotRolls)

export const query = graphql `
    {
       allContentfulProductHotRolly(sort: {fields: desc}) {
          edges {
            node {
                id
                slug
                name
                desc
                price
                description
                weight
                variant
                filter
                count
                 image {
                    gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
                  }
              }
            }
          }
        contentfulIconMenuLeftPanel(name: {eq: "Горячие роллы"}) {
              image {
                   gatsbyImageData
                  }
            }
        }
    `