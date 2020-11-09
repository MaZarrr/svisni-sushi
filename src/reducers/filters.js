import {createReducer, createAction} from "redux-act";

export const searchTextFilter = createAction('SEARCH_PRODUCT');
export const priceFilterDecInc = createAction('PRICE_FILTER_PRODUCT');
export const checkFilterNabor = createAction('FILTER_PRODUCT_CHECKBOX');
export const defFilters = createAction('FILTER_DEF_VALUE');
export const sortBy = createAction('SET_SORT_BY');
export const setCategory = createAction('SET_CATEGORY');
export const checkSaleLanch = createAction('CHECK_SALE_LANCH');


export const getSearchText = (text) => (dispatch) => dispatch(searchTextFilter(text));
export const getPriceDecInc = (value) => (dispatch) => dispatch(priceFilterDecInc(value));
export const getCheckNabor = (val) => (dispatch) => dispatch(checkFilterNabor(val));
// export const setCategoryProduct = (text) => (dispatch) => dispatch(setCategory(text));

const initialState = {
    searchText: '',
    priceFilter: "def",
    checkboxFilter: "def",
    category: null,
    isSale: false,
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
    [setCategory]: (state, catIndex) => ({...state, category: catIndex, cat: true}),
    [defFilters]: (state) => ({
        ...state,
        searchText: '',
        priceFilter: "def",
        checkboxFilter: "def"
    }),
    [checkSaleLanch]: (state, isSale) => {
        if(isSale) {
            return {...state, isSale}
        }

        return {...state, isSale}
    }
}, initialState)


