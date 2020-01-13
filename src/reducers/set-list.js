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


//   import * as R from 'ramda'

//   const updateCartItems = (cartItems, item, idx) => { // обновлуние уже существующего элемсента в корзине
  
//     if(item.count === 0) {
//         return [ // удаление элемента из массива
//             ...cartItems.slice(0, idx), // все элементы до нужного 
//             ...cartItems.slice(idx + 1), // все элементы после нужного
//         ]
//     }

//     if(idx === -1) { // добавление элеиента к концу массива
//         R.append(item, cartItems)
//     } 
  
//     console.log(cartItems)
//     return [   // обновление текущего массива и замена элемента новым 
//         ...cartItems.slice(0, idx),
//         item,
//         ...cartItems.slice(idx + 1),
//     ]
// }

// const updateCartItem = (set, item = {}, quantity) => { // добавление в корзину 

//     const { id = set.node.id, count = 0, name = set.node.name, total = 0, 
//         image = set.node.image.fluid
//     } = item

//     console.log(set)
//         return {
//             id,
//             name,
//             image: {...image},
//             count: count + quantity,
//             total: total + quantity * set.node.price
//         }
// } 

// const updateOder = (state, setId, quantity) => {

//     const {setList: { product }, shoppingCart: { cartItems } } = state
    
//     const products = product.find(({node: productCategory}) => productCategory.id === setId);
//     const itemIndex = cartItems.findIndex(({id}) => id === setId);
//     const item = cartItems[itemIndex];

//     const totalPrice = R.compose(
//       R.sum,
//       R.pluck('total')
//     )(cartItems)

//   const newItem = updateCartItem(products, item, quantity);
//   return {
//       orderTotal: totalPrice + products.node.price * quantity,
//       cartItems: updateCartItems(cartItems, newItem, itemIndex)
//   };
// }

// // const updateOrderAllProductFunc = (productId, productCategory, cartItems, quantity) => {

// // }
// const updateShoppingCart = (state, action) => { // добавляет и обновляет корзину товаров

//     if(state === undefined) {
//         return {
//             cartItems: [],
//             orderTotal: 0
//         };
//     }

//     switch (action.type) {
//         case  'SET_ADDED_TO_CART':
//             return updateOder(state, action.payload, 1)
            
//            case 'SET_REMOVE_FROM_CART':
//             return updateOder(state, action.payload, -1)

//             case 'ALL_SET_REMOVE_FROM_CART':
//                 const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload)
//                 return updateOder(state, action.payload, -item.count)
//         default:
//             return state.shoppingCart;
//     }   
// }

// export default updateShoppingCart