import * as R from 'ramda'
import {createReducer, createAction, disbatch} from "redux-act";

export const addedToCart = createAction('SET_ADDED_TO_CART')
const removeFromCart = createAction('SET_REMOVE_FROM_CART')
const allRemoveFromCart = createAction('ALL_SET_REMOVE_FROM_CART')
const pizzaSize = createAction('PRODUCT_RAZMER')
const addedPribor = createAction('PALOCHKI_ADDED')
const addedSaleRoll = createAction('ADD_SALE_ROLL')

// =====
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
    const {cartItems} = state
    // console.log(categoryName)
    const sety = categoryName.find(({node: productCategory}) => productCategory.id === setId);
    const itemIndex = cartItems.findIndex(({id}) => id === setId);
    const item = cartItems[itemIndex];

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

// const saleRoll = (state) => {
//     return R.a
// }

// action func
export const addedCart = (data) => (dispatch) => dispatch(addedToCart(data))

export const removeCart = (data) => (dispatch) => dispatch(removeFromCart(data))

export const allRemoveCart = (data) => (dispatch) => dispatch(allRemoveFromCart(data))

export const pizzaSized = (data) => (dispatch) => dispatch(pizzaSize(data))

export const addPribor = (count) => (dispatch, getStore) => {
    const {shoppingCart: {palochkiTotal}} = getStore()

    const priborTotal = palochkiTotal >= 2 ? palochkiTotal + parseInt(count) : palochkiTotal * 1 + 1
    dispatch(addedPribor(priborTotal))
}

export const saleRoll = (objRoll) => (disbatch) => disbatch(addedSaleRoll(objRoll))

const initialState = {
    cartItems: [],
    orderTotal: 0,
    palochkiTotal: 0
}

export default createReducer({
    [addedToCart]: (state, {id, productPrice, product}) => {
        const res = updateOder(state, id, 1, productPrice, product)
        return {...state, cartItems: res.cartItems, orderTotal: res.orderTotal}},
    [removeFromCart]: (state, data) => {
        const {cartItems, orderTotal} = updateOder(state, data.id, -1, data.productPrice, data.product)
        return { ...state, cartItems, orderTotal }
    },
    [allRemoveFromCart]: (state, data) => {
        const item = state.cartItems.find((el) => el.id === data.id)
        const {cartItems, orderTotal} = updateOder(state, data.id, -item.count, data.radioValue, data.product)
        return { ...state, cartItems, orderTotal}
    },
    [pizzaSize]: (state, {id, price, product}) => {
        const pizza = product.find(({node: pizzaId}) => pizzaId.id === id);
        const itemIndexPizza = state.cartItems.findIndex((data) => data.id === id)
        const itemPizza = state.cartItems[itemIndexPizza]

        const updateItemPizza = R.update(itemIndexPizza, {
            id: id,
            name: pizza.node.name,
            priceDef: pizza.node.price,
            price33: pizza.node.priceIn33cm,
            radioValue: parseInt(price) * 1,
            image: {...pizza.node.image.fluid},
            count: itemPizza.count,
            total: itemPizza.count * parseInt(price)
        })(state.cartItems)

        const totalPrice = R.compose(
            R.sum,
            R.pluck('total')
        )(updateItemPizza)

        return {
            orderTotal: totalPrice,
            cartItems: updateItemPizza
        }
    },
    [addedPribor]: (state, palochkiTotal) => ({...state, palochkiTotal}),
    [addedSaleRoll]: (state, objRoll) => {

       return {
           ...state,
           orderTotal: state.orderTotal + objRoll.priceDef,
           cartItems: R.append({
               ...objRoll,
               count: 0
           }, state.cartItems)
       }
    }
}, initialState)





