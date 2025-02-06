import { Grid, Box } from "@mui/material";
import React, { useEffect, useMemo, useCallback} from "react";
import { connect } from "react-redux";
import MenuList from "../../components/MenuList";
import HeadSection from "../../components/HeadSection"
import Seo from "../../components/seo"
import { productList } from "../../reducers/selectors"
import { productLoaded, productPizzaLoaded } from "../../reducers/app"
import { checkSaleLanch, defFilters } from "../../reducers/filters";
import filtersProducts from "../../utils/filtersProducts"
import { loadSwitchPizzas, pizzaCart } from "../../reducers/shopping-cart";
import Spinner from "../../components/spinner/spinner";
import LayoutLontainer from "../layout-container";
// import useTimer from "../../utils/useTimer"
// const categoryNames = ['Малые', 'Средние', 'Большие', '⏱️Ланч-тайм'];

const ProductList = ({ pageData: { contentfulPages: pageData, allContentfulProducts: { edges } }, context,
    product, searchText, priceFilter, checkboxFilter, dispatch, location: { pathname }  }) => {
    // const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();
    // const [load, setLoad] = React.useState(true);
    // const [defaultProducts, setDefaultProducts] = React.useState([]);

    const transformData = useMemo(() => edges.map(({ node }) => {
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
    }), [edges])
    
    const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, searchText, priceFilter, checkboxFilter]);
    const switchSizePizza = useCallback((data) => {
        dispatch(pizzaCart(data))
    });
    // const priceIsSale = useMemo(() => isSale, [isSale]);
    // const isPizzas = transformData.some((node) => node.isPizza === true);
    // const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, checkboxFilter, priceFilter, searchText]);

    const bindActions = ({ transformData }) => {
        const checkedPizza = transformData.some(({node: {isPizza}}) => isPizza === true)
        if(checkedPizza) {
            dispatch(productPizzaLoaded(transformData))
            dispatch(loadSwitchPizzas(transformData))
        } else {
            dispatch(productLoaded(transformData))
        }
    }
    
    const categoryList = useCallback(() => {
        let categories = pageData.fieldCaterories;
        const arrayList = categories !== null ?
        categories.split(", ") : [];
        return arrayList
    }, [pageData]);

    useEffect(() => {
        bindActions({ transformData })
        // doStart({endTime: 15, startTime: 10, startDayNumber: 1, firstDayNumber: 5});
        // dispatch(checkSaleLanch(priceIsSale));
        dispatch(defFilters());
        // setLoad(false)
    }, [dispatch]);

    return (
        <>
        <Seo title={pageData.fieldSeoTitle} 
            description={pageData.fieldSeoDescrittion}
            pathname={pathname}
        />
        <LayoutLontainer>
        <Box sx={(theme) => ({
            // margin: '0 30px 0 0',
            // [theme.breakpoints.down('sm')]: {
            //     margin: '0 15px'
            // }
        })}>
        <HeadSection titleTXT={pageData.fieldTitle} path={pageData.fieldSlug} isFilter={true} 
        categoryNames={categoryList()} 
        />
        <Grid maxWidth={'xl'} sx={(theme) => ({
                display: 'grid',
                margin: '0 auto',
                gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
                gap: 4,
                [theme.breakpoints.down('sm')]: {
                    gridTemplateColumns: '100%',
                    gap: 1
                }
        })} 
        
        itemScope itemType="http://schema.org/ItemList">
            { visibleItems && visibleItems.length > 0 ? <>
            <MenuList titleCategory="" 
                    slugCategogy={`/${pageData.fieldSlug}`} 
                    visibleItems={visibleItems}
                    product={product} 
                    style={{ margin: '0 100px' }}
                    // timePrice={{ hours, minutes, seconds }}
                    // isSale={priceIsSale} 
                    switchSizePizza={switchSizePizza} 
                    imageTypeCategory={pageData.image}/>
                    
        </>
            :   <Spinner count={4} /> }
        </Grid>
        </Box>
        </LayoutLontainer>
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