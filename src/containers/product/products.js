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
import Spinner from "../../components/spinner/spinner";

// const categoryNames = ['Малые', 'Средние', 'Большие', '⏱️Ланч-тайм'];

const ProductList = ({ pageData: { contentfulPages: pageData, allContentfulProducts: { edges } }, context,
    product, searchText, priceFilter, checkboxFilter, location, dispatch  }) => {
    const [load, setLoad] = React.useState(true);
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();
    // const [defaultProducts, setDefaultProducts] = React.useState([]);

    const transformData = edges.map(({ node }) => {
        return {
            node: {
                id: node.id,
                name: node.fieldName,
                price: node.fieldPriceProduct,
                slug: node.fieldSlugItem,
                isWok: node.fieldIsWok,
                isPizza: node.fieldIsPizza,
                drupal_id: node.contentful_id,
                weightPizzaSmall: node.fieldWeightSmall, 
                weightPizzaLarge: node.fieldWeightLarge, 
                pricePizzaLarge: node.fieldPriceLarge, 
                variantCategories: node.fariantCategories,
                variant: node.fieldVariant,
                weight: node.fieldWeight,
                count: node.fieldCount,
                description: node.fieldDescriptionProduct,
                wok: node.fieldIsWok,
                nonprice: node.fieldPriceNotSale,
                lanchprice: node.fieldPriceLanchTime, 
                lanch: node.fieldPriceLanchTime > 0 ? true : false,
                edit: node.fieldIsEditKombo,
                image: node.image,
                private: node.fieldPrivate,
            }
        }
    })
    
    const visibleItems = filtersProducts(product, searchText, priceFilter, checkboxFilter);
    const priceIsSale = useMemo(() => isSale, [isSale]);
    const switchSizePizza = data => dispatch(pizzaCart(data));
    // const isPizzas = transformData.some((node) => node.isPizza === true);
    // const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, checkboxFilter, priceFilter, searchText]);

    const bindActions = ({ transformData }) => {
        const checkedPizza = transformData.some(({node: {isPizza}}) => isPizza === true)
        if(checkedPizza) {
            dispatch(productPizzaLoaded(transformData))
        } else {
            dispatch(productLoaded(transformData))
        }
    }
    
    const categoryList = () => {
        let categories = pageData.fieldCaterories;
        const arrayList = categories !== null ?
        categories.split(", ") : [];
        return arrayList
    }

useEffect(() => {
    bindActions({ transformData })
    // doStart({endTime: 15, startTime: 10, startDayNumber: 1, firstDayNumber: 5});
    dispatch(checkSaleLanch(priceIsSale));
    dispatch(defFilters());
    setLoad(false)
}, [dispatch, doStart, priceIsSale]);

    return (
        <>
        <Seo title={pageData.fieldSeoTitle} 
            description={pageData.fieldSeoDescrittion}
            pathname="/"
        />
        <HeadSection titleTXT={pageData.fieldTitle} path={pageData.fieldSlug} isFilter={true} 
        categoryNames={categoryList()} 
        /> 
        <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
            { visibleItems && visibleItems.length > 0 ? <>
            <MenuList titleCategory="" 
                    slugCategogy={`/${pageData.fieldSlug}`} 
                    visibleItems={visibleItems}
                    product={product} 
                    timePrice={{ hours, minutes, seconds }}
                    isSale={priceIsSale} 
                    switchSizePizza={switchSizePizza} 
                    imageTypeCategory={pageData.image}/>
                    
        </>
            :   <Spinner count={4} /> }
        </Grid>
        </>
    )
};


const mapStateToProps = (state, ownProps) => ({
    product: productList(state, ownProps),
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter,
    checkboxFilter: state.filters.checkboxFilter
    // loading: checkedLoading(state),
  });

  export default connect(mapStateToProps, null)(ProductList)