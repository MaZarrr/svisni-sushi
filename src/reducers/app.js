import {createReducer, createAction} from "redux-act";

export const productLoaded = createAction('PRODUCT_LOADED');
export const productPizzaLoaded = createAction('PRODUCT_LOADED_PIZZA');
export const spinnerLoading = createAction('PRODUCT_SPINNER');
const productLoadedIndex = createAction('PRODUCT_LOADED_INDEX');

export const loadIndexItems = (data) => (dispatch) => dispatch(productLoadedIndex(data));
export const loadingSpinner = (status) => (dispatch) => dispatch(spinnerLoading(status));
export const getProduct = (product) => async (dispatch) => {
    await dispatch(productLoaded(product))
};

const initialState = {
    indexProduct: {
        optionPage: {},
        combo: [],
        recommendedProduct: []
    },
    product: [],
    productPizza: [],
    indexMenu: [],
    loading: false,
    error: false
};

export default createReducer({
    [productLoaded]: (state, productCategory) => {
        const product = productCategory.map(({node: el}) => el)
        return {...state, product}
    },
    [productLoadedIndex]: (state, {combo: {edges: comboList}, recomendedProduct: {edges: recomendedProductList}}) => {
        
        const recomendedProductData = recomendedProductList[0].node.recomendedProduct.map(( node ) => {
            return {
              id: node.id,
              name: node.fieldName,
              price: node.fieldPriceProduct,
              slug: node.fieldSlug,
              slugItem: node.fieldSlugItem,
              description: node.fieldDescriptionProduct,
              image: node.image
            }
        });   
        const comboData = comboList[0].node.kombo.map((node) => {
        return {
            id: node.id,
            name: node.fieldName,
            price: node.fieldPriceProduct,
            slug: node.fieldSlug,
            slugItem: node.fieldSlugItem,
            description: node.fieldDescriptionProduct,
            image: node.image,
            isEdit: node.fieldIsEditKombo,
        }
        })

      const optionIndexPage = {
        titleCombo: comboList[0].node.title,
        recomendedTitle: recomendedProductList[0].node.title
      };

        return {...state, indexProduct: { optionPage: optionIndexPage, combo: comboData, recomendedProduct: recomendedProductData }}
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
        console.log("sssss", status);
        return {...state, loading: status}
    }
}, initialState)
