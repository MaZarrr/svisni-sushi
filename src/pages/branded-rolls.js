import React, {useCallback, useEffect, useMemo} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {checkSaleLanch, defFilters, setCategory} from "../reducers/filters";
import {useStyleH1} from "../components/common/style";
import Categories from "../components/Categories";
import {productList} from "../reducers/selectors";
import useTimer from "../utils/useTimer";
import CustomizedInputSearch from '../components/CustomizedInputSearch';

const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner count={10}/>
});
const categoryNames = ['с крабом', 'с лососем', 'с угрем', 'с креветкой', 'с беконом', 'с курицей', 'веган'];

const BrandedRolls = ({data: {allContentfulProductSlognyeRolly: {edges: productsBrandedRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter, category }) => {
  
  const { title } = useStyleH1();
  const [load, setLoad] = React.useState(true);
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();

    const priceIsSale = useMemo(() => isSale, [isSale]);
    const visibleItems = filtersProducts(product, searchText, priceFilter);

    const onSelectCategory = useCallback((index) => {
            dispatch(setCategory(index));
        }, [dispatch]);

    useEffect(() => {
        dispatch(productLoaded(productsBrandedRolls));
        doStart({endTime: 15, startTime: 10});
        dispatch(checkSaleLanch(priceIsSale));
        setTimeout(() => {
            setLoad(false)
        }, 700);
        dispatch(defFilters())
    }, [productsBrandedRolls, dispatch, doStart, priceIsSale]);

return ( 
   <section>
    <SEO title="Меню фирменные роллы. Доставка сложных роллов на дом в Валуйки"  
    description="Роллы которых вы еще не пробовали от 210 рублей. Закажи доставку или приходи к нам в гости!"
    pathname="/hot-rolls"/>

       <h1 className={title}>Сложные роллы</h1>
       <CustomizedInputSearch/>
       <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/>
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
    category: state.filters.category,
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
                 fluid(maxWidth: 400, maxHeight: 400, quality: 100) {
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



