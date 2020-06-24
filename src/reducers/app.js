import {createReducer, createAction} from "redux-act";

export const productLoaded = createAction('PRODUCT_LOADED')
export const productPizzaLoaded = createAction('PRODUCT_LOADED_PIZZA')
const _setLoading = createAction(`SET_LOADING`)

export const setLoading = (isLoading) => {
    const action = _setLoading(isLoading)
    return action
}

export const getProduct = (product) => async (dispatch) => {
    await dispatch(productLoaded(product))
}

const initialState = {
    // product: {
    //     sety: [],
    //     pizza: []
    // },
    product: [],
    productPizza: [],
    loading: false,
    error: false
}

export default createReducer({
    [productLoaded]: (state, productCategory) => {
        const product = productCategory.map(({node: el}) => el)
        return {...state, product}
    },
    [productPizzaLoaded]: (state, productCategory) => {
        const productPizza = productCategory.map(({node: el}) => el)
        return {...state, productPizza}
    },
    [_setLoading]: (state, loading) => {
        return {...state, loading}
    }
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
