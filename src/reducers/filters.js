import {createReducer, createAction} from "redux-act";

export const searchTextFilter = createAction('SEARCH_PRODUCT');
export const priceFilterDecInc = createAction('PRICE_FILTER_PRODUCT');
export const checkFilterNabor = createAction('FILTER_PRODUCT_CHECKBOX');
export const defFilters = createAction('FILTER_DEF_VALUE');

export const getSearchText = (text) => (dispatch) => dispatch(searchTextFilter(text));
export const getPriceDecInc = (value) => (dispatch) => dispatch(priceFilterDecInc(value));
export const getCheckNabor = (val) => (dispatch) => dispatch(checkFilterNabor(val));

export const sortBy = createAction('SET_SORT_BY');
export const setCategory = createAction('SET_CATEGORY');

// export const sortByCategory = ({ type, order }) => (dispatch) => dispatch(sortBy({ type, order }));
// export const setCategoryName = (catIndex) => (dispatch) => dispatch(setCategory(cartIndex));
//
const initialState = {
    searchText: '',
    priceFilter: "def",
    checkboxFilter: "def",
    category: null,
    sortBy: {
        type: 'popular',
        order: 'desc',
    },
};

export default createReducer({
    [searchTextFilter]: (state, searchText) => ({...state, searchText}),
    [priceFilterDecInc]: (state, priceFilter) => ({...state, priceFilter}),
    [checkFilterNabor]: (state, checkboxFilter) => ({...state, checkboxFilter}),
    [sortBy]: (state, { type, order }) => ({...state, sortBy: {type, order}}),
    [setCategory]: (state, catIndex) => ({...state, category: catIndex}),
    [defFilters]: () => ({
        searchText: '',
        priceFilter: "def",
        checkboxFilter: "def"
    })
}, initialState)


