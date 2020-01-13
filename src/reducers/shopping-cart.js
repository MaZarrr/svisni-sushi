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
    
      console.log(cartItems)
      return R.update(idx, item, cartItems)
  }
  
  const updateCartItem = (setу, item = {}, quantity, priceRadio = setу.node.price) => { // добавление в корзину 
   
      const { id = setу.node.id, count = 0, name = setу.node.name, total = 0, 
          image = setу.node.image.fluid, price33 = setу.node.priceIn33cm, pribor = 0,
      } = item
      console.log(priceRadio)
      
          return {
              id,
              name,
              price33,
              pribor, 
              radioPrice: setу.node.price,
              radioValue: priceRadio,
              image: {...image},
              count: count + quantity,
              total: priceRadio > setу.node.price ? total + quantity * price33 : total + quantity * setу.node.price  
          }
  } 

  const updateOder = (state, setId, quantity, priceRadioPizza ) => {
  
      const {setList: {product}, shoppingCart: { cartItems } } = state

      const sety = product.find(({node: productCategory}) => productCategory.id === setId);
      const itemIndex = cartItems.findIndex(({id}) => id === setId);
      const item = cartItems[itemIndex];

      console.log('=============item==============');
      console.log(item);
      console.log('=============item===============');

      console.log('=============priceRadioPizza==============');
      console.log(priceRadioPizza);
      console.log('=============priceRadioPizza===============');

      const selects = {
        local: false,
        dispathes: 'Redux'
    }

      const defaultOptions = { local: true, value: 42 }
      console.log(R.merge(defaultOptions, selects))
      const totalPrice = R.compose(
        R.sum,
        R.pluck('total')
      )(cartItems)

      // const radio = R.defaultTo(sety.node.price, priceRadioPizza) Возвращает второй аргумент, если он не нулевой, неопределенный или NaN; в противном случае возвращается первый аргумент.
      // console.log('=============radio==============');
      // console.log(radio);
      // console.log('=============radio===============');

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
            console.log(action.payload.id)
            console.log(action.payload.radioValue)
            return updateOder(state, action.payload.id, 1, action.payload.radioValue)
        
             case 'SET_REMOVE_FROM_CART':
              return updateOder(state, action.payload.id, -1, action.payload.radioValue)
  
              case 'ALL_SET_REMOVE_FROM_CART':
                  const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload.id)
                  return updateOder(state, action.payload.id, -item.count, action.payload.radioValue)

                case 'PRODUCT_RAZMER':

                  // console.log(`============ action.payload.value(id) =============`);
                  // console.log(action.payload.id);
                  // console.log(`============ action.payload.value(id) =============`);

                  // console.log(`============ action.payload.value(28vs33) =============`);
                  // console.log(action.payload.value);
                  // console.log(`============ action.payload.value(28vs33) =============`);

                  const {setList: {product}, shoppingCart: { cartItems } } = state
                  //----------------------------------------
                  // console.log(`============ product =============`);
                  // console.log(product);
                  // console.log(`============ product =============`);
                  // console.log(`============ cartItems =============`);
                  // console.log(cartItems);
                  // console.log(`============ cartItems =============`);


                  const pizza = product.find(({node: pizzaId}) => pizzaId.id === action.payload.id);
                  // console.log(`============ pizza =============`);
                  // console.log(pizza);
                  // console.log(`============ pizza =============`); 
                  const itemIndexPizza = cartItems.findIndex(({id}) => id === action.payload.id)
                  // console.log(`== itemIndexPizza with cartItems array ==`);
                  // console.log(itemIndexPizza);
                  // console.log(`== itemIndexPizza with cartItems array ==`);
                  const itemPizza = cartItems[itemIndexPizza]
                  // console.log(`== itemPizza with cartItems array ==`);
                  // console.log(itemPizza);
                  // console.log(`== itemPizza with cartItems array ==`);

                const updateItemPizza = R.update(itemIndexPizza, {
                    id: action.payload.id,
                    name: pizza.node.name,
                    price33: pizza.node.priceIn33cm,
                    radioValue: parseInt(action.payload.value),
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






                  // const s = parseInt(action.payload.value) - parseInt(pizza.node.price) - 
                  // console.log('===============sss=====================');
                  // console.log(s);
                  // console.log('===============sss=====================');
                
   
                  // const s = parseInt(action.payload.value) * itemPizza.count -  R.compose(
                  //   R.sum,
                  //   R.pluck('total')
                  // )(cartItems)
                  // console.log('===============sss=====================');
                  // console.log(s);
                  // console.log('===============sss=====================');



 // total: R.multiply(parseInt(action.payload.value), R.prop('count')(itemPizza))


// const razni =  parseInt(action.payload.value) * itemPizza.count - totalPriceMinus
                  // console.log(razni)

                  // total: total + quantity * setу.node.price 
                  // total: total < price33 ? total + quantity * setу.node.price : total + quantity * price33
                  // orderTotal: totalPrice + sety.node.price * quantity,


                  // orderTotal:  parseInt(totalPrice) + (parseInt(action.payload.value) - parseInt(pizza.node.price)) * 1,














































//   import * as R from 'ramda'


//   const updateCartItems = (cartItems, item, idx) => { 
//   // обновлуние уже существующего элемсента в корзине
//       if(item.count === 0) {
//           return [ // удаление элемента из массива
//               ...cartItems.slice(0, idx), // все элементы до нужного 
//               ...cartItems.slice(idx + 1), // все элементы после нужного
//           ]
//       }
  
//       if(idx === -1) { // добавление элеиента к концу массива
//           return R.append(item, cartItems)
//       } 
    
//       console.log(cartItems)
//       return R.update(idx, item, cartItems)
//   }
  
//   const updateCartItem = (setу, item = {}, quantity, priceValue) => { // добавление в корзину 
   
//       const { id = setу.node.id, count = 0, name = setу.node.name, total = 0, 
//           image = setу.node.image.fluid, price33 = setу.node.priceIn33cm
//       } = item

//           return {
//               id,
//               name,
//               price33,
//               radioPrice: setу.node.price,
//               image: {...image},
//               count: count + quantity,
//               total: total + quantity * setу.node.price 
//               // total: price33 === undefined ? total + quantity * setу.node.price : total + quantity * priceValue
//           }
//   } 

//   const updateOder = (state, setId, quantity) => {
  
//       const {setList: {product}, shoppingCart: { cartItems } } = state

//       const sety = product.find(({node: productCategory}) => productCategory.id === setId);
//       const itemIndex = cartItems.findIndex(({id}) => id === setId);
//       const item = cartItems[itemIndex];

//       const totalPrice = R.compose(
//         R.sum,
//         R.pluck('total')
//       )(cartItems)

//     const newItem = updateCartItem(sety, item, quantity);
//     return {
//         orderTotal: totalPrice + sety.node.price * quantity,
//         cartItems: updateCartItems(cartItems, newItem, itemIndex)
//     };

//   }

//   const updateShoppingCart = (state, action) => {
    
//       if(state === undefined) {
//           return {
//               cartItems: [],
//               orderTotal: 0
               
//           };
//       }
  
//       switch (action.type) {
       
//           case  'SET_ADDED_TO_CART':
//             console.log(updateOder(state, action.payload, 1))
//             return updateOder(state, action.payload, 1)
        
//              case 'SET_REMOVE_FROM_CART':
//               return updateOder(state, action.payload, -1)
  
//               case 'ALL_SET_REMOVE_FROM_CART':
//                   const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload)
//                   return updateOder(state, action.payload, -item.count)

//                case 'PRODUCT_RAZMER':

//                   console.log(`============ action.payload.value(id) =============`);
//                   console.log(action.payload.id);
//                   console.log(`============ action.payload.value(id) =============`);

//                   console.log(`============ action.payload.value(28vs33) =============`);
//                   console.log(action.payload.value);
//                   console.log(`============ action.payload.value(28vs33) =============`);

//                   const {setList: {product}, shoppingCart: { cartItems } } = state
//                   //----------------------------------------
//                   console.log(`============ product =============`);
//                   console.log(product);
//                   console.log(`============ product =============`);
//                   console.log(`============ cartItems =============`);
//                   console.log(cartItems);
//                   console.log(`============ cartItems =============`);


//                   const pizza = product.find(({node: pizzaId}) => pizzaId.id === action.payload.id);
//                   console.log(`============ pizza =============`);
//                   console.log(pizza);
//                   console.log(`============ pizza =============`); 
//                   const itemIndexPizza = cartItems.findIndex(({id}) => id === action.payload.id)
//                   console.log(`== itemIndexPizza with cartItems array ==`);
//                   console.log(itemIndexPizza);
//                   console.log(`== itemIndexPizza with cartItems array ==`);
//                   const itemPizza = cartItems[itemIndexPizza]
//                   console.log(`== itemPizza with cartItems array ==`);
//                   console.log(itemPizza);
//                   console.log(`== itemPizza with cartItems array ==`);

//                   // const totalPrice = R.compose(
//                   //   R.sum,
//                   //   R.pluck('total')
                   
//                   // )(cartItems)
//                   console.log('=======totalPrice===========');
//                   console.log(totalPricePizza)
//                   console.log('=======totalPrice===========');
//                 // const newItem = updateCartItem(sety, item, quantity);
//                 // return {
//                 //     orderTotal: totalPrice + sety.node.price * quantity,
//                 // console.log(R.assocPath(['a', 'b', 'c'], 42, {a: 2, b: 3, c: 4 }))
                
//                 // const {count = 0} = itemPizza
//                 console.log('=======itemPizza.total===========');
//                 console.log(R.prop('total', itemPizza))
//                 console.log('=======itemPizza.total===========');
                
//                 console.log(itemPizza.count);
//                 // totalPrice + sety.node.price * quantity
//                 console.log(parseInt(action.payload.value) * itemPizza.count);



//                 const newItems = R.update(itemIndexPizza, {
//                                     id: action.payload.id,
//                                     name: pizza.node.name,
//                                     price33: pizza.node.priceIn33cm,
//                                     radioPrice: pizza.node.price,
//                                     image: {...pizza.node.image.fluid},
//                                     count: itemPizza.count,
//                                     total: parseInt(action.payload.value) * parseInt(itemPizza.count)
//                                     // total: R.prop('total')(itemPizza) * R.prop('count')(itemPizza)
//                                 })(cartItems)
                
                        
//                               const totalPricePizza = R.compose(
//                                         R.sum,
//                                        R.pluck('total')
//                                    )(newItems)

                                   
//                 const razni =  parseInt(action.payload.value) * itemPizza.count - totalPricePizza
//                 console.log('=======totalPrice + razni===========');
//                 console.log(razni);
//                 console.log('==========totalPrice + razni============');

                              

//                 return {
//                   orderTotal:  totalPricePizza + razni,  //+ (parseInt(action.payload.value) + razni),
//                   // orderTotal: razni + totalPrice * 1 + parseInt(action.payload.value), // itemPizza.count, //+ action.payload.value,
//                   // orderTotal: totalPrice - parseInt(action.payload.value)  * parseInt(itemPizza.count),
//                   // orderTotal:  parseInt(totalPrice) + (parseInt(action.payload.value) - parseInt(pizza.node.priceIn33cm)) * 1,
//                   // const defaultOptions = { itemPizza, R.evolve({count: itemPizza.count, total: parseInt(action.payload.value) * itemPizza.count,}) }
//                   // console.log(R.merge(defaultOptions, selects));
                  
                    
                  
//                   cartItems: R.update(itemIndexPizza, {
//                       id: action.payload.id,
//                       name: pizza.node.name,
//                       price33: pizza.node.priceIn33cm,
//                       radioPrice: pizza.node.price,
//                       image: {...pizza.node.image.fluid},
//                       count: itemPizza.count,
//                       total: parseInt(action.payload.value) * parseInt(itemPizza.count)
//                       // total: R.prop('total')(itemPizza) * R.prop('count')(itemPizza)
//                   })(newItems)
//                 }
//                 // R.assoc('total', parseInt(action.payload.value)
                
//                   // return {
//                   //   orderTotal: cartItems.length < 1 ? totalPrice + parseInt(action.payload.value) * itemPizza.count :
//                   //   parseInt(action.payload.value) * itemPizza.count,
                  
//                   //   cartItems: R.update(itemIndexPizza, R.assoc('total', parseInt(action.payload.value), itemPizza))(cartItems)
//                   // }

//           default:
//               return state.shoppingCart;
//       }   
//   }

//   export default updateShoppingCart


//   /////////------------------------------------------------------------------------------



  



//   // -----------------------------------------------------------------=====================////////



//   // case 'PRODUCT_RAZMER':

//   //                 console.log(`============ action.payload.value(id) =============`);
//   //                 console.log(action.payload.id);
//   //                 console.log(`============ action.payload.value(id) =============`);

//   //                 console.log(`============ action.payload.value(28vs33) =============`);
//   //                 console.log(action.payload.value);
//   //                 console.log(`============ action.payload.value(28vs33) =============`);

//   //                 const {setList: {product}, shoppingCart: { cartItems } } = state
//   //                 //----------------------------------------
//   //                 console.log(`============ product =============`);
//   //                 console.log(product);
//   //                 console.log(`============ product =============`);
//   //                 console.log(`============ cartItems =============`);
//   //                 console.log(cartItems);
//   //                 console.log(`============ cartItems =============`);


//   //                 const pizza = product.find(({node: pizzaId}) => pizzaId.id === action.payload.id);
//   //                 console.log(`============ pizza =============`);
//   //                 console.log(pizza);
//   //                 console.log(`============ pizza =============`); 
//   //                 const itemIndexPizza = cartItems.findIndex(({id}) => id === action.payload.id)
//   //                 console.log(`== itemIndexPizza with cartItems array ==`);
//   //                 console.log(itemIndexPizza);
//   //                 console.log(`== itemIndexPizza with cartItems array ==`);
//   //                 const itemPizza = cartItems[itemIndexPizza]
//   //                 console.log(`== itemPizza with cartItems array ==`);
//   //                 console.log(itemPizza);
//   //                 console.log(`== itemPizza with cartItems array ==`);

//   //                 // const totalPrice = R.compose(
//   //                 //   R.sum,
//   //                 //   R.pluck('total')
                   
//   //                 // )(cartItems)
//   //                 console.log('=======totalPrice===========');
//   //                 console.log(totalPricePizza)
//   //                 console.log('=======totalPrice===========');
//   //               // const newItem = updateCartItem(sety, item, quantity);
//   //               // return {
//   //               //     orderTotal: totalPrice + sety.node.price * quantity,
//   //               // console.log(R.assocPath(['a', 'b', 'c'], 42, {a: 2, b: 3, c: 4 }))
                
//   //               // const {count = 0} = itemPizza
//   //               console.log('=======itemPizza.total===========');
//   //               console.log(R.prop('total', itemPizza))
//   //               console.log('=======itemPizza.total===========');
                
//   //               console.log(itemPizza.count);
//   //               // totalPrice + sety.node.price * quantity
//   //               console.log(parseInt(action.payload.value) * itemPizza.count);



//   //               const newItems = R.update(itemIndexPizza, {
//   //                                   id: action.payload.id,
//   //                                   name: pizza.node.name,
//   //                                   price33: pizza.node.priceIn33cm,
//   //                                   radioPrice: pizza.node.price,
//   //                                   image: {...pizza.node.image.fluid},
//   //                                   count: itemPizza.count,
//   //                                   total: parseInt(action.payload.value) * parseInt(itemPizza.count)
//   //                                   // total: R.prop('total')(itemPizza) * R.prop('count')(itemPizza)
//   //                               })(cartItems)
                
                        
//   //                             const totalPricePizza = R.compose(
//   //                                       R.sum,
//   //                                      R.pluck('total')
//   //                                  )(newItems)

                                   
//   //               // const razni =  parseInt(action.payload.value) * itemPizza.count - totalPricePizza
//   //               // console.log('=======totalPrice + razni===========');
//   //               // console.log(razni);
//   //               // console.log('==========totalPrice + razni============');

                              

//   //               return {
//   //                 orderTotal:  parseInt(action.payload.value) * itemPizza.count - totalPricePizza,  //+ (parseInt(action.payload.value) + razni),
//   //                 // orderTotal: razni + totalPrice * 1 + parseInt(action.payload.value), // itemPizza.count, //+ action.payload.value,
//   //                 // orderTotal: totalPrice - parseInt(action.payload.value)  * parseInt(itemPizza.count),
//   //                 // orderTotal:  parseInt(totalPrice) + (parseInt(action.payload.value) - parseInt(pizza.node.priceIn33cm)) * 1,
//   //                 // const defaultOptions = { itemPizza, R.evolve({count: itemPizza.count, total: parseInt(action.payload.value) * itemPizza.count,}) }
//   //                 // console.log(R.merge(defaultOptions, selects));
                  
                    
                  
//   //                 cartItems: R.update(itemIndexPizza, {
//   //                     id: action.payload.id,
//   //                     name: pizza.node.name,
//   //                     price33: pizza.node.priceIn33cm,
//   //                     radioPrice: pizza.node.price,
//   //                     image: {...pizza.node.image.fluid},
//   //                     count: itemPizza.count,
//   //                     total: parseInt(action.payload.value) * parseInt(itemPizza.count)
//   //                     // total: R.prop('total')(itemPizza) * R.prop('count')(itemPizza)
//   //                 })(newItems)
//   //               }
//   //               // R.assoc('total', parseInt(action.payload.value)
                
//   //                 // return {
//   //                 //   orderTotal: cartItems.length < 1 ? totalPrice + parseInt(action.payload.value) * itemPizza.count :
//   //                 //   parseInt(action.payload.value) * itemPizza.count,
                  
//   //                 //   cartItems: R.update(itemIndexPizza, R.assoc('total', parseInt(action.payload.value), itemPizza))(cartItems)
//   //                 // }
               

//   //                 // return (idx, itemPizza, cartItems)
//   //                   // return {
//   //                   //  cartItems: R.update(itemIndexPizza, {
//   //                   //   id: action.payload.id,
//   //                   //   name: pizza.node.name,
//   //                   //   price33: pizza.node.priceIn33cm,
//   //                   //   image: {...pizza.node.image.fluid},
//   //                   //   count: 0,
//   //                   //   total: acti 1 * action.payload.value 
//   //                   //  }, cartItems)
//   //                   // }
//   //                   // total: total + quantity * pizza.node.price 

//   //         default:
//   //             return state.shoppingCart;
//   //     }   
//   // }

//   // export default updateShoppingCart



// // ============================================================================

// //  const newItems = R.update(itemIndexPizza, {
// //                   id: action.payload.id,
// //                   name: pizza.node.name,
// //                   price33: pizza.node.priceIn33cm,
// //                   radioPrice: pizza.node.price,
// //                   image: {...pizza.node.image.fluid},
// //                   count: itemPizza.count,
// //                   total: parseInt(action.payload.value) * parseInt(itemPizza.count)
// //                   // total: R.prop('total')(itemPizza) * R.prop('count')(itemPizza)
// //               })(cartItems)
// //               // updateCartItem(pizza, itemPizza, R.__, parseInt(action.payload.value))
// //                 return {
// //                   orderTotal:  R.compose(R.sum, R.pluck('total'))(newItems),  //+ (parseInt(action.payload.value) + razni),
// //                   // orderTotal: razni + totalPrice * 1 + parseInt(action.payload.value), // itemPizza.count, //+ action.payload.value,
// //                   // orderTotal: totalPrice - parseInt(action.payload.value)  * parseInt(itemPizza.count),
// //                   // orderTotal:  parseInt(totalPrice) + (parseInt(action.payload.value) - parseInt(pizza.node.priceIn33cm)) * 1,
// //                   // const defaultOptions = { itemPizza, R.evolve({count: itemPizza.count, total: parseInt(action.payload.value) * itemPizza.count,}) }
// //                   // console.log(R.merge(defaultOptions, selects));
                  
                    
                  
// //                   cartItems: R.update(itemIndexPizza, {
// //                       id: action.payload.id,
// //                       name: pizza.node.name,
// //                       price33: pizza.node.priceIn33cm,
// //                       radioPrice: pizza.node.price,
// //                       image: {...pizza.node.image.fluid},
// //                       count: itemPizza.count,
// //                       total: parseInt(action.payload.value) * parseInt(itemPizza.count)
// //                       // total: R.prop('total')(itemPizza) * R.prop('count')(itemPizza)
// //                   })(newItems)
// //                 }
// //                 // R.assoc('total', parseInt(action.payload.value)
                
// //                   // return {
// //                   //   orderTotal: cartItems.length < 1 ? totalPrice + parseInt(action.payload.value) * itemPizza.count :
// //                   //   parseInt(action.payload.value) * itemPizza.count,
                  
// //                   //   cartItems: R.update(itemIndexPizza, R.assoc('total', parseInt(action.payload.value), itemPizza))(cartItems)
// //                   // }
               

// //                   // return (idx, itemPizza, cartItems)
// //                     // return {
// //                     //  cartItems: R.update(itemIndexPizza, {
// //                     //   id: action.payload.id,
// //                     //   name: pizza.node.name,
// //                     //   price33: pizza.node.priceIn33cm,
// //                     //   image: {...pizza.node.image.fluid},
// //                     //   count: 0,
// //                     //   total: acti 1 * action.payload.value 
// //                     //  }, cartItems)
// //                     // }
// //                     // total: total + quantity * pizza.node.price 

// //           default:
// //               return state.shoppingCart;
// //       }   
// //   }

// //   export default updateShoppingCart


// // -----------------------------------------------------------------------------








// // =================================================================



//         // console.log(`============ action.payload.value(name) =============`);
//                     // console.log(action.payload.name);
//                     // console.log(`============ action.payload.value(name) =============`);
//                     // return updateOder(state, action.payload.id, 1, action.payload.value)
//                     // console.log(action.payload.count);
//                     // console.log(action.payload.image);
//                     // console.log(action.payload.price33);




// // const {setList: {product}, shoppingCart: { cartItems } } = state

// // const pizza = product.find(({node: productCategory}) => productCategory.id === action.payload.id);
// // const itemIndex = cartItems.findIndex(({id}) => id === action.payload.id);
// // const itemPizza = cartItems[itemIndex];

// // const updateCartPizza = (setу, item = {}, valuePrice) => {
// // const { id = setу.node.id, count = 0, name = setу.node.name, total = 0, 
// //     image = setу.node.image.fluid, price33 = setу.node.priceIn33cm
// // } = item
// // return {
// //     id,
// //     name,
// //     price33,
// //     radioPrice: setу.node.price,
// //     image: {...image},
// //     count: count,
// //     total: valuePrice * 1 > pizza.node.price ? price33 * count : pizza.node.price * count
// //     // total: action.payload.value * count  //total + 
// //     // total: action.payload.value * 1 //total + 
// //     // count: count + quantity,
// //     // total: total + quantity * setу.node.price 
// // }
// // } 


// // // const totalPricePizza = R.compose(
// // //     R.sum,
// // //     R.pluck('total')
// // //   )(cartItems)

// // const newItemPizza = updateCartPizza(pizza, itemPizza, action.payload.value);
// // console.log(`== newItemPizza in shopping cart(updateCartPizza) ==`)
// // console.log(newItemPizza)
// // console.log(`== newItemPizza in shopping cart(updateCartPizza) ==`)


// // const updateCartItemsPizza = (cartItems, itemPizza, idx) => { 

// // return R.update(idx, itemPizza, cartItems)
// // }


// // return {
// //   //   orderTotal: totalPricePizza + action.payload.value, //+ pizza.node.price,
// //     cartItems: updateCartItemsPizza(cartItems, newItemPizza, itemIndex)
// // };





// // ====================================================================











//             // const sety = state.setList.product.find(({node: productCategory}) => productCategory.id === action.payload);
//                    // case 'PRICE_PIZZA_CHENGED':
//                 //     const { payload: {eName, eValue } } = action
//                 //     return {
//                 //         [eName]: eValue
//                 //     }
//             // const ss = () => {
//             //     return {
//             //         set: updateOder(state, action.payload, 1),
//             //         pizza: updateOderPizza(state, action.payload, 1)
//             //       } 
                    
//             // }









// // ====================================================================================================================





// //   case 'PRODUCT_RAZMER':
// //     // console.log(action.payload.id)
// //     console.log(action.payload.value)
// //     // return updateOder(state, action.payload.id, 1, action.payload.value)

// //     const {setList: {product}, shoppingCart: { cartItems } } = state

// //     const pizza = product.find(({node: productCategory}) => productCategory.id === action.payload.id);
// //     const itemIndex = cartItems.findIndex(({id}) => id === action.payload.id);
// //     const itemPizza = cartItems[itemIndex];
// //     console.log(itemPizza)
// //     console.log(cartItems)
// // //  const updateCartPizza = (setу, item = {}, valuePrice) => {
// // //     const { id = setу.node.id, count = 0, name = setу.node.name, total = 0, 
// // //         image = setу.node.image.fluid, price33 = setу.node.priceIn33cm
// // //     } = item
// // //     return {
// // //         id,
// // //         name,
// // //         price33,
// // //         radioPrice: setу.node.price,
// // //         image: {...image},
// // //         count: count,
// // //         total: valuePrice > pizza.node.price ? pizza.node.priceIn33cm * count : pizza.node.price * count 
// // //         // total: action.payload.value * count  //total + 
// // //         // total: action.payload.value * 1 //total + 
// // //         // count: count + quantity,
// // //         // total: total + quantity * setу.node.price 
// // //     }
// // //  } 


// // //     // const totalPricePizza = R.compose(
// // //     //     R.sum,
// // //     //     R.pluck('total')
// // //     //   )(cartItems)

// // //   const newItemPizza = updateCartPizza(pizza, itemPizza, action.payload.value);
// // //   console.log(newItemPizza)

// //   const updateCartItemsPizza = (cartItems, itemPizza, idx) => { 
// //     console.log(itemPizza)
// //     return R.update(idx, itemPizza, cartItems)
// // }



// // // return {
// // //     //   orderTotal: totalPricePizza + action.payload.value, //+ pizza.node.price,
// // //       cartItems: updateCartItemsPizza(cartItems, {
// // //         id: itemPizza.id,
// // //         name: pizza.node.name,
// // //         image: {...pizza.node.image.fluid},
// // //         // count: 0,
// // //         total: action.payload.value * 1
// // //       }, itemIndex)
// // //   };


// //   return {
// //     //   orderTotal: totalPricePizza + action.payload.value, //+ pizza.node.price,
// //       cartItems: updateCartItemsPizza(cartItems, {
// //         id: pizza.node.id,
// //         name: pizza.node.name,
// //         price33: pizza.node.priceIn33cm,
// //         image: {...pizza.node.image.fluid},
// //         count: itemPizza.count,
// //         total: action.payload.value * 1
// //       }, itemIndex)
// //   };













// // ---------------------------------------------------------------------------------------------------------------









// //   if(item.count === 0) {
// //     return [ // удаление элемента из массива
// //         ...cartItems.slice(0, idx), // все элементы до нужного 
// //         ...cartItems.slice(idx + 1), // все элементы после нужного
// //     ]
// //   // return R.drop(idx, cartItems)
// // }

// // if(idx === -1) { // добавление элеиента к концу массива
// //     return R.append(item, cartItems)
// // } 

// // console.log(cartItems)
// // return R.update(idx, item, cartItems)
// // //   [   // обновление текущего массива и замена элемента новым 
// // //       ...cartItems.slice(0, idx),
// // //       item,
// // //       ...cartItems.slice(idx + 1),
// // //   ]
// // }






//       //   const {setList: {product: {set, pizza}}, shoppingCart: { cartItems } } = state
  
//         // return updateOrderAllProductFunc(setId, set, cartItems, quantity)
    
//         // return {
//         //     setys: updateOrderAllProductFunc(setId, set, cartItems, quantity),
//         //     pizza: updateOrderAllProductFunc(setId, pizza, cartItems, quantity)
//         // }  


// //   const updateOrderAllProductFunc = (productId, productCategory, cartItems, quantity) => {
  
// //     const products = productCategory.find(({node: productCategory}) => productCategory.id === productId);
// //     const itemIndex = cartItems.findIndex(({id}) => id === productId);
// //     const item = cartItems[itemIndex];

// //     const totalPrice = R.compose(
// //       R.sum,
// //       R.pluck('total')
// //     )(cartItems)

// //   const newItem = updateCartItem(products, item, quantity);
// //   return {
// //       orderTotal: totalPrice + products.node.price * quantity,
// //       cartItems: updateCartItems(cartItems, newItem, itemIndex)
// //   };
// // }































// =================================================================



        // console.log(`============ action.payload.value(name) =============`);
                    // console.log(action.payload.name);
                    // console.log(`============ action.payload.value(name) =============`);
                    // return updateOder(state, action.payload.id, 1, action.payload.value)
                    // console.log(action.payload.count);
                    // console.log(action.payload.image);
                    // console.log(action.payload.price33);




// const {setList: {product}, shoppingCart: { cartItems } } = state

// const pizza = product.find(({node: productCategory}) => productCategory.id === action.payload.id);
// const itemIndex = cartItems.findIndex(({id}) => id === action.payload.id);
// const itemPizza = cartItems[itemIndex];

// const updateCartPizza = (setу, item = {}, valuePrice) => {
// const { id = setу.node.id, count = 0, name = setу.node.name, total = 0, 
//     image = setу.node.image.fluid, price33 = setу.node.priceIn33cm
// } = item
// return {
//     id,
//     name,
//     price33,
//     radioPrice: setу.node.price,
//     image: {...image},
//     count: count,
//     total: valuePrice * 1 > pizza.node.price ? price33 * count : pizza.node.price * count
//     // total: action.payload.value * count  //total + 
//     // total: action.payload.value * 1 //total + 
//     // count: count + quantity,
//     // total: total + quantity * setу.node.price 
// }
// } 


// // const totalPricePizza = R.compose(
// //     R.sum,
// //     R.pluck('total')
// //   )(cartItems)

// const newItemPizza = updateCartPizza(pizza, itemPizza, action.payload.value);
// console.log(`== newItemPizza in shopping cart(updateCartPizza) ==`)
// console.log(newItemPizza)
// console.log(`== newItemPizza in shopping cart(updateCartPizza) ==`)


// const updateCartItemsPizza = (cartItems, itemPizza, idx) => { 

// return R.update(idx, itemPizza, cartItems)
// }


// return {
//   //   orderTotal: totalPricePizza + action.payload.value, //+ pizza.node.price,
//     cartItems: updateCartItemsPizza(cartItems, newItemPizza, itemIndex)
// };





// ====================================================================











            // const sety = state.setList.product.find(({node: productCategory}) => productCategory.id === action.payload);
                   // case 'PRICE_PIZZA_CHENGED':
                //     const { payload: {eName, eValue } } = action
                //     return {
                //         [eName]: eValue
                //     }
            // const ss = () => {
            //     return {
            //         set: updateOder(state, action.payload, 1),
            //         pizza: updateOderPizza(state, action.payload, 1)
            //       } 
                    
            // }









// ====================================================================================================================





//   case 'PRODUCT_RAZMER':
//     // console.log(action.payload.id)
//     console.log(action.payload.value)
//     // return updateOder(state, action.payload.id, 1, action.payload.value)

//     const {setList: {product}, shoppingCart: { cartItems } } = state

//     const pizza = product.find(({node: productCategory}) => productCategory.id === action.payload.id);
//     const itemIndex = cartItems.findIndex(({id}) => id === action.payload.id);
//     const itemPizza = cartItems[itemIndex];
//     console.log(itemPizza)
//     console.log(cartItems)
// //  const updateCartPizza = (setу, item = {}, valuePrice) => {
// //     const { id = setу.node.id, count = 0, name = setу.node.name, total = 0, 
// //         image = setу.node.image.fluid, price33 = setу.node.priceIn33cm
// //     } = item
// //     return {
// //         id,
// //         name,
// //         price33,
// //         radioPrice: setу.node.price,
// //         image: {...image},
// //         count: count,
// //         total: valuePrice > pizza.node.price ? pizza.node.priceIn33cm * count : pizza.node.price * count 
// //         // total: action.payload.value * count  //total + 
// //         // total: action.payload.value * 1 //total + 
// //         // count: count + quantity,
// //         // total: total + quantity * setу.node.price 
// //     }
// //  } 


// //     // const totalPricePizza = R.compose(
// //     //     R.sum,
// //     //     R.pluck('total')
// //     //   )(cartItems)

// //   const newItemPizza = updateCartPizza(pizza, itemPizza, action.payload.value);
// //   console.log(newItemPizza)

//   const updateCartItemsPizza = (cartItems, itemPizza, idx) => { 
//     console.log(itemPizza)
//     return R.update(idx, itemPizza, cartItems)
// }



// // return {
// //     //   orderTotal: totalPricePizza + action.payload.value, //+ pizza.node.price,
// //       cartItems: updateCartItemsPizza(cartItems, {
// //         id: itemPizza.id,
// //         name: pizza.node.name,
// //         image: {...pizza.node.image.fluid},
// //         // count: 0,
// //         total: action.payload.value * 1
// //       }, itemIndex)
// //   };


//   return {
//     //   orderTotal: totalPricePizza + action.payload.value, //+ pizza.node.price,
//       cartItems: updateCartItemsPizza(cartItems, {
//         id: pizza.node.id,
//         name: pizza.node.name,
//         price33: pizza.node.priceIn33cm,
//         image: {...pizza.node.image.fluid},
//         count: itemPizza.count,
//         total: action.payload.value * 1
//       }, itemIndex)
//   };













// ---------------------------------------------------------------------------------------------------------------









//   if(item.count === 0) {
//     return [ // удаление элемента из массива
//         ...cartItems.slice(0, idx), // все элементы до нужного 
//         ...cartItems.slice(idx + 1), // все элементы после нужного
//     ]
//   // return R.drop(idx, cartItems)
// }

// if(idx === -1) { // добавление элеиента к концу массива
//     return R.append(item, cartItems)
// } 

// console.log(cartItems)
// return R.update(idx, item, cartItems)
// //   [   // обновление текущего массива и замена элемента новым 
// //       ...cartItems.slice(0, idx),
// //       item,
// //       ...cartItems.slice(idx + 1),
// //   ]
// }






      //   const {setList: {product: {set, pizza}}, shoppingCart: { cartItems } } = state
  
        // return updateOrderAllProductFunc(setId, set, cartItems, quantity)
    
        // return {
        //     setys: updateOrderAllProductFunc(setId, set, cartItems, quantity),
        //     pizza: updateOrderAllProductFunc(setId, pizza, cartItems, quantity)
        // }  


//   const updateOrderAllProductFunc = (productId, productCategory, cartItems, quantity) => {
  
//     const products = productCategory.find(({node: productCategory}) => productCategory.id === productId);
//     const itemIndex = cartItems.findIndex(({id}) => id === productId);
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


