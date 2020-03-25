import * as R from 'ramda'
import {createReducer, createAction} from "redux-act";

const addedToCart = createAction('SET_ADDED_TO_CART')
const removeFromCart = createAction('SET_REMOVE_FROM_CART')
const allRemoveFromCart = createAction('ALL_SET_REMOVE_FROM_CART')
const pizzaSize = createAction('PRODUCT_RAZMER')
// const totalPrice = createAction('TOTAL_PRICE_ITEMS')
const addedPribor = createAction('PALOCHKI_ADDED')

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

    const {app: {
        product,
        productPizza
    }, shoppingCart: { cartItems: {cartItems = []} } } = state

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

export const addedCart = (id, pizzaSize, categoryName) => (dispatch, getStore) => {
    const state = getStore()

    const res = updateOder(state, id, 1, pizzaSize, categoryName)
    dispatch(addedToCart(res))
}

export const removeCart = (id, pizzaSize, categoryName) => (dispatch, getStore) => {
    const state = getStore()

    const res = updateOder(state, id, -1, pizzaSize, categoryName)
    dispatch(addedToCart(res))
}

export const allRemoveCart = (id, pizzaSize, categoryName) => (dispatch, getStore) => {
    const state = getStore()
    const item = state.shoppingCart.cartItems.cartItems.find((el) => el.id === id)
    const res = updateOder(state, id, -item.count, pizzaSize, categoryName)
    dispatch(allRemoveFromCart(res))
}

export const pizzaSized = (id, sizePrice) => (dispatch, getStore) => {
    const state = getStore()

    const {app: {product}, shoppingCart: { cartItems: {cartItems} } } = state

    const pizza = product.find(({node: pizzaId}) => pizzaId.id === id);
    const itemIndexPizza = cartItems.findIndex((data) => data.id === id)
    const itemPizza = cartItems[itemIndexPizza]
//
  const updateItemPizza = R.update(itemIndexPizza, {
      id: id,
      name: pizza.node.name,
      priceDef: pizza.node.price,
      price33: pizza.node.priceIn33cm,
      radioValue: parseInt(sizePrice) * 1,
      image: {...pizza.node.image.fluid},
      count: itemPizza.count,
      total: itemPizza.count * parseInt(sizePrice)
  })(cartItems)

  const totalPrice = R.compose(
    R.sum,
    R.pluck('total')
  )(updateItemPizza)

    dispatch(pizzaSize({
        orderTotal: totalPrice * 1,
        cartItems: updateItemPizza
    }))
}

export const addPribor = (count) => (dispatch, getStore) => {
    const {shoppingCart: {palochkiTotal}} = getStore()

    const priborTotal = palochkiTotal >= 2 ? palochkiTotal + parseInt(count) : palochkiTotal * 1 + 1
    dispatch(addedPribor(priborTotal))
}

const initialState = {
    cartItems: [],
    palochkiTotal: 0
}

export default createReducer({
    [addedToCart]: (state, cartItems) => ({...state, cartItems}),
    [removeFromCart]: (state, cartItems) => ({...state, cartItems}),
    [allRemoveFromCart]: (state, cartItems) => ({...state, cartItems}),
    [pizzaSize]: (state, cartItems) => ({...state, cartItems}),
    [addedPribor]: (state, palochkiTotal) => ({...state, palochkiTotal})
}, initialState)






//     if(action.type === 'PALOCHKI_ADDED') {
//       return {
//         palochkiTotal: state.palochkiTotal >= 2 ? state.palochkiTotal + parseInt(action.payload) : state.palochkiTotal * 1 + 1,
//         setList: updateSetList(state, action),
//         shoppingCart: updateShoppingCart(state, action),
//         contacts: contactUser(state, action)

  //         return {
  //             cartItems: [],
  //             orderTotal: 0,
  //             palochkiTotal: 0
  //         };
  //     }
  //














