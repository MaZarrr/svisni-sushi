import * as R from 'ramda'

const updateSetList = (state, action) => {
    if(state === undefined) {
        return  {
            product: [],
            productPizza: [],
            loading: true,
            error: null,
            searchText: '',
            priceFilter: "def",
        };
    }

    switch (action.type) {
        case 'PRODUCT_REQUESTED':
            return {
                product: [],
                productPizza: [],
                loading: true,
                error: null
            };

        case  'PRODUCT_LOADED':
        return {
            product: action.payload,
            productPizza: state.setList.productPizza,
            loading: false,
            error: null,
            searchText: '',
            priceFilter: "def",
        };
        case 'PRODUCT_LOADED_PIZZA':
            return {
                product: state.setList.product,
                productPizza: action.payload,
                loading: false,
                error: null,
            };

        case 'PRODUCT_ERROR':
            return {
                product: [],
                loading: false,
                error: action.payload
            };
    case 'SEARCH_PRODUCT':
                                                    //  state.setList.product[id]
        // const getProductById = (state, id) => R.prop(id, state.setList.product)
        // const applySearch = item => R.contains(action.payload, R.prop('name', item))
        // const products = R.compose(
        // R.filter(applySearch),
        // R.map((node) => node)
        // )(state.setList.product)
        
        return R.merge(state.setList, {
            searchText: action.payload
        })

        case 'PRICE_FILTER_PRODUCT':
        
            return R.merge(state.setList, {
            priceFilter: action.payload
        })
      
        default:
            return state.setList;
        }        
}

export default updateSetList

