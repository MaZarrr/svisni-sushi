import React, { useEffect } from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import { defFilters } from "../reducers/filters";
import {productList} from "../reducers/selectors";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner count={10}/>
});

const categoryNames = ['с крабом', 'с лососем', 'с угрем', 'с креветкой', 'с мидиями', 'с курицей', 'веган'];


const HotRolls = ({ data: {allContentfulProductHotRolly: {edges: productsHotRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter }) => {

    useEffect(() => {
        dispatch(productLoaded(productsHotRolls)); 
        // setTimeout(() => {
        //     setLoad(false)
        // }, 700);
        dispatch(defFilters())
    }, [productsHotRolls, dispatch]);

    const visibleItems = filtersProducts(product, searchText, priceFilter);

return (
   <section>
    <SEO title="Заказать запечённые роллы с доставкой на дом в Валуйки"
          description="Доставка запеченых и горячих роллов в Валуйки с 10 до 22:00 - оцени вкус японской кухни от Свисни Суши"
          pathname="/sety/"/>

        <HeadSection titleTXT={"Горячие роллы"} isFilter={true} categoryNames={categoryNames}/>
        {/*{load === false ? <>*/}
           <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
               <CardsMenuPage titleCategory="Горячие роллы" slugCategogy="/hot-rolls" visibleItems={visibleItems}
                              image={image} product={product}/>
           </Grid>
   {/*</> : <Spinner count={10}/>*/}
       }
  </section>
    )
};

const mapStateToProps = (state) => ({
    product: productList(state),
    searchText: state.filters.searchText,
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
                    gatsbyImageData(placeholder: BLURRED formats: [WEBP, AUTO])
                  }
              }
            }
          }
        contentfulIconMenuLeftPanel(name: {eq: "Горячие роллы"}) {
              image {
                    gatsbyImageData(placeholder: BLURRED)
                  }
            }
        }
    `