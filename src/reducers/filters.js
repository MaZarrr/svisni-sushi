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









// case 'SEARCH_PRODUCT':
// //  state.setList.product[id]
// // const getProductById = (state, id) => R.prop(id, state.setList.product)
// // const applySearch = item => R.contains(action.payload, R.prop('name', item))
// // const products = R.compose(
// // R.filter(applySearch),
// // R.map((node) => node)
// // )(state.setList.product)
//
// return R.merge(state.setList, {
//     searchText: action.payload
// })
//
