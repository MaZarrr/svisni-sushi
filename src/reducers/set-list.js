const updateSetList = (state, action) => {
  
    if(state === undefined) {
        return  {
            product: [],
            loading: true,
            error: null
        };
    }

    switch (action.type) {
        case 'PRODUCT_REQUESTED':
            return {
                product: [],
                loading: true,
                error: null
            };

        case  'PRODUCT_LOADED':
        return {
            product: action.payload,
            loading: false,
            error: null
        };
        case 'PRODUCT_LOADED_PIZZA':
            return {
                productPizza: action.payload,
                loading: false,
                error: null
            };

        case  'PRODUCT_ERROR':
            return {
                product: [],
                loading: false,
                error: action.payload
            };
      
        default:
            return state.setList;
        }        
}

export default updateSetList

