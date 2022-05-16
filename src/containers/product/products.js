import { Grid } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import CardsMenuPage from "../../components/CardsMenuPage";
import HeadSection from "../../components/HeadSection"
import Seo from "../../components/seo"
import SpinnerNew from "../../components/spinner/spinner-new";
import useTimer from "../../utils/useTimer"
import {productList} from "../../reducers/selectors"
import {productLoaded} from "../../reducers/app"
import { checkSaleLanch, defFilters } from "../../reducers/filters";
import { graphql } from "gatsby";
import filtersProducts from "../../utils/filtersProducts"

// const categoryNames = ['Малые', 'Средние', 'Большие', '⏱️Ланч-тайм'];

const ProductList = ({ pageData: { nodeStranicy: pageData, allNodeBlyudaMenyu: { edges } }, context,
    product, searchText, priceFilter, checkboxFilter, location, dispatch  }) => {

    const [load, setLoad] = React.useState(true);
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();
    
    const transformData = edges.map(({ node }) => {
        return {
            node: {
                ...node,
                name: node.field_name,
                price: node.field_price_product,
                slug: node.field_slug,
                variant: node.field_variant,
                private: node.field_private,
                weight: node.field_weight,
                count: node.field_count,
                description: node.field_description_product,
                nonprice: node.field_price_not_sale,
                lanchprice: node.field_price_lanch_time, 
                lanch: node.field_is_lanchtime,
                image: node.relationships.field_image_product.localFile.childImageSharp
            }

        }
    }) 

    const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, checkboxFilter, priceFilter, searchText]);
    const priceIsSale = useMemo(() => isSale, [isSale]);




useEffect(() => {
    dispatch(productLoaded(transformData));
    doStart({endTime: 15, startTime: 10, startDayNumber: 1, firstDayNumber: 5});
    dispatch(checkSaleLanch(priceIsSale));
    dispatch(defFilters());
    setLoad(false)
}, [dispatch, doStart, priceIsSale]);
    return (
        <>
        <Seo title={pageData.field_seo_title} 
            description={pageData.field_seo_descrittion}
            pathname="/"
        />
        <HeadSection titleTXT={pageData.field_title} path={pageData.field_slug} isFilter={true} 
        // categoryNames={categoryNames}
        />
        <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
            { visibleItems && visibleItems.length > 0 ? <>
                <CardsMenuPage titleCategory="Набор" slugCategogy={`/${pageData.field_slug}`} visibleItems={visibleItems}
                                // image={pageData.relationships.field_avatar.localFile.childImageSharp}
                                product={product} timePrice={{ hours, minutes, seconds }}
                                isSale={priceIsSale} />
                <h3 style={{display: 'flex', flexDirection: 'column',  alignItems: 'center', justifyContent: 'center', marginBottom: '180px'}}>Обновление меню...</h3>
            </>
            :   <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Обновление меню {pageData.field_title}...!</h3> }
        </Grid>
        </>
    )
};


const mapStateToProps = (state) => ({
    product: productList(state),
    // loading: checkedLoading(state),
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter,
    checkboxFilter: state.filters.checkboxFilter
  });

  export default connect(mapStateToProps, null)(ProductList)
  
