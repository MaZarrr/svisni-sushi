import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import Spinner from '../components/spinner/spinner'
import filtersProducts from '../utils/filtersProducts'
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {defFilters} from "../reducers/filters";
import {makeStyles} from "@material-ui/core/styles";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'))
const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'));

const useStyle = makeStyles(theme=> ({
    titleH1: {
        fontFamily: `Oswald, cursive`,
        fontWeight: 800,
        marginTop: 80,
        textTransform: `uppercase`,
        marginLeft: 35,
        fontSize: 34,
        display: `flex`,
        [theme.breakpoints.down('600')]: {
            marginTop: 45,
        },
        [theme.breakpoints.down('475')]: {
            fontSize: 26,
            marginTop: 45,
            marginBottom: 10,
            marginLeft: `10vw`
        }
    },
}));

const HotRolls = ({data: {allContentfulProductHotRolly: {edges: productsHotRolls}, contentfulIconMenuLeftPanel: {image}},
    dispatch, product, searchText, priceFilter}) => {

  const [load, setLoad] = React.useState(true);
  const classes = useStyle();

    useEffect(() => {
        dispatch(productLoaded(productsHotRolls)); // action push to reduxStore
        setLoad(false);
        dispatch(defFilters())
    }, [productsHotRolls, dispatch]);

    const visibleItems = filtersProducts(product, searchText, priceFilter);

return ( 
   <section>
    <SEO title="Заказать гриль, жареные роллы от 215 рублей. Доставка по Уразово"
        description="Доставка запеченых и горячих роллов в Валуйки с 10 до 22:00 - оцени великолепный вкус японской кухни от Свисни Суши"
        pathname="/sety"/>
       <h1 className={classes.titleH1}>Гриль роллы</h1>

       {load === false ? <>
           <CustomizedInputSearch/>
           <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
               <CardsMenuPage titleCategory="Горячие роллы" slugCategogy="/hot-rolls" visibleItems={visibleItems}
                              image={image} product={product}/>
           </Grid> </> : <Spinner/>
       }
  </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.app.product,
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter
})
  
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




