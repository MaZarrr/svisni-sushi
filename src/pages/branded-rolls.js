import React, { useEffect, useMemo } from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@mui/material";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import {checkSaleLanch, defFilters } from "../reducers/filters";
import { productLoaded, spinnerLoading } from "../reducers/app";
import { productList, checkedLoading} from "../reducers/selectors";
import useTimer from "../utils/useTimer";
import HeadSection from "../components/HeadSection"
import SpinnerNew from "../components/spinner/spinner-new";

const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner count={10}/>
});
const categoryNames = ['с крабом', 'с лососем', 'с угрем', 'с креветкой', 'с беконом', 'с курицей', 'веган'];

const BrandedRolls = ({data: {allContentfulProductSlognyeRolly: {edges: productsBrandedRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter, loading }) => {
  
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();
    const priceIsSale = useMemo(() => isSale, [isSale]);
    const visibleItems = filtersProducts(product, searchText, priceFilter);

    useEffect(() => {
        dispatch(productLoaded(productsBrandedRolls));
        doStart({endTime: 15, startTime: 10});
        dispatch(checkSaleLanch(priceIsSale));
        dispatch(defFilters())
        dispatch(spinnerLoading(false))
    }, [productsBrandedRolls, dispatch, doStart, priceIsSale]);
return (
   <section>
    <Seo title="Меню сложных роллов. Заказать доставку на дом в Уразово"  
    description="Доставка фирменных роллов в Валуйках на дом от Свисни Суши. Роллы Филадельфия и Калифорния которых вы еще не пробовали!"
    pathname="/hot-rolls"/>

    <HeadSection titleTXT={"Сложные роллы"} isFilter={true} categoryNames={categoryNames}/>
     <Grid container justifyContent="center">
         {!loading ?
           <CardsMenuPage titleCategory="Сложные роллы" slugCategogy="/branded-rolls"
                                     visibleItems={visibleItems}
                                     image={image} product={product}
                                     timePrice={{hours, minutes, seconds}} isSale={priceIsSale}/> : <SpinnerNew />}

     </Grid>
  </section>
    )
};

const mapStateToProps = (state) => ({
    product: productList(state),
    loading: checkedLoading(state),
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
});
  
export default connect(mapStateToProps, null)(BrandedRolls)

export const query = graphql `
    {
     allContentfulProductSlognyeRolly {
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
          gatsbyImageData
        }
      }
    }
  }
      contentfulIconMenuLeftPanel(name: {eq: "Сложные роллы"}) {
       image {
            gatsbyImageData
    }
    }
}
    `