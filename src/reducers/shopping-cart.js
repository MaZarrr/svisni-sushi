import * as R from 'ramda'


  const updateCartItems = (cartItems, item, idx) => { 
  // обновлуние уже существующего элемсента в корзине
      if(item.count === 0) {
          return [ // удаление элемента из массива
              ...cartItems.slice(0, idx), // все элементы до нужного 
              ...cartItems.slice(idx + 1), // все элементы после нужного
          ]
      }
  
      if(idx === -1) { // добавление элеиента к концу массива
          return R.append(item, cartItems)
      } 
    
      return R.update(idx, item, cartItems)
  }
  
  const updateCartItem = (setу, item = {}, quantity, priceRadio = setу.node.price) => { // добавление в корзину 
   //
      const { id = setу.node.id, count = 0, name = setу.node.name, total = 0, 
          image = setу.node.image.fluid, price33 = setу.node.priceIn33cm, pribor = 0,
      } = item
      
          return {
              id,
              name,
              price33,
              pribor, 
              priceDef: setу.node.price,
              radioPrice: setу.node.price,
              radioValue: priceRadio,
              image: {...image},
              count: count + quantity,
              total: priceRadio > setу.node.price ? total + quantity * price33 : total + quantity * setу.node.price  
          }
  } 

  const updateOder = (state, setId, quantity, priceRadioPizza, categoryName) => {
  
      const {setList: {product, productPizza}, shoppingCart: { cartItems } } = state

      const sety = categoryName.find(({node: productCategory}) => productCategory.id === setId);
      const itemIndex = cartItems.findIndex(({id}) => id === setId);
      const item = cartItems[itemIndex];

    //   const selects = {
    //     local: false,
    //     dispathes: 'Redux'
    // }

      // const defaultOptions = { local: true, value: 42 }
      const totalPrice = R.compose(
        R.sum,
        R.pluck('total')
      )(cartItems)

    const newItem = updateCartItem(sety, item, quantity, priceRadioPizza);
    return {
        orderTotal: priceRadioPizza > sety.node.price ? totalPrice + priceRadioPizza * quantity : totalPrice + sety.node.price * quantity ,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };

  }

  const updateShoppingCart = (state, action) => {
    
      if(state === undefined) {
          return {
              cartItems: [],
              orderTotal: 0,
              palochkiTotal: 0 
          };
      }
  
      switch (action.type) {
       
          case  'SET_ADDED_TO_CART':
            console.log(action.payload.categotyName);
            
            return updateOder(state, action.payload.id, 1, action.payload.radioValue, action.payload.categotyName)
        
             case 'SET_REMOVE_FROM_CART':
              return updateOder(state, action.payload.id, -1, action.payload.radioValue)
  
              case 'ALL_SET_REMOVE_FROM_CART':
                  const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload.id)
                  return updateOder(state, action.payload.id, -item.count, action.payload.radioValue)

                case 'PRODUCT_RAZMER':

                  const {setList: {product}, shoppingCart: { cartItems } } = state

                  const pizza = product.find(({node: pizzaId}) => pizzaId.id === action.payload.id);
                  const itemIndexPizza = cartItems.findIndex(({id}) => id === action.payload.id)
                  const itemPizza = cartItems[itemIndexPizza]

                const updateItemPizza = R.update(itemIndexPizza, {
                    id: action.payload.id,
                    name: pizza.node.name,
                    priceDef: pizza.node.price,
                    price33: pizza.node.priceIn33cm,
                    radioValue: parseInt(action.payload.value) * 1,
                    image: {...pizza.node.image.fluid},
                    count: itemPizza.count,
                    total: itemPizza.count * parseInt(action.payload.value)
                })(cartItems)

                const totalPrice = R.compose(
                  R.sum,
                  R.pluck('total')
                )(updateItemPizza)

                return {
                  orderTotal: totalPrice * 1,
                  cartItems: updateItemPizza
                }

          default:
              return state.shoppingCart;
      }   
  }

  export default updateShoppingCart
