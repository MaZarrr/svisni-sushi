import React, {useCallback, useEffect, useMemo} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';

import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import filtersProducts from '../utils/filtersProducts'
import loadable from '@loadable/component'
import { useStyleH1 } from "../components/common/style";
import { productLoaded } from "../reducers/app";
import {defFilters, setCategory, checkSaleLanch} from "../reducers/filters";
import Categories from "../components/Categories";
import {productList} from "../reducers/selectors";
import useTimer from "../utils/useTimer";
import CustomizedInputSearch from '../components/CustomizedInputSearch';

const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner count={10}/>
});

const categoryNames = ['Малые', 'Средние', 'Большие', 'Ланч-сеты'];

const Sety = ( {data: {allContentfulProduct: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
                  product, searchText, priceFilter, checkboxFilter, location, dispatch, category }) => {

    const [load, setLoad] = React.useState(true);
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();

    const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, checkboxFilter, priceFilter, searchText]);
    const priceIsSale = useMemo(() => isSale, [isSale]);

    const { title } = useStyleH1();

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index));
    },[dispatch]);

    useEffect(() => {

        dispatch(productLoaded(setyProduct));
        doStart({endTime: 15, startTime: 10});
        dispatch(checkSaleLanch(priceIsSale));

        setTimeout(() => {
            setLoad(false)
        }, 730);

        dispatch(defFilters());
    }, [setyProduct, dispatch, doStart, priceIsSale]);

    return (
        <>
            <SEO title="Заказать Cуши сет. Меню суши, роллы — доставка в Валуйки"
                 description="Сеты в Уразово в ассортименте — широкий выбор, приятные цены. Закажи доставку роллов — в суши баре Свисни Суши"/>
            <section>
                <h1 className={title}>Заказать суши сет</h1>
                <CustomizedInputSearch location={location.pathname}/>
                <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/>
                { load === false ? <div>
                    <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                        <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
                                       image={image} product={product} timePrice={{hours, minutes, seconds}} isSale={priceIsSale}/>
                    </Grid>
                </div>
                    : <Spinner count={10}/>}
            </section>
        </>
    )
};

const mapStateToProps = (state) => ({
    product: productList(state),
    searchText: state.filters.searchText,
    priceFilter: state.filters.priceFilter,
    checkboxFilter: state.filters.checkboxFilter,
    category: state.filters.category
});
export default connect(mapStateToProps, null)(Sety)

export const querySet = graphql `
    {
        allContentfulProduct(sort: {fields: desc}) {
            edges {
                node {
                    id
                    slug
                    name
                    desc
                    price
                    nonprice
                    weight
                    filter
                    lanchprice
                    lanch
                    sale
                    defaultPrice
                    count
                    description
                    komboSale
                    image {
                        fluid(maxWidth: 300, quality: 100) {
                            ...GatsbyContentfulFluid_noBase64
                        }
                    }
                }
            }
        }
        contentfulIconMenuLeftPanel(name: {eq: "Сеты"}) {
            image {
                fluid {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`;

