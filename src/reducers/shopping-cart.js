import * as R from 'ramda'
import {createReducer, createAction} from "redux-act";

export const addedToCart = createAction('SET_ADDED_TO_CART')
const removeFromCart = createAction('SET_REMOVE_FROM_CART')
const allRemoveFromCart = createAction('ALL_SET_REMOVE_FROM_CART')
const pizzaSize = createAction('PRODUCT_RAZMER')
export const pizzaCart = createAction('SIZE_CART')

const addedPribor = createAction('PALOCHKI_ADDED')
const addedSaleRoll = createAction('ADD_SALE_ROLL')
const addedSalePizza = createAction('ADD_SALE_PIZZA')
const deletePizzaDarom = createAction('DEL_PIZZA_DAROM')
const deleteRollSale = createAction('DEL_ROLL_SALE')
// export const clockSale = createAction('CLOCK_HAPPY_SALE')
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

const updateCartItem = (setу, item = {}, quantity, priceRadio = setу.price) => { // добавление в корзину

    const sizePizza = R.defaultTo({[setу.slug]: true}, setу.size)
    const pricePizza = R.defaultTo(setу.price, setу.priceDef)

    const { id = setу.id,
        count = 0,
        name = setу.name,
        total = 0,
        image = setу.image.fluid,
        size = sizePizza,
        priceDef = pricePizza,
        price33 = setу.priceIn33cm,
        pribor = 0,
        } = item

    return {
        id,
        name,
        price33,
        pribor,
        radioPrice: price33,
        priceDef,
        radioValue: priceRadio,
        contentful_id: setу.contentful_id,
        size,
        slug: setу.slug,
        image: {...image},
        count: count + quantity,
        total: priceRadio > priceDef ? total + quantity * price33 : total + quantity * priceDef
    }
}

const updateOder = (state, setId, quantity, priceRadioPizza, categoryName) => {
    const {cartItems} = state

    const sety = categoryName.find((productCategory) => productCategory.id === setId);
    const itemIndex = cartItems.findIndex(({id}) => id === setId);
    const item = cartItems[itemIndex];

    const totalPrice = R.compose(
        R.sum,
        R.pluck('total')
    )(cartItems)

    const newItem = updateCartItem(sety, item, quantity, priceRadioPizza);
    return {
        orderTotal: priceRadioPizza > (sety.price || item.priceDef) ? totalPrice + priceRadioPizza * quantity : totalPrice + (sety.price || item.priceDef) * quantity,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };

}

// action func
export const addedCart = (data) => (dispatch) => dispatch(addedToCart(data))

export const removeCart = (data) => (dispatch) => dispatch(removeFromCart(data))

export const allRemoveCart = (data) => (dispatch) => dispatch(allRemoveFromCart(data))

export const pizzaSized = (data) => (dispatch) => dispatch(pizzaSize(data))
// export const sizePizzaCart = (data) => (dispatch) => dispatch(pizzaCart(data))

export const addPribor = (count) => (dispatch) => {
    // const {shoppingCart: {palochkiTotal}} = getStore()
    // const priborTotal = palochkiTotal >= 2 ? palochkiTotal + parseInt(count) : palochkiTotal * 1 + 1
    dispatch(addedPribor(count))
}

export const saleRoll = (objRoll) => async (dispatch) => {
    await dispatch(addedSaleRoll(objRoll))
}
export const salePizza = (objPizza) => async (dispatch) => await dispatch(addedSalePizza(objPizza))
export const deletePizza = (id) => (dispatch) => dispatch(deletePizzaDarom(id))
export const deleteRoll = (id) => (dispatch) => dispatch(deleteRollSale(id))

const initialState = {
    cartItems: [],
    orderTotal: 0,
    palochkiTotal: 0,
    newPizza: null
    // clockSale: false
}

