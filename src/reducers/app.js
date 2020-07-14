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
        const productPizza = productCategory.map(({node: el}) => {
            return {
            ...el,
            sostav: [],
            ingrideents: [
            {
                id: 1,
                nameI: " зелень",
                value: 29,
                minus: -29,
                plus: 29,
                zelen : false,
                title: "zelen"
            },
            {
                id: 2,
                nameI: "лук фри",
                lyk: false,
                value: 29,
                minus: -29,
                plus: 29,
                title: "lyk"
            },
            {
                    id: 3,
                    nameI: "барбекю соус",
                    barbeky : false,
                    value: 29,
                    minus: -29,
                    plus: 29,
                    title: "barbeky"
            },
            {
                id: 4,
                nameI: "ананас",
                value: 39,
                minus: -39,
                plus: 39,
                ananas : false,
                title: "ananas",
            },
            {
                id: 5,
                nameI: "фирменный соус",
                firmsoys : false,
                value: 39,
                minus: -39,
                plus: 39,
                title: "firmsoys"
            },
            {
                id: 6,
                nameI: "болгарский перец",
                bolgarskiy : false,
                value: 39,
                minus: -39,
                plus: 39,
                title: "bolgarskiy"
            },
            {
                id: 7,
                nameI: "шампиньоны",
                shampinien : false,
                value: 39,
                minus: -39,
                plus: 39,
                title: "shampinien"
            },
            {
                id: 8,
                nameI: "помидор",
                pomidor : false,
                value: 39,
                minus: -39,
                plus: 39,
                title: "pomidor"
            },
            {
                id: 9,
                nameI: "куриное филе",
                kuricha : false,
                value: 39,
                minus: -39,
                plus: 39,
                title: "kuricha"
            },
            {
                id: 10,
                nameI: "свинина",
                svinina: false,
                value: 49,
                minus: -49,
                plus: 49,
                title: "svinina"
            },
            {
                id: 11,
                nameI: "пепперони",
                pepperoni: false,
                value: 49,
                minus: -49,
                plus: 49,
                title: "pepperoni"
            },
            {
                id: 12,
                nameI: "морепродукты",
                moreproduct : false,
                value: 49,
                minus: -49,
                plus: 49,
                title: "moreproduct"
            },
            {
                id: 13,
                nameI: "сыр Пармезан",
                parmezan: false,
                value: 49,
                minus: -49,
                plus: 49,
                title: "parmezan"
            },
            {
                id: 14,
                nameI: "сыр «Моцарелла»",
                mozarella: false,
                value: 49,
                minus: -49,
                plus: 49,
                title: "mozarella"
            },
            {
                id: 15,
                nameI: "ветчина",
                vetchina : false,
                value: 49,
                minus: -49,
                plus: 49,
                title: "vetchina"
            }]}})
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
