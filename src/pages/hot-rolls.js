import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import '../components/sass/filterStyle.css'
import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {defFilters, sortBy, setCategory} from "../reducers/filters";
import {useStyleH1} from "../components/common/style";
import Categories from "../components/Categories";


const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'));
const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'));

const categoryNames = ['с крабом', 'с лососем', 'с угрем', 'с креветкой', 'с мидиями'];


const HotRolls = ({data: {allContentfulProductHotRolly: {edges: productsHotRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter, category, sort}) => {

    const [load, setLoad] = React.useState(true);
    const { title } = useStyleH1();

    useEffect(() => {
        dispatch(productLoaded(productsHotRolls)); // action push to reduxStore
        setLoad(false);
        dispatch(defFilters())
    }, [productsHotRolls, dispatch]);

    useEffect(() => {
        dispatch(setCategory(null));
        dispatch(sortBy({type: 'popular', order: 'desc'}))
    }, [setCategory, sortBy, dispatch]);

    const visibleItems = filtersProducts(product, searchText, priceFilter);
    //
    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);


return ( 
   <section>
    <SEO title="Заказать гриль, жареные роллы от 215 рублей. Доставка по Уразово"
        description="Доставка запеченых и горячих роллов в Валуйки с 10 до 22:00 - оцени великолепный вкус японской кухни от Свисни Суши"
        pathname="/sety"/>
       <h1 className={title}>Горячие роллы</h1>

       {load === false ? <>
                <CustomizedInputSearch/>
                <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/>


           <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
               <CardsMenuPage titleCategory="Горячие роллы" slugCategogy="/hot-rolls" visibleItems={visibleItems}
                              image={image} product={product}/>
           </Grid> </> : <Spinner/>
       }
  </section>
    )
};

const productList = (state) => {
    const category = state.filters.category;
    const product = state.app.product;

    if(category) {
        return product.filter(el => el.filter.toLowerCase() === category)
    }

    return product
};

const mapStateToProps = (state) => ({
    product: productList(state),
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter,
    category: state.filters.category,
    // sort: state.filters.sortBy
});
  
export default connect(mapStateToProps, null)(HotRolls)

export const query = graphql `
    {
       allContentfulProductHotRolly {
          edges {
            node {
                id
                slug
                name
                price
                description
                weight
                variant
                filter
                count
                image {
                  fluid(maxWidth: 400, maxHeight: 400, quality: 100) {
                      ...GatsbyContentfulFluid_withWebp
                  }
                }
              }
            }
          }
        contentfulIconMenuLeftPanel(name: {eq: "Горячие роллы"}) {
             image {
               fluid(maxWidth: 35) {
                 ...GatsbyContentfulFluid
               }
             }
            }
        }
    `