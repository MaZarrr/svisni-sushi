import React, { useEffect, useMemo } from "react"
import Seo from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@mui/material";
import filtersProducts from '../utils/filtersProducts'
import { productLoaded,
  // spinnerLoading
} from "../reducers/app";
import { productList,
  // checkedLoading
} from "../reducers/selectors";
import { defFilters, checkSaleLanch } from "../reducers/filters";
import useTimer from "../utils/useTimer";
import HeadSection from "../components/HeadSection"
import CardsMenuPage from '../components/CardsMenuPage'
import SpinnerNew from "../components/spinner/spinner-new";

const categoryNames = ['Малые', 'Средние', 'Большие', 'Ланч-сеты'];

const Sety = ( { data: { allContentfulProduct: { edges: setyProduct }, contentfulIconMenuLeftPanel: { image } },
                  product, searchText, priceFilter, checkboxFilter, location, dispatch }) => {
    const [load, setLoad] = React.useState(true);
    const [{ hours, seconds, minutes, isSale }, doStart] = useTimer();
    const visibleItems = useMemo(() => filtersProducts(product, searchText, priceFilter, checkboxFilter), [product, checkboxFilter, priceFilter, searchText]);
    const priceIsSale = useMemo(() => isSale, [isSale]);

    useEffect(() => {
        dispatch(productLoaded(setyProduct));
        doStart({endTime: 15, startTime: 10});
        dispatch(checkSaleLanch(priceIsSale));
        dispatch(defFilters());
        setLoad(false)
        // dispatch(spinnerLoading(false))
    }, [setyProduct, dispatch, doStart, priceIsSale]);
    return (
        <>
            <Seo title="Сет суши роллов, ассорти на заказ - доставка в Валуйки"
                 description="Меню сетов из фирменных и запечённых роллов с выгодой до 40%. Акция ланч-тайм, скидки с 10 до 15:00, собери свой набор роллов"
                 pathname="/"/>
                    <HeadSection titleTXT={"Заказать суши сет"} path={location.pathname} isFilter={true} categoryNames={categoryNames}/>
                    <Grid container justifyContent="center" itemScope itemType="http://schema.org/ItemList">
                      {!load ?
                        <CardsMenuPage titleCategory="Набор" slugCategogy="/sety" visibleItems={visibleItems}
                                       image={image} product={product} timePrice={{ hours, minutes, seconds }}
                                       isSale={priceIsSale} />
                        :  <SpinnerNew />   }
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
                    variant
                    sale
                    defaultPrice
                    count
                    description
                    komboSale
                    image {
                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
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

