import {createReducer, createAction} from "redux-act";

const productLoaded = createAction('PRODUCT_LOADED')
const productPizzaLoaded = createAction('PRODUCT_LOADED_PIZZA')
const _setLoading = createAction(`SET_LOADING`)

export function setLoading(isLoading) {
    const action = _setLoading(isLoading)
    return action
}

export const getProduct = (product) => async (dispatch) => {
    // dispatch(_setLoading(true))
    // console.log(await dispatch(productLoaded(product)))
    await dispatch(productLoaded(product))
}

export const getProductPizza = (productPizza) => disbatch => {
    disbatch(productPizzaLoaded(productPizza))
}

const initialState = {
    product: [],
    productPizza: [],
    loading: false,
    error: false
}

export default createReducer({
    [productLoaded]: (state, product) => ({...state, product}),
    [productPizzaLoaded]: (state, productPizza) => ({...state, productPizza}),
    [setLoading]: (state, loading) => ({...state, loading})
}, initialState)




// export const productGet = () => (dispatch, getState) => {
//     const state = getState()
//  dispatch(getProduct())
//   graphql(querySets`
// {
//                 allContentfulProductPizza  {
//                 edges {
//                         node {
//                                 id
//                                 slug
//                                 name
//                                 price
//                                 priceIn33cm
//                                 description
//                                 image {
//                                         fluid(maxWidth: 300, maxHeight: 300, quality: 30) {
//                                                 ...GatsbyContentfulFluid
//                                         }
//                                 }
//                         }
//                 }
//                 }
//                 contentfulIconMenuLeftPanel(name: {eq: "Пицца"}) {
//                         image {
//                                 fluid(maxWidth: 35) {
//                                         ...GatsbyContentfulFluid
//                                 }
//                         }
//                 }
//         }
//         `)
//     // console.log(res)
// }
