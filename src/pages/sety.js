import React, {useCallback, useEffect} from "react"
import SEO from "../components/seo"
import { graphql} from "gatsby";
import { connect } from 'react-redux';

import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import filtersProducts from '../utils/filtersProducts'
import loadable from '@loadable/component'
import { useStyleH1 } from "../components/common/style";
import { productLoaded } from "../reducers/app";
import {defFilters, setCategory} from "../reducers/filters";
import Categories from "../components/Categories";
import {productList} from "../reducers/selectors";

const CustomizedInputSearch = loadable(() => import('../components/CustomizedInputSearch'));
const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
    fallback: <Spinner/>
});

const categoryNames = ['Малые', 'Средние', 'Большие'];

const Sety = ({data: {allContentfulProduct: {edges: setyProduct}, contentfulIconMenuLeftPanel: {image}},
                  product, searchText, priceFilter, checkboxFilter, location, dispatch, category}) => {

    const [load, setLoad] = React.useState(true);
    const { title } = useStyleH1();

    useEffect(() => {
        // dispatch(setLoading(true))
        dispatch(productLoaded(setyProduct));
        // dispatch(setLoading(false))
        dispatch(defFilters());
        setLoad(false)
    }, [setyProduct, dispatch]);

    const visibleItems = filtersProducts(product, searchText, priceFilter, checkboxFilter);
    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index));
    },[dispatch]);

    return (
        <>
            <SEO title="Заказать Cуши сет. Меню суши, роллы — доставка в Валуйки"
                 description="Сеты в Уразово в ассортименте — широкий выбор, приятные цены. Закажи доставку роллов — в суши баре Свисни Суши"/>
            <section>
                <h1 className={title}>Заказать суши сет на дом</h1>
                { load === false ?
                <div>
                    <CustomizedInputSearch location={location.pathname}/>
                    <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/>
                    <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                        <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
                                       image={image} product={product}/>
                    </Grid>
                </div>
                : <Spinner/>}
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
        allContentfulProduct {
            edges {
                node {
                    id
                    slug
                    name
                    price
                    weight
                    filter
                    count
                    description
                    komboSale
                    sale
                    image {
                        fluid(maxWidth: 400, quality: 100) {
                            ...GatsbyContentfulFluid_withWebp
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