import React, { useEffect, useMemo } from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {checkSaleLanch, defFilters } from "../reducers/filters";
import {productList} from "../reducers/selectors";
import useTimer from "../utils/useTimer";
import HeadSection from "../components/HeadSection"

const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner count={10}/>
});
const categoryNames = ['с крабом', 'с лососем', 'с угрем', 'с креветкой', 'с беконом', 'с курицей', 'веган'];

const BrandedRolls = ({data: {allContentfulProductSlognyeRolly: {edges: productsBrandedRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter }) => {
  
    const [load, setLoad] = React.useState(true);
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();

    const priceIsSale = useMemo(() => isSale, [isSale]);
    const visibleItems = filtersProducts(product, searchText, priceFilter);

    useEffect(() => {
        let cleanupFunction = false;

        dispatch(productLoaded(productsBrandedRolls));
        doStart({endTime: 15, startTime: 10});
        dispatch(checkSaleLanch(priceIsSale));

      if(!cleanupFunction) {
        setTimeout(() => {
          setLoad(false)
        }, 700);
      }
        dispatch(defFilters())

      return () => cleanupFunction = true
    }, [productsBrandedRolls, dispatch, doStart, priceIsSale]);

return ( 
   <section>
    <SEO title="Меню сложных роллов. Заказать доставку на дом в Валуйки"  
    description="Пять видов роллов Филадельфия которых вы еще не пробовали. Закажи доставку или приходи к нам в гости!"
    pathname="/hot-rolls"/>

     <HeadSection titleTXT={"Сложные роллы"} isFilter={true} categoryNames={categoryNames}/>
       {load === false ?
               <Grid container justify="center">
                   <CardsMenuPage titleCategory="Сложные роллы" slugCategogy="/branded-rolls"
                                  visibleItems={visibleItems}
                                  image={image} product={product}
                                  timePrice={{hours, minutes, seconds}} isSale={priceIsSale}/>
               </Grid> : <Spinner count={10}/>
       }
  </section>
    )
};

const mapStateToProps = (state, props) => ({
    product: productList(state),
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
});
  
export default connect(mapStateToProps, null)(BrandedRolls)

export const queryBrandedRolls = graphql `
    {
        allContentfulProductSlognyeRolly(sort: {fields: desc}) {
          edges {
            node {
                id
                slug
                name
                desc
                price
                filter
                lanchprice
                defaultPrice
                lanch
                sale
                description
                weight
                count
                image {
                 fluid(maxWidth: 300, maxHeight: 300, quality: 100) {
                     ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
          contentfulIconMenuLeftPanel(name: {eq: "Сложные роллы"}) {
          image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
          }
        }
        }
    `