export default createReducer({
    [addedToCart]: (state, {id, radioValue, product}) => {
        const res = updateOder(state, id, 1, radioValue, product)
        return {...state, cartItems: res.cartItems, orderTotal: res.orderTotal}},
    [removeFromCart]: (state, data) => {
        const {cartItems, orderTotal} = updateOder(state, data.id, -1, data.radioValue, data.product)
        return { ...state, cartItems, orderTotal }
    },
    [allRemoveFromCart]: (state, data) => {
        const item = state.cartItems.find((el) => el.id === data.id)
        const {cartItems, orderTotal} = updateOder(state, data.id, -item.count, data.radioValue, data.product)
        return { ...state, cartItems, orderTotal}
    },
    [pizzaSize]: (state, {id, price, product, size}) => {

        const pizza = product.find((pizzaId) => pizzaId.node.id === id);
        const itemIndexPizza = state.cartItems.findIndex((data) => data.id === id)
        const itemPizza = state.cartItems[itemIndexPizza]

        const updateItemPizza = R.update(itemIndexPizza, {
            id: id,
            name: pizza.node.name,
            priceDef: pizza.node.price,
            price33: pizza.node.priceIn33cm,
            radioValue: parseInt(price) * 1,
            size: {[size]: true},
            slug: pizza.node.slug,
            contentful_id: pizza.node.contentful_id,
            image: {...pizza.node.image.fluid},
            count: itemPizza.count,
            total: itemPizza.count * parseInt(price)
        })(state.cartItems)

        const totalPrice = R.compose(
            R.sum,
            R.pluck('total')
        )(updateItemPizza)

        return {
            ...state,
            orderTotal: totalPrice,
            cartItems: updateItemPizza,
        }
    },
    [pizzaCart]: (state, {id, productPizza, total, priceDef, size, mass}) => {
        const pizzaProduct = R.defaultTo(productPizza, state.newPizza)
        const pizza = pizzaProduct.find((pizzaId) => pizzaId.id === id);
        const itemIndexPizza = pizzaProduct.findIndex((data) => data.id === id)

        const updateItemPizza = R.update(itemIndexPizza, {
           ...pizza,
            price: total,
            priceDef,
            size: {[size]: true},
            slug: pizza.slug,
            mass,
            contentful_id: pizza.contentful_id,
        })(pizzaProduct)

        return {
            ...state,
            newPizza: updateItemPizza
        }
    },
    [addedPribor]: (state, count) => {
        const priborTotal = state.palochkiTotal > 1 ? state.palochkiTotal + parseInt(count) : state.palochkiTotal * 1 + 1
        return {
            ...state,
            palochkiTotal: priborTotal
        }
    },
    [addedSaleRoll]: (state, objRoll) => {
       return {
           ...state,
           orderTotal: state.orderTotal + objRoll.radioValue,
           cartItems: R.append({
               ...objRoll,
               // id: `${objRoll.id}saleRoll`,
               priceSale: 0,
               textRollSale: "Филадельфия за 79!"
           }, state.cartItems)
       }
    },
    [addedSalePizza]: (state, objPizza) => {
        return {
            ...state,
            cartItems: R.append({
                ...objPizza,
                pizzaSale: true,
                textPizza: "Бесплатная пицца!",
                count: 0
            }, state.cartItems)
        }
    },
    [deletePizzaDarom]: (state, id) => {
        const pizzaDaromIndex = state.cartItems.findIndex((el) => el.id === id)
        return {
            ...state,
            cartItems: R.remove(pizzaDaromIndex, 1, state.cartItems)
        }
    },
    [deleteRollSale]: (state, id) => {
        const rollSaleIndex = state.cartItems.findIndex((el) => el.id === id)
        return {
            ...state,
            orderTotal: state.orderTotal - 79,
            cartItems: R.remove(rollSaleIndex, 1, state.cartItems)
        }
    },
    // [clockSale]: (state) => {
    //     return {...state, clockSale: true}
    // }
}, initialState)





