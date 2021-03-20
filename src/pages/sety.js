import React, { useEffect, useMemo } from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import filtersProducts from '../utils/filtersProducts'
import { productLoaded, spinnerLoading } from "../reducers/app";
import { productList, checkedLoading} from "../reducers/selectors";
import { defFilters, checkSaleLanch } from "../reducers/filters";
import useTimer from "../utils/useTimer";
import HeadSection from "../components/HeadSection"
import CardsMenuPage from '../components/CardsMenuPage'
import SpinnerNew from "../components/spinner/spinner-new";

// import loadable from '@loadable/component'
// import Spinner from '../components/spinner/spinner'
// const CardsMenuPage = loadable(() => import('../components/CardsMenuPage'), {
//     fallback: <Spinner count={10}/>
// });

const categoryNames = ['Малые', 'Средние', 'Большие', 'Ланч-сеты'];

const Sety = ( { data: { allContentfulProduct: { edges: setyProduct }, contentfulIconMenuLeftPanel: { image } },
                  product, searchText, priceFilter, checkboxFilter, location, dispatch, loading  }) => {
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();
    const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, checkboxFilter, priceFilter, searchText]);
    const priceIsSale = useMemo(() => isSale, [isSale]);
    useEffect(() => {
        dispatch(productLoaded(setyProduct));
        doStart({endTime: 15, startTime: 10});
        dispatch(checkSaleLanch(priceIsSale));
        dispatch(defFilters());
        dispatch(spinnerLoading(false))
    }, [setyProduct, dispatch, doStart, priceIsSale]);

    return (
        <>
            <SEO title="Заказать суши сет. Меню наборов роллов — доставка в Валуйки"
                 description="Широкий выбор сетов из запечённых роллов и суши в суши баре Свисни Суши Уразово с выгодой до 40%. Акция ланч-тайм, скидки с 10 до 15:00"/>
            <section>
                    <HeadSection titleTXT={"Заказать суши сет"} path={location.pathname} isFilter={true} categoryNames={categoryNames}/>
                    <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                      {!loading ?
                        <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
                                       image={image} product={product} timePrice={{ hours, minutes, seconds }}
                                       isSale={priceIsSale} />
                        :  <SpinnerNew />   }
                    </Grid>
            </section>
        </>
    )
};

const mapStateToProps = (state) => ({
  product: productList(state),
  loading: checkedLoading(state),
  searchText: state.filters.searchText,
  priceFilter: state.filters.priceFilter,
  checkboxFilter: state.filters.checkboxFilter
});
export default connect(mapStateToProps, null)(Sety)

export const query = graphql `
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
                    gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
                    }
                }
            }
        }
        contentfulIconMenuLeftPanel(name: {eq: "Сеты"}) {
            image {
                gatsbyImageData(
                      formats: [WEBP, AUTO]
                  )
            }
        }
    }
`;

