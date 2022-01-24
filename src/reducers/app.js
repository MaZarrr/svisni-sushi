import {createReducer, createAction} from "redux-act";

export const productLoaded = createAction('PRODUCT_LOADED');
export const productPizzaLoaded = createAction('PRODUCT_LOADED_PIZZA');
export const spinnerLoading = createAction('PRODUCT_SPINNER');
const productLoadedIndex = createAction('PRODUCT_LOADED_INDEX');
export const getUserAction = createAction('GET_USER');

export const loadIndexItems = (data) => (dispatch) => dispatch(productLoadedIndex(data));
// export const loadingSpinner = (status) => (dispatch) => dispatch(spinnerLoad(status));
export const getProduct = (product) => async (dispatch) => {
    await dispatch(productLoaded(product))
};
export const setUser = (user) => (dispatch) => {
    console.log("user setUser", user);
    dispatch(getUserAction(user))
};

const initialState = {
    product: [],
    productPizza: [],
    indexProduct: [],
    indexMenu: [],
    loading: true,
    error: false,
    user: null,
    isAuth: false
};

export default createReducer({
    [getUserAction]: (state, user) => {
        console.log("statestate getUser", {
            ...state,
            user,
            isAuth: user?.id ? true : false
        });
        return {
            ...state,
            user,
            isAuth: user ? true : false
        }
    },
    [productLoaded]: (state, productCategory) => {
        const product = productCategory.map(({node: el}) => el)
        return {...state, product}
    },
    [productLoadedIndex]: (state, {edges, menu}) => {
        return {...state, indexProduct: edges, indexMenu: menu}
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
                    }]}});
        return {...state, productPizza}
    },
    [spinnerLoading]: (state, status) => {
        return {...state, loading: status}
    }

}, initialState)
