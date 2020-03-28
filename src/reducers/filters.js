import {createReducer, createAction} from "redux-act";

export const searchTextFilter = createAction('SEARCH_PRODUCT')
export const priceFilterDecInc = createAction('PRICE_FILTER_PRODUCT')
export const checkFilterNabor = createAction('FILTER_PRODUCT_CHECKBOX')

export const getSearchText = (text) => (dispatch) => dispatch(searchTextFilter(text))
export const getPriceDecInc = (value) => (dispatch) => dispatch(priceFilterDecInc(value))
export const getCheckNabor = (val) => (dispatch) => dispatch(checkFilterNabor(val))

const initialState = {
    searchText: '',
    priceFilter: "def",
    checkboxFilter: "def"
}

export default createReducer({
    [searchTextFilter]: (state, searchText) => ({...state, searchText}),
    [priceFilterDecInc]: (state, priceFilter) => ({...state, priceFilter}),
    [checkFilterNabor]: (state, checkboxFilter) => ({...state, checkboxFilter}),
}, initialState)


