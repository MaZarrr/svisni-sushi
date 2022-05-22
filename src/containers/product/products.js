import { Grid } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import MenuList from "../../components/MenuList";
import HeadSection from "../../components/HeadSection"
import Seo from "../../components/seo"
import useTimer from "../../utils/useTimer"
import { productList } from "../../reducers/selectors"
import { productLoaded, productPizzaLoaded } from "../../reducers/app"
import { checkSaleLanch, defFilters } from "../../reducers/filters";
import filtersProducts from "../../utils/filtersProducts"
import { pizzaCart } from "../../reducers/shopping-cart";
// import SpinnerNew from "../../components/spinner/spinner-new";

// const categoryNames = ['Малые', 'Средние', 'Большие', '⏱️Ланч-тайм'];

const ProductList = ({ pageData: { nodeStranicy: pageData, allNodeBlyudaMenyu: { edges } }, context,
    product, searchText, priceFilter, checkboxFilter, location, dispatch  }) => {
    const [load, setLoad] = React.useState(true);
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();
    // const [defaultProducts, setDefaultProducts] = React.useState([]);
    const transformData = edges.map(({ node }) => {
        return {
            node: {
                id: node.id,
                name: node.field_name,
                price: node.field_price_product,
                slug: node.field_slug_item,
                isWok: node.field_is_wok,
                isPizza: node.field_is_pizza,
                weightPizzaSmall: node.field_weight_small, 
                weightPizzaLarge: node.field_weight_large, 
                pricePizzaLarge: node.field_price_large, 
                variant: node.field_variant,
                drupal_id: node.drupal_id,
                weight: node.field_weight,
                count: node.field_count,
                description: node.field_description_product,
                wok: node.field_is_wok,
                nonprice: node.field_price_not_sale,
                lanchprice: node.field_price_lanch_time, 
                lanch: node.field_is_lanchtime,
                image: node.relationships.field_image_product.localFile.childImageSharp,
                private: node.field_private,
            }
        }
    })
    
    const visibleItems = filtersProducts(product, searchText, priceFilter, checkboxFilter);
    const priceIsSale = useMemo(() => isSale, [isSale]);
    const switchSizePizza = data => dispatch(pizzaCart(data));
    // const isPizzas = transformData.some((node) => node.isPizza === true);
    // const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, checkboxFilter, priceFilter, searchText]);

    const bindActions = ({transformData}) => {
        const checkedPizza = transformData.some(({node: {isPizza}}) => isPizza === true)
        if(checkedPizza) {
            dispatch(productPizzaLoaded(transformData))
        } else {
            dispatch(productLoaded(transformData))
        }
    }

    // const categoryList = () => {
    //     console.log("pageData.field_caterories", pageData.field_caterories);
    //     const arrayList = pageData.field_caterories !== null ?
    //     pageData.field_caterories.split(", ") : [];
    //     console.log("pageData.field_caterories arrayList", arrayList);
    //     return arrayList
    // }

useEffect(() => {
    bindActions({transformData})
    // doStart({endTime: 15, startTime: 10, startDayNumber: 1, firstDayNumber: 5});
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
        // categoryNames={categoryList()} 
        /> 
        <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
            { visibleItems && visibleItems.length > 0 ? <>
            <MenuList titleCategory="" 
                    slugCategogy={`/${pageData.field_slug}`} visibleItems={visibleItems}
                    product={product} 
                    timePrice={{ hours, minutes, seconds }}
                    isSale={priceIsSale} 
                    switchSizePizza={switchSizePizza} />
                    {/* image={pageData.relationships.field_avatar.localFile.childImageSharp} */}
        </>
            :   <h4 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Нечего не найдено... <span role="img" aria-label="accessible-emoji">🧐</span></h4> }
        </Grid>
        </>
    )
};


const mapStateToProps = (state, edges) => ({
    product: productList(state, edges),
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter,
    checkboxFilter: state.filters.checkboxFilter
    // loading: checkedLoading(state),
  });

  export default connect(mapStateToProps, null)(ProductList)